/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 11:46:12
 * @Description: 
 */
module.exports= {
    extends: ["react-app"],
    parserOptions: {
        babelOptions:{
           presets: [
            [
                "babel-preset-react-app",
                false,
            ],
            "babel-preset-react-app/prod"
           ]
        }
    }
}