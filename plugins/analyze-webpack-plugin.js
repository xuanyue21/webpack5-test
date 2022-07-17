/*
 * @Author:
 * @LastEditTime: 2022-07-12 08:38:27
 * @Description: 
 */
module.exports = class AnalyzeWebpackPlugin{
    apply(compiler) {
        compiler.hooks.emit.tap('AnalyzeWebpackPlugin',(compilation)=>{
            // 遍历所有输出的文件,得到其大小
            const assets = Object.entries(compilation.assets);
            // markdown 表格语法

            let content = `|资源名称| 资源大小|
|---| ---|`;
            assets.forEach(([filename,file])=> {
                content += `\n| ${filename} | ${Math.ceil(file.size()/ 1024)}kb|`
            }) 
            // 最终生成md文件
            compilation.assets['analyze.md'] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            }
        })
    }
}