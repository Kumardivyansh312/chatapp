let socket = io()
$('#loginBox').show();
$('#chatBox').hide();

$('#btnStart').click(() => {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
})
socket.on('logged_in', () => {
    $('#loginBox').hide();
    $('#chatBox').show();
})
$('#btnSendMsg').click(function() {
    socket.emit('sent', {
        msg: $('#inpNewMsg').val(),
        to: $('#inptoUser').val()
    })
})
socket.on('msg_rece', (data) => {
    $('#ulMsgs').append($('<li></li>').text(data.msg))
})
socket.on('login_failed', () => {
    alert("Username or Password failed")
})