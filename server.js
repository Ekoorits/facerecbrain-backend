import express from "express";
import bodyParser from "express";
import bcrypt, { hash } from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const serverPortLocal = 3001;
const PORT = process.env.PORT;

app.get('/', (req, res) => {res.send('My backend server is working! Yee') })
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })
app.put('/image', (req, res,) => { handleImage(req, res, db) })
app.post('/imageurl', (req, res,) => { handleApiCall(req, res) })

app.listen(PORT || serverPortLocal, () => {
  console.log(`App is running on port ${PORT}`);
})