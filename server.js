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
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'dbeaver',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors())
app.use(express.json());

app.post('/signin', (req,res) => {signin.handleSignin(req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db) })
app.get('/profile/:id', (req, res, db) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(3000, () => {
	console.log('app is running')
})

