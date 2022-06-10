const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencilMfeRegister = require('./stencil-mfe-register');

const stencilRemote = 'http://localhost:8083/dist';

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJson.dependencies //['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                stencilMfeRegister: stencilMfeRegister(stencilRemote)
            }
            // templateParameters: (compilation, assets, assetTags, options) => {
            //     return { stencilMfeRegister: stencilMfeRegister(stencilRemote) }
            // }
        })
    ]
};

module.exports = merge(commonConfig, devConfig);