export default {

  module: {
    rules: {
      test: /\.pug$/,
      loader: 'pug-plain-loader',
      use: [
        'vue-style-loader',
        'css-loader',
        'less-loader'
      ]
    }
  }
}