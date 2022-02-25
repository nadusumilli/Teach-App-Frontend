const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const htmlPlugin = require("html-webpack-plugin");
const loadPresets = env => require("./build_utils/loadPresets")(env);
const loadConfigs = env =>
    require(`./build_utils/webpack.${env.mode}`)(env);

const SRC_DIR = path.resolve("./src");

const config = ({ mode, presets } = { mode: "production", presets: "react" }) =>
    webpackMerge(
        {
            mode,
            entry: path.join(SRC_DIR, "index.js"),
            plugins: [
                new htmlPlugin({ template: path.join(SRC_DIR, "index.html") })
            ]
        },
        loadPresets({ mode, presets }),
        loadConfigs({ mode, presets })
    );

module.exports = config;