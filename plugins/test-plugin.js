/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-11 07:38:03
 * @Description: 
 */
/**
 * 1. webpack会加载webpack.config.js中所有的配置,此时就会new TestPlugin(),执行插件的constructor
 * 2. webpack创建compiler对象
 * 3. 遍历所有plugins中插件,调用插件的apply方法
 * 4. 执行剩下编译流程(触发各个hooks事件) 
*/
class TestPlugin{
    constructor() {
        console.log('constructor')
    }
    apply(compiler) {
        // console.log('apply',compiler);
        // 由文档可知,environment是同步钩子所以需要使用tap注册
        compiler.hooks.environment.tap("TestPlugin",()=>{
            console.log('test environment')
        })
        
        //emit 是异步串行 AsyncSeriesHook
        compiler.hooks.emit.tap('TestPlugin',(compilation)=>{
            // console.log(compilation,333)
            console.log('test emit同步')
           
        })
        compiler.hooks.emit.tapAsync('TestPlugin',(compilation,callback)=>{
            setTimeout(()=>{
                console.log('test emit异步async')
                callback();
            },1000)
        })
        compiler.hooks.emit.tapPromise('TestPlugin',(compilation)=>{
           return new Promise((resolve)=>{
                setTimeout(()=>{
                    console.log('test emit异步promise')
                    resolve();
                },2000)
           })
        })
        
        // make 是异步的并行钩子 AsyncParallelHook
        compiler.hooks.make.tapAsync('TestPlugin',(compilation,callback)=> {
            compilation.hooks.seal.tap('TestPlugin',()=>{
                console.log('testPlugin compilation')
            })
            setTimeout(()=>{
                console.log('test make33异步async')
                callback();
            },3000)
        })
        compiler.hooks.make.tapAsync('TestPlugin',(compilation,callback)=> {
            setTimeout(()=>{
                console.log('test make22异步async')
                callback();
            },2000)
        })
        compiler.hooks.make.tapAsync('TestPlugin',(compilation,callback)=> {
            setTimeout(()=>{
                console.log('test make11异步async')
                callback();
            },1000)
        })
    }
}

module.exports = TestPlugin;