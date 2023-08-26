const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {

  const isWatchMode = false; 

  const plugins = [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["main"],
    }),
    new WebpackPwaManifest({
      name: "Just Another Text Editor",
      short_name: "J.A.T.E",
      start_url: "/",
      display: "standalone",
      background_color: "#fff",
      theme_color: "#000",
    }),
  ];

  if (!isWatchMode) {
    plugins.push(
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      })
    );
  }
  
  return {
    watch: isWatchMode,
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};