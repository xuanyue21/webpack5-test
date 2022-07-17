/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 20:39:25
 * @Description: 
 */
module.exports = function (content) {
    // 清除文件内容 console.log(xxxx)
    return content.replace(/console\.log\(.*\);?/g,"")
}