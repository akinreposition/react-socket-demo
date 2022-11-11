const express = require('express');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000;

const { errorHandler } = require('./middleware/errorMiddleware');
// const connectDB = require('./config/db');

// connectDB();

const app = express();

app.use('/api/bids', require('./routes/biddingRoutes'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// // Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'client', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }


// app.use('/api/bidding', require('./routes/biddingRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});