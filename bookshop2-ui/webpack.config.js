const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    };

    config.output = {
        path: root('dist'),
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js'
    };

    config.plugins = [];

    config.plugins.push(
        new CommonsChunkPlugin({name: ['vendor', 'polyfills']})
    );

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body',
            chunksSortMode: packageSort(['polyfills', 'vendor', 'app'])
        })
    );

    config.devtool = 'source-map';

    config.resolve = {
        root: root(),
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    };

    config.module = {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {test: /\.html$/, loader:'raw'},
            {test: /\.scss/, exclude: root('src', 'app'), loader:'style!css!sass'},
            {test: /\.scss/, exclude: root('src', 'style'), loader:'raw!css!sass'}
        ]

    };

    return config;

}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

function packageSort(packages) {
    // packages = ['polyfills', 'vendor', 'app']
    var len = packages.length - 1;
    var first = packages[0];
    var last = packages[len];
    return function sort(a, b) {
        // polyfills always first
        if (a.names[0] === first) {
            return -1;
        }
        // main always last
        if (a.names[0] === last) {
            return 1;
        }
        // vendor before app
        if (a.names[0] !== first && b.names[0] === last) {
            return -1;
        } else {
            return 1;
        }
    }
}




