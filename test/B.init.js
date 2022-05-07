import B from "./B.seed";
//工具函数
import  "./B.formatDate";
import  "./B.objectModel";
import  "./B.business";
import  "./B.uri";
// 工具指令
import  "./v-directive";
import  "./v-longpress";

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
// included directly via <script> tag
else {
  // root.async = async;
   'B' in self || ( self['B'] = B);
}
export default B

