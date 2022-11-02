const auth = async (ctx, next) => {

    await next()
}
module.exports = {
    auth
}