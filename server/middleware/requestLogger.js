
module.exports = function logRequest(req, res, next) {
    try {
        const url = req.originalUrl.toLocaleLowerCase();
        if (url.indexOf('/login') === -1 && url.indexOf('/register') === -1 && url.indexOf('/api') > -1) {
            const loggerMessage = `${req.method} ${req.originalUrl} RequestBody:${JSON.stringify(req.body)} : Server Time -> ${new Date()}`;
            console.log(loggerMessage);
        }
    } catch (error) {
        // TODO:
    }
    next();
};