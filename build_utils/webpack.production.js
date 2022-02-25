const path = require("path");
const cssPlugin = require("mini-css-extract-plugin");

const DIST_DIR = path.resolve("../backend/static/app");

const config = env => ({
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: "/static/app/"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [cssPlugin.loader, "css-loader", "sass-loader"],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [new cssPlugin()]
});

module.exports = config;