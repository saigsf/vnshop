const isPro = Object.is(process.env.NODE_ENV == 'production');
module.exports = {
    baseURl: isPro ? 'http://www.vnshop.cn/api/' : 'api/'
}