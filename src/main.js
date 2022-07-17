import "./index.css";

console.log('hello main');
console.log('hello 2222');
console.log('hello 3333');

const sum = (...args)=> {
    return args.reduce((pre,cur)=> pre+cur,0)
}

// const imgUrl = require("./images/logo.png");
// const img = new Image();
// img.url = imgUrl;
// document.getElementById('app').appendChild(img);
