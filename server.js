const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

let users = {
    'Anshul': 'an123'
}
io.on('connection', (socket) => {
    console.log('connected with socket id=', socket.id)
    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                socket.join(data.username)
                socket.emit('logged_in')
            } else {
                socket.emit('login_failed')
            }
        } else {
            users[data.username] = data.password
            socket.join(data.username)
            socket.emit('logged_in')
        }
        console.log(users)
    })
    socket.on('sent', (data) => {
        if (data.to) {
            io.to(data.to).emit('msg_rece', data)
        } else {
            socket.broadcast.emit('msg_rece', data)
        }
    })
})
app.use('/', express.static(__dirname + '/public'))
server.listen('1234', () => {
    console.log("server started at http://localhost:1234")
})