const express = require('express')
const app = express()
const mongoose = require('mongoose')
const chai = require('chai')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// io.on('connection', (socket)=>{
//   socket.on('joinuser', (room) => {
//     socket.join(room);
//   })
  
//   socket.on('sendmessage',(value)=>{
//     io.in('dieorleave').emit('receivemessage', value);
//   })
  
// })

// io.on('connection', function(socket){
//   socket.on('say to someone', function(id, msg){
//     socket.broadcast.to(id).emit('my message', msg);
//   });
// });

// Database
const dbURL = 'mongodb://kevinhimawan:12345@ds223509.mlab.com:23509/blogdb'
mongoose.connect(dbURL,(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

// Routes
const Registration = require('./routes/registration.routes')
const Admin = require('./routes/admin.routes')
const Home = require('./routes/home.routes')

app.use('/registration', Registration)
app.use('/admin', Admin)
app.use('/home', Home)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('masuk eror depan')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

server.listen(3000,()=>{console.log('Running')})

module.exports = app