/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 19:05:31
 * @Description:
 */
// module.exports = function(content) {
//     return content
// }
module.exports = function(content,map,meta) {
    console.log('test1')
    // setTimeout(()=>{
    //     console.log('同步loader')
        
    // },1000)
    this.callback(null,content,map,meta);
}