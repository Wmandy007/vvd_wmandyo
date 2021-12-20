const args = process.argv;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const auth = require('./routes/auth');
const user = require('./routes/user');
const client = require('./routes/client');
const season = require('./routes/season');
const series = require('./routes/series');
const episode = require('./routes/episode');
const learning = require('./routes/learning');
const quiz = require('./routes/quiz');
const uploadImage = require('./routes/uploadImage');

//Initialize express app
const app = express();

//Configuring the Environment Variables
dotenv.config({ path: './config/.env' });

// BODYPARSER MIDDLEWARE
app.use(express.json());

//CORS
app.use(cors());

// ROUTES
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/client', client);
app.use('/api/season', season);
app.use('/api/series', series);
app.use('/api/episode', episode);
app.use('/api/learning', learning);
app.use('/api/quiz', quiz);
app.use('/api/uploadimage', uploadImage);
app.get('/', (req, res) => {
  res.send('Home Page');
});

//CONFIGURE PORT
const PORT = process.env.PORT || args[2] || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  //Db connection
  connectDb();
  console.log(
    `Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`
  );
});

//Handle the promise rejection error
process.on('unhandledRejection', (err, promise) => {
  console.log('Error: ', err.message);
  server.close(() => process.exit(1));
});
