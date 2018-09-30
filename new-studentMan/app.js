/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */

var express = require('express')
//得到router
var router = require('./router')//把app.js当作入口，引入router.js
//引包(第三方包：body-parser)————用于表单
var bodyParser = require('body-parser')

var app = express()

//配置使用 express-art-template
app.engine('html', require('express-art-template'))



//将node_modules、public文件夹开放出来
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))


//// *********配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前***********
///// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extened:false}))
//parse application/json
app.use(bodyParser.json())

//把router路由容器挂载到服务中
app.use(router)


//启动监听
app.listen(3000,function(){
	console.log('running...');
})

module.exports = app