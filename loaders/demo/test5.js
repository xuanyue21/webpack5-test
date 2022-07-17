/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 19:21:42
 * @Description: 
 */
module.exports = function(content) {
    console.log(content,'content5')
    return content;
}
module.exports.pitch = function() {
    console.log('pitch5 loader')
    return '11';
};