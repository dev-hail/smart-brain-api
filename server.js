const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex')
const register = require('./Controllers/register.js')
const signin = require('./Controllers/signin.js')
const profile = require('./Controllers/profile.js')
const image = require('./Controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.POSTGRES_URL ,
    ssl: {
    rejectUnauthorized: false
  }
  }
});

const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {res.send("it is working!")})
app.post('/signin', (req,res) => {signin.handleSignin(req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db) })
app.get('/profile/:id', (req, res, db) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on ${process.env.PORT}`)
})

