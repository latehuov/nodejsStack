

const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
var Strategy = require('passport-http').BasicStrategy;
app.use(bodyParser.json())
app.use(cors());

passport.use(new Strategy((username, password, done) => {
  db.query('SELECT idUser, username, password FROM users WHERE username = ?', [username]).then(dbResults => {
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
  .then(results => 
    {res.json(results)}) 
})

app.get('/docks', (req, res) => {
  db.query('SELECT * FROM docks')
  .then(results => 
    {res.json(results)}) 
})

app.post('/docks', (req, res) =>{
  db.query('update docks set status = ? where idDock = ? ', [req.body.status, req.body.id])
  .then(results =>res.sendStatus(200))
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

app.get('/findID:name', (req, res) =>{
  db.query('select idUser from users where username = ?',[req.params.name]).then(result =>{
    res.json(result)})
})

app.post('/create', (req, res) => {
  let userinfo = req.body.userinfo
  db.query('INSERT INTO `new_schema`.`users` (`idUser`, `username`, `password`, `email`, `carReg`) VALUES ( uuid() , \'' + userinfo.username + '\', \''+ bcrypt.hashSync(userinfo.password, 8) + '\', \'' + userinfo.email + '\', \''+ userinfo.carReg +'\')')
  .then(results => res.json(results)).catch(err =>res.json(err))
})

app.post('/login', passport.authenticate('basic', { session: false }),(req, res) => 
  {
    res.json(req.user)
  }
);

app.post('/addhistory', (req, res) => {
  console.log(req.body)
  db.query('insert into `new_schema`.`history` (`idHistory`, `idUser`, `idCharger`, `idDock`, `startTime`) VALUES (uuid(), ?, ?, ?, NOW())',[req.body.idUser, req.body.idCharger, req.body.idDock,])
    .then((result) =>console.log(result)).catch((err) =>console.log(err))
  db.query('select idHistory from history where idUser = ? order by startTime DESC', [req.body.idUser]).then((result) =>res.json(result[0])).catch((err) =>console.log(err))
})

app.post('/closehistory', (req, res) => {
  console.log('closing charge')
  console.log(req.body)
  let charger = req.body.chargerInfo
  console.log(charger)
  let energy;
  if(charger.type === 'fast')
    energy = 70
  else
    energy = 22
  db.query('update `new_schema`.`history` set `endTime` = NOW(), `price` = (?*((NOW()-startTime)/60000)), `energy` = (?*((NOW()-startTime)/60000))  where idHistory = \''+req.body.idHistory.idHistory+'\'', [charger.price, energy]).then(results=>console.log(results))
})

app.get('/history:id', (req, res )=>{
  db.query('select * from history where idUser = ? order by startTime DESC',[req.params.id]).then(result => res.json(result))
})

//used to add docks into db
/*app.get('/addChargers', (req, res) =>{

  db.query('select idCharger from chargers').then(
    result=>{
      result.map((id)=> {
        for(let i=0; i < 4; i++)
          db.query('INSERT INTO `new_schema`.`docks` (`idCharger`, `idDock`, `Code`, `Status`) VALUES( \''+id.idCharger+'\',\''+id.idCharger + i +'\',\''+uuidv4().substring(0,4) + '\', 0)')
      })
        //console.log('INSERT INTO `new_schema`.`docks` (`idCharger`, `idDock`, `Code`, `Status`, `name`) VALUES(?,?,?,?,?)',[result.idcharger, result.idcharger + i ,uuidv4().substring(0,4), 0, i ])
    }
    
    )
    res.sendStatus(200)
})*/
