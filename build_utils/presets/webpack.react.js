/**
 * @author Nikhit Adusumilli
 * @param {Object} env 
 * @returns {Object} configs
 */

const config = () => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    }
});

module.exports = config;