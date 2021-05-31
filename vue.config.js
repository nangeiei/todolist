module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api' : '/'},
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData:`@import "@/styles/_main.scss";`
            },
        },
    },
}