let B=require('./B.seed');
(function (B){
    B._mix(B, {
        /**
         * 防抖 在一定时间间隔内，多次调用一个方法，只会执行一次.
         * 这个方法的实现是从Lodash库中copy的
         * @param {*} func 要进行debouce的函数
         * @param {*} wait 等待时间,默认500ms
         * @param {*} immediate 是否立即执行
         */
        debounce(func, wait=500, immediate=false){
            var timeout
            return function() {
                var context = B
                var args = arguments
                if (timeout) clearTimeout(timeout)
                if (immediate) {
                    // 如果已经执行过，不再执行
                    var callNow = !timeout
                    timeout = setTimeout(function() {
                        timeout = null
                    }, wait)
                    if (callNow) func.apply(context, args)
                } else {
                    timeout = setTimeout(function() {
                        func.apply(context, args)
                    }, wait)
                }
            }
        }
    });
})(B);


