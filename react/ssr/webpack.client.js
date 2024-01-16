const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverConfig = {
    entry: path.resolve(__dirname, "./server/index.tsx"),
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname),
                exclude: path.resolve(__dirname, './dist'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    configFile: path.resolve(__dirname, '../babel.transform.js'),
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist/server"),
        filename: 'index.js',
        clean: true
    },
    mode: "development",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    }
}
const clientConfig = {
    entry: path.resolve(__dirname, "./client/index.tsx"),
    target: 'web',
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
                include: path.resolve(__dirname, './client'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    configFile: path.resolve(__dirname, '../babel.transform.js'),
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist/client"),
        filename: 'index.js',
        clean: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html")
    })],
    mode: "development",
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    }
}

module.exports = [serverConfig, clientConfig]