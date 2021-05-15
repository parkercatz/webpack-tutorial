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
}
