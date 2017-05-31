module.exports = {
    entry: "./front.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    }
};
