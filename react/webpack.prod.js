const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]
                        }
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
                exclude: /node_modules/,
                options: {
                    configFile: path.resolve(__dirname, './babel.transform.js'),
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html")
    })],
    mode: "production",
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    }
}