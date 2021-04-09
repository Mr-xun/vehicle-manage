const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: "http://39.106.109.80:8080",
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
};