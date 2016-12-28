
var express=require('express');

var app=express();
app.use(express.static(__dirname));
app.get('/',function (req,res) {
    res.sendfile('./index.html');
});
//app是一个监听函数

var server=require('http').createServer(app);
//得到io对象
var io= require('socket.io')(server);
//socket是套接字。监听客户端的连接事件 得到socket对象
//每个客户端连接上来之后都是一个独立的socket
io.on('connection',function (socket) {
    var username;
    socket.emit('message',{user:'系统',content:'欢迎来到聊天室，请输入呢称'});
    //当前连接监听客户端发过来的消息
    socket.on('message',function (msg) {
        if(username){
            io.emit('message',{user:username,content:msg});

        }else{
            username=msg;
            io.emit('message',{user:'系统',content:'欢迎'+username+'加入聊天室'});

        }
    });
});
server.listen(8080);