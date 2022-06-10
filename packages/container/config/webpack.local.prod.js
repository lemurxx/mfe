const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencilMfeRegister = require('./stencil-mfe-register');
const packageJson = require('../package.json');

const stencilRemote = 'http://localhost:8083/dist';

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: 'http://localhost:8080/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@http://localhost:8081/dist/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            templateParameters: {
                stencilMfeRegister: stencilMfeRegister(stencilRemote)
            }
        })

    ]
}

module.exports = merge(commonConfig, prodConfig);