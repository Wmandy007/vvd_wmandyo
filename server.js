const args = process.argv
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const auth = require('./routes/auth')
const user = require('./routes/user')
const client = require('./routes/client')
const season = require('./routes/season')
const series = require('./routes/series')
const episode = require('./routes/episode')
const learning = require('./routes/learning')
const quiz = require('./routes/quiz')
const uploadImage = require('./routes/uploadImage')
const uploadMobileImage = require('./routes/uploadMobileImage')
const Answer = require('./routes/answer')
const Leader = require('./routes/leader')
const Game = require('./routes/game')
const HotGameRoutes = require('./routes/gameRoutes')
const visionChampRoutes = require('./routes/visionChampRoutes')
const levelRoutes = require('./routes/levelRoutes') // * the don routes
const questionRoutes = require('./routes/questionRoutes') // * the don routes
const Recomended = require('./routes/recomended')
const Assesment = require('./routes/assesment')
const HowTo = require('./routes/how_to')
const lightItUpGameRoutes = require('./routes/lightItUpGameRoutes')
const lightGamePairRoutes = require('./routes/lightGamePairRoutes')
const { passport } = require('./config/passport');
const saml = require('./routes/saml');
var session = require('express-session')

const morgan = require('morgan')

//Initialize express app
const app = express()

//Configuring the Environment Variables
dotenv.config({ path: './config/.env' })

// logger
app.use(morgan('dev'))

// BODYPARSER MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//CORS
app.use(cors())

// PASSPORT
app.use(passport.initialize());
app.use(session({ 
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.use(passport.session());

// ROUTES
app.use('/api/saml', saml)
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/client', client)
app.use('/api/season', season)
app.use('/api/series', series)
app.use('/api/episode', episode)
app.use('/api/learning', learning)
app.use('/api/quiz', quiz)
app.use('/api/answer', Answer)
app.use('/api/leader', Leader)
app.use('/api/game', Game)
app.use('/api/game-hot', HotGameRoutes)
app.use('/api/vision-champ', visionChampRoutes) // * vision champ routes
app.use('/api/level', levelRoutes) // * the don routes
app.use('/api/question', questionRoutes) // * the don routes
app.use('/api/recomended', Recomended)
app.use('/api/assesment', Assesment)
app.use('/api/how_to', HowTo)
app.use('/api/light-it-up', lightItUpGameRoutes)
app.use('/api/light-game-pair', lightGamePairRoutes)

app.use('/api/uploadimage', uploadImage)
app.use('/api/uploadmobileimage', uploadMobileImage)
app.get('/', (req, res) => {
  res.send('Login success | Welcome to Vividifi Server')
})

//Db connection
connectDb((isConnected) => {
  if (isConnected) {
    //CONFIGURE PORT
    const PORT = process.env.PORT || args[2] || 5000
    const server = app.listen(PORT, '0.0.0.0', () => {
      //Db connection
      console.log(`Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`)
    })
    //Handle the promise rejection error
    process.on('unhandledRejection', (err, promise) => {
      console.log('Error: ', err.message)
      server.close(() => process.exit(1))
    })
  } else {
    console.log('Database connection failed')
  }
})
