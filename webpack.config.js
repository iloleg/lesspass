var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, 'node_modules')],
        alias: {
            src: path.resolve(__dirname, './src'),
            jquery: 'jquery/src/jquery'
        }
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=10000&name=images/[name].[ext]',},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader'}
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether'
        })
    ],
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false;
    module.exports.output.publicPath = '';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        })
    ]);
}

