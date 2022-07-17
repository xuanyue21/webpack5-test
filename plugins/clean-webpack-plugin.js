/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-12 06:21:35
 * @Description: 
 */
module.exports = class ClassWebpackPlugin{
    apply(compiler) {
        const outputPath = compiler.options.output.path;
        const fs = compiler.outputFileSystem;
        console.log(outputPath,'outputPath');
        // 1. 注册钩子,在打包输出之前emit
        compiler.hooks.emit.tap('ClassWebpackPlugin',(compilation)=>{
            // 2. 获取打包输出的目录
            this.removeFiles(fs,outputPath)
        })
        // 3. 通过fs删除打包输出目录下的所有文件
        
    }


    removeFiles(fs,filePath) {
        // 想要删除打包输出目录下所有资源,需要将所有目录下的资源删除,才能删除这个目录
        // 1. 读取当前目录下的所有资源
        const files = fs.readdirSync(filePath);
        // console.log(files,'files')
        // [ '6c137b823a53eab6.png', 'index.html', 'js' ] files
        // 2. 遍历一个一个删
        // 2.1 遍历所有文件,判断是文件夹还是文件
        // 2.2 是文件夹.就得删除下面所有的文件,才能删除文件夹
        // 2.3 是文件,就可直接删除
        files.forEach(file=>{
            const path = `${filePath}/${file}`;
            // 分析是文件夹or文件?
            const fileStat = fs.statSync(path)
            // console.log(fileStat);
            // 是文件夹
            if(fileStat.isDirectory()) {
                this.removeFiles(fs,path);
            } else {
                fs.unlinkSync(path);
            }
        })
    }
}