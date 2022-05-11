let B = require('./B.seed');
//import axios from 'axios'
(function (B){
    var splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;
    B._mix(B, {
        /**
         * 浏览器地址是否是https
         * 传参数判断
         * @returns {boolean}
         */
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
         * url解码
         * @param  url
         * @param {String} url 这是url的一部分被解码.
         * @return {String} 解码的url部分字符串
         */
        urlDecode: function(url) {
            return decodeURIComponent(url.replace(/\+/g, " "))
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
        },
        /**
         * 传入对象返回url参数
         * @param data
         * @param iSquestionMark
         * @returns {string|string|string}
         */
        stringify: (data, iSquestionMark = true) => {
            let url = '';
            for (let k in data) {
                let value = data[k] !== undefined ? data[k] : '';
                url += `&${k}=${encodeURIComponent(value)}`
            }
            return url ? iSquestionMark ? `?${url.substring(1)}` : url.substring(1) : ''
        },
        /**
         * 下载一个链接
         * @param link
         * @param name
         * 下载excel download('http://111.229.14.189/file/1.xlsx')
         */
        download(link, name){
            if(!name){
                name = link.slice(link.lastIndexOf('/') + 1)
            }
            let eleLink = document.createElement('a')
            eleLink.download = name
            eleLink.style.display = 'none'
            eleLink.href = link
            document.body.appendChild(eleLink)
            eleLink.click()
            document.body.removeChild(eleLink)
        },
        /**
         * 浏览器下载静态文件
         * .downloadFile('1.txt','lalalallalalla')
         * .downloadFile('1.json',JSON.stringify({name:'hahahha'}))
         * @param {String} name 文件名
         * @param {String} content 文件内容
         */
        downloadFile(name, content){
            if(typeof name == 'undefined'){
                throw new Error('The first parameter name is a must')
            }
            if(typeof content == 'undefined'){
                throw new Error('The second parameter content is a must')
            }
            if(!(content instanceof Blob)){
                content = new Blob([content])
            }
            const link = URL.createObjectURL(content)
            B.download(link, name)
        },
        //提供一个link，完成文件下载，link可以是  http://xxx.com/xxx.xls
//         downloadByLink(link,fileName){
//            axios.request({
//                url: link,
//                responseType: 'blob' //关键代码，让axios把响应改成blob
//            }).then(res => {
//                const link=URL.createObjectURL(res.data)
//                B.download(link, fileName)
//            })
//    }
    });
})(B);


