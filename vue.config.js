module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api' : '/'},
            }
        },
        open: true
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData:`@import "@/styles/_main.scss";`
            },
        },
    },
}