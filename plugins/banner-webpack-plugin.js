/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-11 08:11:02
 * @Description: 
 */
class BannerWebpackPlugin{
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        // 在资源输出资源触发的钩子函数
        compiler.hooks.emit.tapAsync('BannerWebpackPlugin',(compilation,callback)=>{
            // 1. 获取即将输出的资源    compilation.assets
            // 2. 过滤 只保留js和css资源
            // 3. 遍历剩下的js和css资源  添加上注释
            // debugger;
            
            const extensions = ['css','js']
            const assets =  Object.keys(compilation.assets).filter((assetPath)=>{
                // 将文件名切割['xxx','js'] ['xxx',css]
                const splitted = assetPath.split('.');
                // 获取最后一个文件名
                const extension = splitted[splitted.length -1];
                // 判断是否保护
                return  extensions.includes(extension);
            }) 
            console.log(assets,'assets')
            const prefix = `/*
*   Author: ${this.options.author}
*/`
            assets.forEach((asset)=>{
                const source = compilation.assets[asset].source();
                const content = prefix + source;
                compilation.assets[asset] = {
                    // 最终资源输出时,调用source方法,source方法的返回值就是资源的具体内容
                    source() {
                       return content; 
                    },
                    // 资源大小
                    size() {
                        return content.length
                    }
                }
            }) 
            callback();
        }) 
    }
}
module.exports = BannerWebpackPlugin;