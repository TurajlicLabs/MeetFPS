const path = require( 'path' );
const merge = require( 'webpack-merge' );

module.exports = (env) => {
    let config = {
        entry: {
            main: path.join( __dirname, 'src', 'index' )
        },

        output: {
            filename: 'bundle.js',
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
                }
            ]
        },

        plugins: [],

        resolve: {
            alias: {
                '@': path.join( __dirname, 'src' ),
                '@public': path.join( __dirname, 'public' )
            }
        },

        devServer: {
            overlay: true,
        }
    };

    // Builds
    const build = env && env.production ? 'prod' : 'dev';
    config = merge.smart(
        config,
        require( path.join( __dirname, 'config', 'build', `${ build }.config` ) )
    );

    console.log(`Build mode: \x1b[33m${ config.mode }\x1b[0m`);

    return config;
};
