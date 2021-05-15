/**
 * path =
 * ・ node modulesのデフォルトで入ってるもの
 * ・ ファイルやディレクトリのパスを操作できる
 */
const path = require('path')

/**
 * path.resolve = 絶対パスに変換
 * __dirname = 現在いるディレクトリ
 */
const outputPath = path.resolve(__dirname, 'dist') // 現在いるディレクトリ + 'dist'パスを絶対パスに変換する

console.log({ outputPath }) // '/Users/〇〇/Desktop/MySpace/webpack-tutorial/dist'

module.exports = {
  entry: './src/index.js', // エントリーポイント(バンドル対象)
  output: {
    filename: 'main.js', // バンドルしたファイルの名前
    path: outputPath, // 出力先（絶対パス）
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /**
         * style-loader = jsの中にあるcss文字列をDOMに挿入する役割、CSSをページに反映させるために必要
         * css-loader = jsにあるcssのファイルを解決できる、jsファイル内で読み込まれるcssを文字列としてjsで使用できる。
         */
        use: ['style-loader', 'css-loader'], // 後ろから実行されるため注意
      },
      {
        test: /\.scss$/,
        /**
         * sass-loader = sassをcssへ変換するためのモジュール
         */
        use: ['style-loader', 'css-loader', 'sass-loader'], // 後ろから実行されるため注意
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
    ],
  },
  devServer: {
    contentBase: outputPath, // ドキュメントルートの設定
  },
}
