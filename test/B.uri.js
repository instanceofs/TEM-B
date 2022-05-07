import B from "./B.seed";

/**
 * Uri
 * @author BAI
 */
(function (B){
    var splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;
    B._mix(B, {
        isHttps: function (){
            return 'https:' == document.location.protocol ? true : false;
        },
        /**
         * 获取页面参数
         * @param {String} uri
         * @returns {Array}
         */
        uri: function (url){
            var url = (url ? url : location.href);
            return (B.urlDecode(url).match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function (e, r){
                return e[r.slice(0, r.indexOf("="))] = r.slice(r.indexOf("=") + 1), e;
            }, {});
        },
        /**
         * url编码
         * @param  url
         * @return {String} 已编码的url部分字符串
         */
        urlEncode: function (b){
            return encodeURIComponent(String(b))
        },
        /**
         * url解码
         * @param  url
         * @param {String} url 这是url的一部分被解码.
         * @return {String} 解码的url部分字符串
         */
        urlDecode: function (url){
            return decodeURIComponent(url.replace(/\+/g, " "))
        },
        /**
         * cookie操作
         */
        cookie: {
            set: function (name, value, minutes, domain){
                if("string" !== typeof name || "" === B.trim(name)) return;
                var c = name + '=' + encodeURI(value);
                if("number" === typeof minutes && minutes > 0){
                    var time = (new Date()).getTime() + 1000 * 60 * minutes;
                    c += ';expires=' + (new Date(time)).toGMTString();
                }
                if("string" == typeof domain)
                    c += ';domain=' + domain;
                document.cookie = c + '; path=/';
            },
            get: function (name){
                var b = document.cookie;
                var d = name + '=';
                var c = b.indexOf('; ' + d);
                if(c == -1){
                    c = b.indexOf(d);
                    if(c != 0){
                        return null;
                    }
                } else {
                    c += 2;
                }
                var a = b.indexOf(';', c);
                if(a == -1){
                    a = b.length;
                }
                return decodeURI(b.substring(c + d.length, a));
            },
            clear: function (name, domain){
                if(this.get(name)){
                    document.cookie = name + '=' + (domain ? '; domain=' + domain : '') + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
                }
            }
        },
        /**
         * 本地储存
         * set  存储
         * get  获取
         */
        sessionStorage: (function (){
            var set = function (name, val){
                //存储
                var str = JSON.stringify(val);
                sessionStorage[name] = str;
            };
            var get = function (name){
                //取出
                var str = sessionStorage[name];
                str = str ? JSON.parse(str) : "";
                return str;
            };
            var clear = function (name){
                // 删除
                if(name){
                    sessionStorage.removeItem(name);
                } else {
                    sessionStorage.clear()
                }

            }
            return {
                set: set,
                get: get,
                clear: clear
            };
        })(),
        /**
         * 本地储存-永久
         * 使用 第2个值可传对象
         */
        localStorage: (function (){
            var set = function (name, val){
                //存储
                var str = JSON.stringify(val);
                localStorage.setItem(name, str)
            };
            var get = function (name){
                //取出
                var str = localStorage.getItem(name)
                str = str ? JSON.parse(str) : "";
                return str;
            };
            var clear = function (name){
                // 删除
                if(name){
                    localStorage.removeItem(name);
                } else {
                    localStorage.clear()
                }

            }

            return {
                set: set,
                get: get,
                clear: clear
            };
        })(),
        ext: function (url){
            return (url.match(splitPathRe) || [])[4] || '';
        }
    });
})(B);
