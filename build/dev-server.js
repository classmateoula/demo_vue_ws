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
  req.on('end', () => {
    console.log('传入参数')
    getApi(url.pathname.slice(4), querystring.parse(str)).then(result => {
      res.end(JSON.stringify({code: 200, info: result, msg: '请求成功'}))
    }).catch(err => {
      if (err == '未登陆') {
        res.end(JSON.stringify({ code: 401, msg: '未登录' }))
      } else {
        res.end(JSON.stringify({code: 400, msg: err}))
      }
    })
  })
}).listen(3000, () => {
  console.log('网络连接已打开：http://127.0.0.1:3000')
})

// var users = {};

// var server = http.createServer(function(req , res){
//   //解析数据
//   var str = "";
//   //POST数据不在req.url中
//   //POST数据就是内容，直接过来
//   //因此我们绑定两个事件来分段接收POST数据
//   req.on('data' , function(data){
//     str += data;
//   });
//   req.on('end' , function(){
//     var obj = urlLib.parse(req.url , true);
//     const url = obj.pathname;
//     const GET = obj.query;
//     const POST = querystring.parse(str);
//     console.log(url,GET,POST);
//     //如果请求的是user就认定为请求接口
//     //如果不是user都认为是请求文件
//     if(url == '/user'){   //接口
//       //客户端是get请求方式
//       //如果是POST请求，改成POST.act就可以
//       switch(GET.act){
//         //用户的动作是登陆
//         case 'reg':
//           //检查用户名是否存在
//           if(users[GET.user]){
//             //这边json的格式需要注意
//             //不论是键还是值都得用双引号引起来
//             //如果不这样做，前台将会无法解析json格式的字符串
//             res.write('{"ok": false, "msg": "该用户已存在"}');
//           }else{//没有注册过，严格来说需要验证所输入的用户名密码的合法性
//             users[GET.user] = GET.pass;
//             res.write('{"ok":true,"msg":"注册成功"}');
//           }
//           break;
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
//           break;
//         default:
//           res.write('{"ok":false,"msg":"未知的错误"}');
//       }
//       res.end();
//     } else if (url == '/ws'){  // ws
//       res.write('{"code": 209, "msg": "' + GET.msg + '"}')
//       res.end()
//     }else{  //请求文件
//       //读取文件
//       //客户端要请求的文件都存在www这个文件夹里
//       var file_name = './www' + url;
//       fs.readFile(file_name , function(err , data){
//         if(err){
//           res.write('404 is not found!');
//         }else{
//           res.write(data);
//         }
//         res.end();
//       });
//     }
//   });
// });

const app = new Koa()
let ws_server = app.listen(9000)
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
console.log('ws服务已开启：ws:127.0.0.1:9000')
