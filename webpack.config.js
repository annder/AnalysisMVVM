const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },
    plugins: [
        new UglifyJSPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: "development",
    module: {
        rules: [{
            test: /\^.js/,
            include: [path.resolve(__dirname, "src")],
            exclude: [path.resolve(__dirname, "node_modules")],
            loader: "babel-loader",
            query: {
                preset: ["latest"]
            }
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: path.join("/dist"),
        port: 8080,
        compress: true,
    },
}