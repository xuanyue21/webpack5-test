/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 14:08:12
 * @Description: 
 */
module.exports= {
    root: true,
    // eslint-plugin-vue
    extends: ["plugin:vue/vue3-essential","eslint:recommended"],
    env: {
        node: true,
        es6: true,
        browser: true
    },
    parser: "@babel/eslint-parser"
}