import express from "express";
import bodyParser from "express";
import bcrypt, { hash } from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleImage } from "./controllers/image.js";
//import res from "express/lib/response";

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'password1',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const serverPort = 3001;

app.get('/', (req, res) => {res.send('Succsess') })
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })
app.put('/image', (req, res,) => { handleImage(req, res, db) })

app.listen(serverPort, () => {
  console.log('App is running on port', serverPort);
})