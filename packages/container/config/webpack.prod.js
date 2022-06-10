const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stencilMfeRegister = require('./stencil-mfe-register');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // set in the container.yml / repo secret
const stencilRemote = `${domain}/stencil/latest`;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'    //same set as the deploy path in container-deploy.yml + the / is needed at the end
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
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