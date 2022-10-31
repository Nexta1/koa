const Koa = require('koa')
const { koaBody } = require('koa-body');
const app = new Koa()
const userRouter = require('../router/user.route')

//中间件
app.use(koaBody())
app.use(userRouter.routes())
module.exports = app