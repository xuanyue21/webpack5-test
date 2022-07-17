/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-12 06:09:48
 * @Description: 
 */
/**
 * 1. 直接使用style-loader,只能处理样式
 * 不能处理样式中引入其他资源
 * use: 仅有style-loader
 * 2. 借助css-loader解决样式中引入的其他资源问题
 * use: ["./loaders/style-loader","css-loader"]\
 * 问题: css-loader 暴露了一段js代码,style-loader需要执行js代码,得到返回值,再动态创建style标签,插入到页面中
 * 3. style-loader 使用pitch loader 用法 
 * 
*/
module.exports = function(content) {
//   const script = `
//     const styleEl = document.createElement('style');
//     styleEl.innerHTML = ${JSON.stringify(content)};
//     document.head.appendChild(styleEl); 
//   `;
//   return script;
}
module.exports.pitch = function(remainingRequest) {
    // remainingRequest 剩下还需要处理的loader
    // console.log(remainingRequest,111);
    // C:\Users\zhaik\Desktop\webpack知识集锦\define-loader\node_modules\css-loader\dist\cjs.js!C:\Users\zhaik\Desktop\webpack知识集锦\define-loader\src\index.css 111
    // 1. 需要将remainingRequest 中绝对路径改为相对路径,因为后面只能使用相对路径操作
    const relativePath = remainingRequest.split('!').map((absolutePath)=>{
        // 返回相对路径 this.context当前目录的路径
        return this.utils.contextify(this.context,absolutePath)
    }).join('!');
    // console.log(relativePath,'relativePath');
    //../node_modules/css-loader/dist/cjs.js!./index.css relativePath
    // !!表示只执行inline-loader 不执行其余loader  
    const script = `
        import style from "!!${relativePath}"
        const styleEl = document.createElement('style');
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl); 
      `;
      // 中止后面loader执行
      return script;
}