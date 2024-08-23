const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: './main.tsx',
    context: path.resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {

        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'index.html'}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
            }
        })
    ]

}