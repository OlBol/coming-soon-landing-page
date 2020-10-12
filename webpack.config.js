const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, argv) => {
    const isProductionBuild = argv.mode === 'production';

    const js = {
        test: /\.js$/,
        loader: 'babel-loader'
    };

    const pug = {
        test: /\.pug$/,
        oneOf: [
            {
                resourceQuery: /^\?.pug/,
                use: ["pug-plain-loader"]
            },
            {
                use: ["pug-loader"]
            }
        ]
    };

    const styles = {
        test: /\.(s|post|)css$/,
        use: [ 'style-loader', 'postcss-loader' ]
    };

    const files = {
        test: /\.(png|jpe?g|gif|woff2?)$/i,
        loader: 'file-loader',
        options: {
            name: '[hash].[ext]'
        }
    };

    const svg = {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
                }
            },
            'svg-transform-loader',
            {
                loader: 'svgo-loader',
                options: {
                    plugins: [
                        { removeTitle: true },
                        {
                            removeAttrs: {
                                attrs: '(fill|stroke)'
                            }
                        }
                    ]
                }
            }
        ]
    };

    const config = {
        entry: './src/main.js',

        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.js'
        },

        devServer: {
            overlay: true
        },

        devtool: 'source-map',

        module: {
            rules: [js, styles, files, svg, pug]
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
            // new HtmlWebpackPlugin({
            //     title: 'paris',
            //     template: './src/index.pug'
            // }),
            new HtmlWebpackPlugin({
                title: 'budapest',
                template: './src/index.pug'
            }),
            new SpriteLoaderPlugin({ plainSprite: true }),
            // new FaviconsWebpackPlugin('./src/images/favicon.png')
        ]
    };

    if (isProductionBuild) {
        config.devtool = 'none';
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            // new MiniCssExtractPlugin()
        ]);

        config.optimization = {};

        config.optimization.minimizer = [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin()
        ];
    }

    return config;
};
