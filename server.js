require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// Config
// dotenv.config({ path: '.en' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((data) => {
  console.log(`DB Connection Successful!`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
