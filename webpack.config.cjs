const path = require('path'); 
const PugPlugin = require('pug-plugin');

const PATHS = {
  output: path.join(__dirname, './dist/'),
};

const web = (env, argv) => {
  const isDev = argv.mode !== 'production';

  // recovery environment variables from webpack arguments, see in package.json
  process.env.NODE_ENV = argv.mode;
  process.traceDeprecation = isDev;

  return {
    mode: isDev ? 'development' : 'production',
    devtool: 'source-map',

    stats: {
      colors: true,
      preset: 'minimal',
      loggingDebug: ['sass-loader'],
    },

    output: {
      path: PATHS.output,
      publicPath: '/',
    },

    resolve: {
      alias: {
        '@images': path.join(__dirname, 'app/client/assets/images/'),
        '@fonts': path.join(__dirname, 'app/client/assets/fonts/'),
        '@scripts': path.join(__dirname, 'app/client/assets/js/'),
        '@styles': path.join(__dirname, 'app/client/assets/styles/'),
        '@views': path.join(__dirname, 'app/client/views/'),
      },
    },

    entry: {
      index: './app/client/views/index.pug',
    },

    plugins: [
      new PugPlugin({
        js: {
          filename: 'assets/js/[name].[contenthash:8].js',
        },
        css: {
          filename: 'assets/css/[name].[contenthash:8].css',
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            // import Pug in JavaScript/TypeScript as template function
            {
              issuer: /\.(js|ts)$/,
              loader: PugPlugin.loader,
              options: {
                method: 'compile',
              },
            },
            // render Pug from Webpack entry into static HTML
            {
              loader: PugPlugin.loader,
            },
          ],
        },

        {
          test: /\.(css|sass|scss)$/,
          use: ['css-loader', 'sass-loader'],
        },

        {
          test: /\.(png|jpg|jpeg|svg|ico)$/,
          type: 'asset/resource',
          include: /\/images/,
          generator: {
            filename: 'assets/img/[name].[hash:8][ext][query]',
          },
        },

        {
          test: /\.(woff|woff2|svg|eot|ttf|otf)$/i,
          type: 'asset/resource',
          include: /\/fonts/,
          generator: {
            filename: 'assets/fonts/[name][ext][query]',
          },
        },
      ],
    },
  };
};

module.exports = [web];
