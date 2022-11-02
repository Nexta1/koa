const Koa = require('koa')
const { koaBody } = require('koa-body');
const errHandler = require('./errHandler')
const app = new Koa()
const userRouter = require('../router/user.route')

//中间件
app.use(koaBody())
app.use(userRouter.routes())
//
app.on('error', errHandler)
module.exports = app