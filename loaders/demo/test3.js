/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 19:10:23
 * @Description: 
 */
// module.exports = function(content) {
//     console.log('raw loader',content)
//     return content;
// }
// module.exports.raw = true;

 function Test3(content) {
    console.log('raw loader',content)
    return content;
}
Test3.raw = true;
module.exports = Test3;