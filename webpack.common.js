const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        mainWindow: './src/window/index.js'
    },
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            '@babel/preset-env', {
                                targets: {
                                    esmodules: true
                                }
                            }],
                            '@babel/preset-react']
                    }
                }
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['.js'],
    },
    output: {
        filename: '[name].app.js',
        path: path.resolve(__dirname, 'build', 'js'),
    },
};
