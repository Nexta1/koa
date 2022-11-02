# 项目启动

npm init -y
npm i koa

# 读取配置文件

npm i dotenv

# 添加路由

npm i koa-router

# 目录结构优化

http 服务与 app 拆分
router 和 controller 拆分，路由解析 url，控制器处理业务

# 拆分 services

npm i koa-body
中间件注意执行顺序
解析 body 简化代码，拆分 services，主要作数据库处理

# 数据库操作

npm i sequelize
ORM：对象数据映射
通过 model 操作数据库

# 拆分中间件

错误 ctx.body 返回或发射 emit

# 密码加密

npm i bcryptjs

# 用户登陆令牌

npm i jsonwebtoken
也有写好的轮子
剩余参数去除某项值 const { password, ...resUser } = res
