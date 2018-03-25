const path = require('path');

module.exports = {
    entry: "./src/front.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              use: 'vue-loader'
            }
        ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    }
};
