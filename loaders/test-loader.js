/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 18:38:23
 * @Description: 
 */
module.exports = function(context) {
    console.log('执行了loader',context);
    return context;
}