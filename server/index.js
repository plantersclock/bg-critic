
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path'); 
require('dotenv').config();           
 

const db = require('./db')
const top10ItemRouter = require('./routes/top10item-router')
const bggBaseRouter = require('./routes/bggbase-router')

const app = express()
const apiPort = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', top10ItemRouter)
app.use('/api', bggBaseRouter)

if (process.env.NODE_ENV === 'production') {           
    app.use(express.static('client/build'));
    
    console.log("__dirname")
    console.log(__dirname)
    console.log(path.resolve(path.join(__dirname, "../"), 'client', 'build', 'index.html'))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(path.join(__dirname, "../"), 'client', 'build', 'index.html'));
    });
  }

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))