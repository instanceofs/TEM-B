let B=require('./B.seed');

//tool-Fun
require('./B.formatDate')
require("./B.objectModel")
require("./B.functionModel")
require("./B.stringModel")
require("./B.ua")
require("./B.uri")
require("./B.operating")
window.B=B
//typeof window !== 'undefined' ? console.log('frontEnd') : console.log('rearEnd');
// AMD / RequireJS
if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
        return B;
    });
}
// Node.js
else if (typeof module !== 'undefined' && module.exports) {
       module.exports = B;
}




