const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const { userValidator, VerifyUser, cryptPassword, VerifyLogin } = require('../middleware/user.middleware')
const router = new Router({ prefix: '/users' })
//注册接口
router.post('/register', userValidator, VerifyUser, cryptPassword, register)
router.post('/login', userValidator, VerifyLogin, login)
router.patch('/', (ctx, next) => {
    console.log('成功')
})
module.exports = router