/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-10 16:53:23
 * @Description: 
 */
// file-loader 需要处理三件事
// 1. 将文件内容变成一个带hash值的文件名称 使用webpack的loader-utils库
// 2. 将文件名输出到dist目录
// 3. 输出图片地址信息并返回
// 图片字体等文件都是buffer数据,所以需要使用raw-loader来处理
// 官方地址：https://github.com/webpack/loader-utils
const loadUtils = require('loader-utils');

module.exports = function (content) {
    // 展示文件名
    const interplateName = loadUtils.interpolateName(
        this,
        "[hash].[ext][query]",
        {
            content
        }
    )
    // 也可增加文件+文件名
    // console.log(interplateName,'interplateName')
    this.emitFile(interplateName,content);
    // 返回 module.exports = "文件名/文件路径"
    return `module.exports = "${interplateName}"`;
}

module.exports.raw = true;