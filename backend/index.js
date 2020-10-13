

const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
app.use(bodyParser.json())
app.use(cors());

passport.use(new Strategy((username, password, done) => {
  db.query('SELECT username, password FROM users WHERE username = ?', [username]).then(dbResults => {
    if(dbResults.length == 0)
    {
      console.log(dbResults)
      return done(null, false);
    }
    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
        done(null, dbResults[0]);
      }
      else
      {
        return done(null, false);
      }
    })
  }).catch(dbError => done(dbError))
}));


app.get('/', (req, res) => {
  db.query('SELECT * FROM chargers order by city')
  .then(results => res.json(results))
})


app.post('/search', (req, res) => {

  console.log(req.body.string)
  console.log(req.body.string.trim())
  let string = '\'%'+req.body.string.trim()+'%\'';
  db.query('select * from chargers where type like '+ string + 'or address like '+ string + 'or city like '+ string)
  .then(results => res.json(results))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/create', (req, res) => {
  let userinfo = req.body.userinfo
  db.query('INSERT INTO `new_schema`.`users` (`idUser`, `username`, `password`, `email`, `carReg`) VALUES ( uuid() , \'' + userinfo.username + '\', \''+ bcrypt.hashSync(userinfo.password, 8) + '\', \'' + userinfo.email + '\', \''+ userinfo.carReg +'\')')
  .then(results => res.json(results)).catch(err =>res.json(err))
})

app.post('/login', passport.authenticate('basic', { session: false }),(req, res) => 
  {
    res.sendStatus(200)
  }
);

