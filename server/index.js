const express = require('express');
const app = express();
const PORT = 4000;
const fs = require('fs');
// const axios = require('axios');
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

//Gets the JSON file and parse the file into JavaScript object
const rawData = fs.readFileSync('data.json');
// const rawData = axios.get("https://react-socket-demo-default-rtdb.firebaseio.com/auction/")
const productData = JSON.parse(rawData);

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

//Returns the JSON file
app.get('/api', (req, res) => {
  res.json(productData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});