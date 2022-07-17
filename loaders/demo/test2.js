/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 19:06:25
 * @Description: 
 */
module.exports = function(content,map,meta) {
    const callback = this.async();
    setTimeout(()=>{
        console.log('test2',content);
        callback(null,content,map,meta)
    },3000)
}