const { createUser } = require('../service/user.service')
class UserController {
    async register(ctx, next) {
        //1. 获取数据
        //2. 操作数据库
        //3. 返回结果
        const { user_name, password } = ctx.request.body
        const res = await createUser(user_name, password)
        console.log(res)
        ctx.body = '用户注册成功'

    }
    async login(ctx, next) {
        ctx.body = '用户登陆成功'
    }
}
module.exports = new UserController()