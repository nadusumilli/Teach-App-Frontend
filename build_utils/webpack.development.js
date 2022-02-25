const path = require("path");
const DIST_DIR = path.resolve("./dist");

const config = env => ({
    output: {
        path: DIST_DIR,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
            {        
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,        
                use: ['file-loader'],
                exclude: /node_modules/,
            } 
        ]
    }
});

module.exports = config;