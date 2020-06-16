const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const merge = require( 'webpack-merge' );
const path = require( 'path' );

module.exports = ( env ) => {
    const build = env && env.production ? 'prod' : 'dev';

    let config = {
        entry: {
            main: path.join( __dirname, 'src', 'index' )
        },

        output: {
            filename: 'bundle.js',
            chunkFilename: '[name].[id].js',
            path: path.join( __dirname, 'dist' )
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf|html)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
                {
                    test: /\.svt$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            hotReload: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        /**
                         * MiniCssExtractPlugin doesn't support HMR.
                         * For developing, use 'style-loader' instead.
                         * */
                        build === 'prod' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin( {
                filename: '[name].css'
            } )
        ],

        resolve: {
            alias: {
                '@': path.join( __dirname, 'src' ),
                '@public': path.join( __dirname, 'public' ),
                'svelte': path.resolve( 'node_modules', 'svelte' ),
            }
        },

        devServer: {
            overlay: true,
        }
    };

    // Builds
    config = merge.smart(
        config,
        require( path.join( __dirname, 'config', 'build', `${ build }.config` ) )
    );

    console.log( `Build mode: \x1b[33m${ config.mode }\x1b[0m` );

    return config;
};
