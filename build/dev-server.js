const http = require("http");
const getApi = require('../src/db')
const urlLib = require('url')
const WebSocketServer = require('ws').Server
const Koa = require('koa')
const querystring = require("querystring");

http.createServer((req, res) => {
  let url = urlLib.parse(req.url)
  let str = ''
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
  // console.log('开始连接')
  if (url.path.slice(0, 4) != '/api') {
    res.end(JSON.stringify({code: 405, msg: '网络错误'}))
  }

  if (req.method === 'GET') {
    str = url.query
  } else if (req.method === 'POST') {
    req.on('data', (data) => {
      str += data
    })
  }

  //req.on('end', function (err) {
    getApi(url.pathname.slice(4), querystring.parse(str)).then(result => {
      res.end(JSON.stringify({code: 200, info: result, msg: '请求成功'}))
    }).catch(err => {
      res.end(JSON.stringify({code: 400, msg: err}))
    })
  //})
}).listen(3000, () => {
  console.log('网络连接已打开：http://127.0.0.1:3000')
})

// var users = {};

// var server = http.createServer(function(rarse(str);
//     console.log(url,GET,POST);
//     //如果请求的是user就认定为    break;
//         case 'login':
//           //检查用户是否存在
//           if(users[GET.user] == null){
//             res.write('{"ok":false,"msg":"该用户不存在"}');
//           }else if(users[GET.user] !== GET.pass){
//             //检查密码是否正确
//             res.write('{"ok":false,"msg":"账户或密码错误"}');
//           }else{
//             res.write('{"ok":true,"msg":"登陆成功"}');
//           }

const app = new Koa()
let ws_server = app.listen(9001)
const wss = new WebSocketServer({
  server: ws_server
});

wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
      client.send(data);
  });
};

wss.on('connection', function (res, req) {
  res.on('message', function (message) {
    if (urlLib.parse(req.url).path.indexOf('/api/ws/') != -1) {
      // res.on('open', () => {
      //   wss.broadcast(JSON.stringify({code: 200, data: JSON.parse(message), msg: '请求成功'}))
      // })
      wss.broadcast(JSON.stringify({code: 200, data: JSON.parse(message), msg: '请求成功'}))
    } else {
      res.send(JSON.stringify({code: 400, msg: '请求失败'}))
    }
  })
});
console.log('ws服务已开启：ws:127.0.0.1:9001')
