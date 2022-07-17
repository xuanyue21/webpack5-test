/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-12 07:46:40
 * @Description: 
 */
// If your plugin is using html-webpack-plugin as an optional dependency
// you can use https://github.com/tallesl/node-safe-require instead:
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class InlineChunkWebpackPlugin {
    constructor(tests){
        this.tests = tests;
    }
  apply (compiler) {
    compiler.hooks.compilation.tap('InlineChunkWebpackPlugin', (compilation) => {
        // 1. 获取html-webpack-plugins的hooks
        const hooks = HtmlWebpackPlugin.getHooks(compilation);
        // 2. 注册html-webpack-plugin的hooks -> alterAssetTagGroups
        // 3. 从里面将script的runtime文件变成inline script
      // Static Plugin interface |compilation |HOOK NAME | register listener 
      hooks.alterAssetTagGroups.tap(
        'InlineChunkWebpackPlugin', // <-- Set a meaningful name here for stacktraces
        (assets) => {
          assets.headTags = this.getInlineChunk(assets.headTags,compilation.assets);
          assets.bodyTags = this.getInlineChunk(assets.bodyTags,compilation.assets);
        }
      )

      // 删除runtime文件
      hooks.afterEmit.tap('InlineChunkWebpackPlugin',()=>{
        Object.keys(compilation.assets).forEach((filepath)=>{
            console.log(11111,filepath);
            // this.tests.some(test=>test.test(filepath))
            if(this.tests.some(test=>test.test(filepath))) {
                delete compilation.assets[filepath];
            }
        })
      })
    })
  }
      // console.log(headTags,'headTags')
            // 原版:
            // [
            //     {
            //       tagName: 'script',
            //       voidTag: false,
            //       meta: { plugin: 'html-webpack-plugin' },
            //       attributes: { defer: true, type: undefined, src: 'js/runtime~main.js' }  },
            //     {
            //       tagName: 'script',
            //       voidTag: false,
            //       meta: { plugin: 'html-webpack-plugin' },
            //       attributes: { defer: true, type: undefined, src: 'js/main.js' }        
            //     }
            //   ]
            // 修改为
            /*
                 {
                   tagName: 'script',
                   meta: { plugin: 'html-webpack-plugin' },
                   closeTag: true,
                   innerHtml: runtime文件内容
            
            */
  getInlineChunk(tags,assets) {
    console.log(tags,'tags')
   return  tags.map((tag)=>{
        if(tag.tagName !== 'script') return tag;
        // 获取文件的资源路径
        const filepath = tag.attributes.src;
        // 无路径  说明是行内标签
        if(!filepath) return tag;
        // 若不包含runtime 则返回
        if( !this.tests.some(test=>test.test(filepath))) return tag;
        return {
            tagName: 'script',
            innerHTML: assets[filepath].source(),
            closeTag: true
        }
    }) 
  }
}

module.exports = InlineChunkWebpackPlugin