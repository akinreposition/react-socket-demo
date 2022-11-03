const path = require('path');
const express = require('express');
const port = process.env.PORT || 4000;
// const fs = require('fs');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

//Gets the JSON file and parse the file into JavaScript object
const rawData = fs.readFileSync('data.json');
// const rawData = fetch("https://react-socket-demo-default-rtdb.firebaseio.com/auction/")
const productData = JSON.parse(rawData);

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  //Listens to the addProduct event
  socket.on('addProduct', (data) => {
    // console.log(data); //logs the message from the client
    productData['products'].push(data);
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile('data.json', stringData, (err) => {
      console.error(err);
    })
     //Sends back the data after adding a new product
  socket.broadcast.emit('addProductResponse', data);
  });

  function findProduct(nameKey, productsArray, last_bidder, new_price) {
    for (let i = 0; i < productsArray.length; i++) {
      if (productsArray[i].name === nameKey) {
        productsArray[i].last_bidder = last_bidder;
        productsArray[i].price = new_price;
      }
    }
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile('data.json', stringData, (err) => {
      console.error(err);
    });
  }


  // Listen for new bids from the client
  socket.on('bidProduct', (data) => {
    // console.log(data);
    findProduct(
      data.name,
      productData['products'],
      data.last_bidder,
      data.amount
    );

     //Sends back the data after placing a bid
     socket.broadcast.emit('bidProductResponse', data);
  })
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}


app.use('/api/bidding', require('./routes/biddingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//Returns the JSON file
// app.get('/api', (req, res) => {
//   res.json(productData);
// });

app.use(errorHandler);

http.listen(port, () => {
  console.log(`Server listening on ${post}`);
});