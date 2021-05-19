/**
 * path =
 * ・ node modulesのデフォルトで入ってるもの
 * ・ ファイルやディレクトリのパスを操作できる
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

/**
 * path.resolve = 絶対パスに変換
 * __dirname = 現在いるディレクトリ
 */
const outputPath = path.resolve(__dirname, 'dist') // 現在いるディレクトリ + 'dist'パスを絶対パスに変換する

module.exports = (env, argv) => {
  const prodMode = argv.mode === 'production'
  // --mode=production の時、NODE_ENV を設定する
  if (prodMode) {
    process.env.NODE_ENV = 'production'
  }
  return {
    entry: './src/index.js', // エントリーポイント(バンドル対象)
    output: {
      filename: 'main.js', // バンドルしたファイルの名前
      path: outputPath, // 出力先（絶対パス）
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/, // 除外ファイル
          loader: 'babel-loader', // トランスパイルの実行
          options: {
            presets: ['minify'],
          },
        },
        {
          test: /\.(sc|c)ss$/,
          /**
           * style-loader = jsの中にあるcss文字列をDOMに挿入する役割、CSSをページに反映させるために必要
           * css-loader = jsにあるcssのファイルを解決できる、jsファイル内で読み込まれるcssを文字列としてjsで使用できる。
           * sass-loader = sassをcssへ変換するためのモジュール
           */
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // 後ろから実行されるため注意
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          /**
           * url-loader = 画像ファイルやsvgファイルをDataUrl形式に変換して、jsファイルの一部として、プロジェクト内に取り込める
           * file-loader = url-loaderのようにファイルをjsにバンドルして、DataUrl形式に変換はしません。その代わりに、ファイルをリソースとして出力し、ファイルのパスを管理します。
           */
          loader: 'url-loader',
          options: {
            // file-loader option
            limit: 2048, // 2kbを超えるサイズはnameで指定したものに分類される
            name: './images/[name].[ext]',
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    devServer: {
      contentBase: outputPath, // ドキュメントルートの設定
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css', //[name] = デフォルト, [hash] = ユニークな名前
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
    },
    devtool: 'eval-source-map',
  }
}
