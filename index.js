const express = require("express");
const path = require("path");
require('dotenv').config()

//APP Express
const app = express();

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket.js')

const {PORT} = process.env

//Path Publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
server.listen(PORT , (err)=> {
    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto', PORT);
    });


