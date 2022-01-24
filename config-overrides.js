const { override } = require('customize-cra');

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
        // 配置打包后的文件位置
        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.css$/,
                threshold: 1024,
            }),
        )
    }
    return config;
}
module.exports = {
    webpack:override(
        addCustomize()
    )
};
