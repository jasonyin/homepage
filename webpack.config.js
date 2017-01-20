//    Copyright 2017 Jason Yin <jasonyin@outlook.com>
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Used with webpack-dev-server
const PUBLIC_PATH = '';
const IS_DEV = process.env.jy_ENV === 'development';
const IS_PROD = process.env.jy_ENV === 'production';

const OUT_PATH = IS_PROD ? path.resolve('./app/public') : path.resolve('./build');

const createBannerPlugin = () => new webpack.BannerPlugin([
  '/*!',
  ' JasonYin.Tech',
  ` Copyright (c) ${new Date().getFullYear()} Jason Yin `,
  ' License: Apache-2.0',
  '*/',
].join('\n'), {
  raw: true,
  entryOnly: true,
});

module.exports = [
{
  name: 'jy-homepage',
  entry: {
    main: [
      path.resolve('./app/scripts/main.js'),
      path.resolve('./app/ui-components/all/index.js')
    ],
  },
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: 'jy.main.js',
    libraryTarget: 'umd',
    library: ['jy', 'main'],
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader',
      query: {
        partialDirs: [
          path.resolve('app/templates/partials')
        ]
      }
    }],
  },
  plugins: [
    createBannerPlugin(),
    /*new webpack.optimize.CommonsChunkPlugin({}),*/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: 'app/templates/pages/home.hbs',
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      inject: false,
      template: 'app/templates/pages/about.hbs',
    }),
  ],
}, {
  name: 'style-ui-components-all',
  entry: [
    path.resolve('./app/ui-components/all/style.scss'),
    path.resolve('./app/styles/master.scss')],
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    // In development, these are emitted as js files to facilitate hot module replacement. In
    // all other cases, ExtractTextPlugin is used to generate the final css, so this is given a
    // dummy ".css-entry" extension.
    filename: 'jy.main.css' + (IS_DEV ? '.js' : '-entry'),
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: 
          ExtractTextPlugin.extract('css!postcss!sass'),
    }],
  },
  sassLoader: {
    includePaths: glob.sync('packages/*//node_modules').map((d) => path.join(__dirname, d)),
  },
  plugins: [
    new ExtractTextPlugin('jy.main.css'),
    createBannerPlugin(),
  ],
  postcss: function() {
    return [
      require('autoprefixer'),
    ];
  },
}, /*{
  name: 'script-ui-components',
  entry: {
    animation: [path.resolve('./app/ui-components/animation/index.js')],
    autoInit: [path.resolve('./app/ui-components/auto-init/index.js')],
    base: [path.resolve('./app/ui-components/base/index.js')],
    drawer: [path.resolve('./app/ui-components/drawer/index.js')],
  },
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: 'jy.[name].' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    library: ['jy', '[name]'],
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  plugins: [
    createBannerPlugin(),
],
},{
  name: 'css',
}, {
  name: 'style-ui-components',
  entry: {
    'jy-all-style-ui-components': path.resolve('./app/ui-components/all/style.scss'),
    'jy.animation': path.resolve('./app/ui-components/animation/animation.scss'),
    'jy.button': path.resolve('./app/ui-components/button/button.scss'),
    'jy.drawer': path.resolve('./app/ui-components/drawer/drawer.scss'),
    'jy.elevation': path.resolve('./app/ui-components/elevation/elevation.scss'),
    'jy.theme': path.resolve('./app/ui-components/theme/theme.scss'),
    'jy.typography': path.resolve('./app/ui-components/typography/typography.scss'),
  },
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    // In development, these are emitted as js files to facilitate hot module replacement. In
    // all other cases, ExtractTextPlugin is used to generate the final css, so this is given a
    // dummy ".css-entry" extension.
    filename: '[name].' + (IS_PROD ? 'min.' : '') + 'css' + (IS_DEV ? '.js' : '-entry'),
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: IS_DEV ?
          'style!css?sourceMap!postcss!sass?sourceMap' :
          ExtractTextPlugin.extract('css!postcss!sass'),
    }],
  },
  sassLoader: {
    includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d)),
  },
  plugins: [
    new ExtractTextPlugin('[name].' + (IS_PROD ? 'min.' : '') + 'css'),
    createBannerPlugin(),
  ],
  postcss: function() {
    return [
      require('autoprefixer'),
    ];
  },
}*/];
