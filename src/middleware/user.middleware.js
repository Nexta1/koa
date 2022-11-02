const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require('../constant/err.type')
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    //合法性
    if (!user_name || !password) {
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}

const VerifyUser = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            //冲突，已经注册
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.log('获取用户信息错误', error)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }

    await next()
}
//加密
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash
    await next()
}

const VerifyLogin = async (ctx, next) => {
    // 1.用户是否存在
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })

        if (!res) {
            console.log('用户不存在')
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }

        // 2.用户密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            console.log('用户密码错误')
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        console.log('获取用户信息错误', error)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
}
module.exports = {
    userValidator,
    VerifyUser,
    cryptPassword,
    VerifyLogin
}