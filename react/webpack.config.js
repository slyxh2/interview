const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins: ["postcss-preset-env"]
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, './src'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html")
    }), new ReactRefreshWebpackPlugin()],
    mode: "development",
    target: 'web',
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    devServer: {
        hot: true,
    },
}