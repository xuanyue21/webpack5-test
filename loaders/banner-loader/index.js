/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-09 20:56:21
 * @Description: 
 */
const schema = require('./schema.json');
module.exports = function(content) {
    // schema 表示对options的验证规则
    // schema符合JSON Schema的规则
    const options = this.getOptions(schema);

    const prefix = `
        /**
         * Author: ${options.author},
         * age: ${options.age}
        */
    `;
    return prefix + content;
}