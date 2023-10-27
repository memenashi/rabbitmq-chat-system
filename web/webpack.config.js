const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3200,
    historyApiFallback: {
      rewrites: [{ from: /^\/*/, to: "/index.html" }],
    },
    proxy: {
      "/api": {
        target: process.env.API_SERVER || "http://10.1.232.32:3201",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
