// next.config.js
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
module.exports = withLess(withCss({
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        })
        return config
    }
}));