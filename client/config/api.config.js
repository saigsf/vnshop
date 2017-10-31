const isPro = Object.is(process.env.NODE_ENV == 'production');
module.exports = {
    baseURl: isPro ? 'http://vnshop.saigsf.com/api/' : 'api/'
}