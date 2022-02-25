const path = require("path");
const webpack = require("webpack");
const {merge} = require("webpack-merge");
const htmlPlugin = require("html-webpack-plugin");
const loadPresets = env => require("./build_utils/loadPresets")(env);
const loadConfigs = env =>
    require(`./build_utils/webpack.${env.mode}`)(env);
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SRC_DIR = path.resolve("./src");

const config = ({ mode = 'production', presets = 'typescript' }) =>
    merge(
        {
            mode,
            entry: path.join(SRC_DIR, "index.tsx"),
            plugins: [
                new htmlPlugin({ template: path.join(SRC_DIR, "index.html") }),
                new ForkTsCheckerWebpackPlugin(),
            ]
        },
        loadPresets({ mode, presets }),
        loadConfigs({ mode, presets })
    );

module.exports = config;