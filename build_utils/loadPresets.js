const {merge} = require("webpack-merge");

const config = env => {
    const { presets } = env;
    const mergedPresets = [].concat(...presets.split(" "));
    const mergedConfigs = mergedPresets.map(preset =>
        require(`./presets/webpack.${preset}`)()
    );

    return merge({}, ...mergedConfigs);
};

module.exports = config;