/**
 * @author Nikhit Adusumilli
 * @param {Object} env
 * @returns {Object} configs
 */

const config = () => ({
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
});

module.exports = config;
