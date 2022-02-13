import express from "express";
import bodyParser from "express";
//import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});

postgres.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const serverPort = 3001;

const database = {
  users: [
    {
      id:'123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id:'124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.json(database.users[0])
    } else {
      res.status(400).json('Error logging in')
    }
})

app.post('/register', (req, res) => {
  const {email, name} = req.body;
  /*bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash)
  });*/
  database.users.push({
    id:'125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if(!found) {
    res.status(400).json('Not found!')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
    if(!found) {
      res.status(400).json('Not found!')
    }
})

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
  // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
  // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
  // res = false
});
*/

app.listen(serverPort, () => {
  console.log('App is running on port', serverPort);
})


/* planning out api
/ --> res = this is working
/sigin --> POST success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT = user


*/