const jwt = require('jsonwebtoken')
const { createUser, getUserInfo } = require('../service/user.service')
const { JWT_SECRET } = require('../config/config.default')
const { userRegisterError } = require('../constant/err.type')
class UserController {
    async register(ctx, next) {
        //1. 获取数据
        //2. 操作数据库
        //3. 返回结果
        const { user_name, password } = ctx.request.body
        try {
            const res = await createUser(user_name, password)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (error) {
            console.log(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }
    async login(ctx, next) {
        const { user_name } = ctx.request.body
        console.log('用户登陆成功')
        // 1.记录用户信息
        try {
            const { password, ...resUser } = await getUserInfo({ user_name })
            ctx.body = {
                code: '0',
                message: '用户登陆成功',
                result: {
                    token: jwt.sign(resUser, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (error) {
            console.error('用户登陆失败', error)
        }

    }
}
module.exports = new UserController()