import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from "dotenv-webpack";

const config: webpack.Configuration = {
  mode: "development",
  stats: {
    logging: 'verbose',
  },
  output: {
    publicPath: "/",
    path: path.resolve("./build"),
 //   path: path.resolve(__dirname,"/build"),
 // path: path.resolve(__dirname, '../../build'),
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|css|module.scss|module.css)$/,
        /* use: ['style-loader','css-loader','postcss-loader','sass-loader'] */
        use: [
            'style-loader',
            // remove modules: true
           // {loader: 'css-loader', options: {sourceMap: true, importLoaders: 2, modules: true }},
           {loader: 'css-loader', options: {sourceMap: true, importLoaders: 2}},
           {loader: 'postcss-loader', options: {sourceMap: true}},
           {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
    
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@hooks": path.resolve("./src/hooks/"),
      "@controllers":path.resolve("./src/controllers/"),
      "@services":path.resolve("./src/services/"),
      "@axios":path.resolve("./src/axios/"),
      "@components":path.resolve("./src/components/"),
      "@config":path.resolve("./src/config/"),
      "@constants":path.resolve("./src/constants/"),
      "@domain":path.resolve("./src/domain/"),
      "@routes":path.resolve("./src/routes/"),
      "@features":path.resolve("./src/features/"),
      "@storages":path.resolve("./src/store/")
    },
    extensions: [".tsx", ".ts", ".js",".scss",".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: 'index.html', // output file
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
        async: false
    }),
    new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    statsFilename: "statsgemini.json",
    generateStatsFile: true,
    // Excludes module sources from stats file so there won't be any sensitive data
    statsOptions: { source: false },
    logLevel: "error",
    defaultSizes: "parsed",
    openAnalyzer: false,
    
     // bundleDir: "../../reports",  
     // reportFilename: "reports",
     // reportTitle: "bundle analysis",
    }),
    new Dotenv({
      path: ".env", // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    })
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true
  },
};

export default config;