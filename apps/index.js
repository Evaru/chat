const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const server = require('http').Server(app);
const io = require('socket.io')(server,{serveClient:true});
const mongoose = require('mongoose')
const passport = require('passport')
const { Strategy  } = require('passport-jwt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var cors = require('cors')
const {jwt} = require('./config')

const PORT = process.env.PORT || 8000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());


app.use(cors())

passport.use(new Strategy(jwt, function(jwt_payload, done) {
    if(jwt_payload != void(0)) return done(false,jwt_payload)
    done()
}))

mongoose.connect('mongodb+srv://Evaru:dfghjc13@cluster0-vpnvn.mongodb.net/chat',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.Promise = require('bluebird')

mongoose.set('debug', true)

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});


require('./router')(app)

require('./sockets')(io)

server.listen(PORT,()=>{
    console.log('Server started')
})