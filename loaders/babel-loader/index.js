/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 22:22:37
 * @Description: 
 */
//https://www.babeljs.cn/docs/babel-core
const schema = require("./schema.json");
const babel = require("@babel/core");

module.exports = function (content) {
  const options = this.getOptions(schema);
  // 使用异步loader
  const callback = this.async();
  // 使用babel对js代码进行编译
  babel.transform(content, options, function (err, result) {
    callback(err, result.code);
  });
};