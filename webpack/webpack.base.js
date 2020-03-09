const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const {
  entryPages,
  rendererDir,
  rendererDistDir,
  htmlPlugins
} = require("./util.js");

const baseModule = {
  rules: [
    {
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    },
    {
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]"
            },
            sourceMap: true
          }
        },
        "less-loader"
      ],
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "../../[folder]/[name].[ext]",
            emitFile: false
          }
        }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      exclude: /node_modules/
    }
  ]
};

module.rendererConfig = {
  entry: entryPages,
  output: {
    path: rendererDistDir,
    filename: "[name]/index.js"
  },
  module: baseModule,
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    __filename: true,
    __dirname: true
  },
  target: "electron-renderer",
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: "[name]/index.css"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      "@components": path.resolve(rendererDir, "./components"),
      "@containers": path.resolve(rendererDir, "./containers")
    }
  }
};

module.mainConfig = {
  module: baseModule,
  target: "electron-main",
  plugins: [
    new CleanWebpackPlugin()
  ],
}
