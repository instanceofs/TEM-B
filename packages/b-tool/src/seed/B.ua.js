let B=require('./B.seed');
/**
 * 终端识别
 */
(function (B){
    /*global process*/

    var win = typeof window !== 'undefined'?window : B.Env.host,
        doc = win.document,
        navigator = win.navigator,
        ua = navigator && navigator.userAgent || '';

    function numberify(s){
        var c = 0;
        // convert '1.2.3.4' to 1.234
        return parseFloat(s.replace(/\./g, function (){
            return (c++ === 0) ? '.' : '';
        }));
    }

    function setTridentVersion(ua, UA){
        var core, m;
        UA[core = 'trident'] = 0.1; // Trident detected, look for revision

        // Get the Trident's accurate version
        if((m = ua.match(/Trident\/([\d.]*)/)) && m[1]){
            UA[core] = numberify(m[1]);
        }

        UA.core = core;
    }

    function getIEVersion(ua){
        var m, v;
        if((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&
            (v = (m[1] || m[2]))){
            return numberify(v);
        }
        return 0;
    }

    function getDescriptorFromUserAgent(ua){
        var EMPTY = '',
            os,
            core = EMPTY,
            shell = EMPTY, m,
            IE_DETECT_RANGE = [6, 9],
            ieVersion,
            v,
            end,
            VERSION_PLACEHOLDER = '{{version}}',
            IE_DETECT_TPL = '<!--[if IE ' + VERSION_PLACEHOLDER + ']><' + 's></s><![endif]-->',
            div = doc && doc.createElement('div'),
            s = [];
        /**
         * UA
         * @class B.UA
         * @singleton
         */
        var UA = {
            /**
             * webkit version
             * @type undefined|Number
             * @member BAI.UA
             */
            webkit: undefined,
            /**
             * trident version
             * @type undefined|Number
             * @member BAI.UA
             */
            trident: undefined,
            /**
             * gecko version
             * @type undefined|Number
             * @member BAI.UA
             */
            gecko: undefined,
            /**
             * presto version
             * @type undefined|Number
             * @member BAI.UA
             */
            presto: undefined,
            /**
             * chrome version
             * @type undefined|Number
             * @member BAI.UA
             */
            chrome: undefined,
            /**
             * safari version
             * @type undefined|Number
             * @member BAI.UA
             */
            safari: undefined,
            /**
             * firefox version
             * @type undefined|Number
             * @member BAI.UA
             */
            firefox: undefined,
            /**
             * ie version
             * @type undefined|Number
             * @member BAI.UA
             */
            ie: undefined,
            /**
             * ie document mode
             * @type undefined|Number
             * @member BAI.UA
             */
            ieMode: undefined,
            /**
             * opera version
             * @type undefined|Number
             * @member BAI.UA
             */
            opera: undefined,
            /**
             * mobile browser. apple, android.
             * @type String
             * @member BAI.UA
             */
            mobile: undefined,
            /**
             * browser render engine name. webkit, trident
             * @type String
             * @member BAI.UA
             */
            core: undefined,
            /**
             * browser shell name. ie, chrome, firefox
             * @type String
             * @member BAI.UA
             */
            shell: undefined,

            /**
             * PhantomJS version number
             * @type undefined|Number
             * @member BAI.UA
             */
            phantomjs: undefined,

            /**
             * operating system. android, ios, linux, windows
             * @type string
             * @member BAI.UA
             */
            os: undefined,

            /**
             * ipad ios version
             * @type Number
             * @member BAI.UA
             */
            ipad: undefined,
            /**
             * iphone ios version
             * @type Number
             * @member BAI.UA
             */
            iphone: undefined,
            /**
             * ipod ios
             * @type Number
             * @member BAI.UA
             */
            ipod: undefined,
            /**
             * ios version
             * @type Number
             * @member BAI.UA
             */
            ios: undefined,

            /**
             * android version
             * @type Number
             * @member BAI.UA
             */
            android: undefined,

            /**
             * nodejs version
             * @type Number
             * @member BAI.UA
             */
            nodejs: undefined
        };

        // ejecta
        if(div && div.getElementsByTagName){
            // try to use IE-Conditional-Comment detect IE more accurately
            // IE10 doesn't support this method, @ref: http://blogs.msdn.com/b/ie/archive/2011/07/06/html5-parsing-in-ie10.aspx
            div.innerHTML = IE_DETECT_TPL.replace(VERSION_PLACEHOLDER, '');
            s = div.getElementsByTagName('s');
        }

        if(s.length > 0){

            setTridentVersion(ua, UA);

            // Detect the accurate version
            // 注意：
            //  UA.shell = ie, 表示外壳是 ie
            //  但 UA.ie = 7, 并不代表外壳是 ie7, 还有可能是 ie8 的兼容模式
            //  对于 ie8 的兼容模式，还要通过 documentMode 去判断。但此处不能让 UA.ie = 8, 否则
            //  很多脚本判断会失误。因为 ie8 的兼容模式表现行为和 ie7 相同，而不是和 ie8 相同
            for (v = IE_DETECT_RANGE[0], end = IE_DETECT_RANGE[1]; v <= end; v++) {
                div.innerHTML = IE_DETECT_TPL.replace(VERSION_PLACEHOLDER, v);
                if(s.length > 0){
                    UA[shell = 'ie'] = v;
                    break;
                }
            }

            // win8 embed app
            if(!UA.ie && (ieVersion = getIEVersion(ua))){
                UA[shell = 'ie'] = ieVersion;
            }

        } else {
            // WebKit
            if((m = ua.match(/AppleWebKit\/([\d.]*)/)) && m[1]){
                UA[core = 'webkit'] = numberify(m[1]);

                if((m = ua.match(/OPR\/(\d+\.\d+)/)) && m[1]){
                    UA[shell = 'opera'] = numberify(m[1]);
                }
                // Chrome
                else if((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]){
                    UA[shell = 'chrome'] = numberify(m[1]);
                }
                // Safari
                else if((m = ua.match(/\/([\d.]*) Safari/)) && m[1]){
                    UA[shell = 'safari'] = numberify(m[1]);
                }

                // Apple Mobile
                if(/ Mobile\//.test(ua) && ua.match(/iPad|iPod|iPhone/)){
                    UA.mobile = 'apple'; // iPad, iPhone or iPod Touch

                    m = ua.match(/OS ([^\s]*)/);
                    if(m && m[1]){
                        UA.ios = numberify(m[1].replace('_', '.'));
                    }
                    os = 'ios';
                    m = ua.match(/iPad|iPod|iPhone/);
                    if(m && m[0]){
                        UA[m[0].toLowerCase()] = UA.ios;
                    }
                } else if(/ Android/i.test(ua)){
                    if(/Mobile/.test(ua)){
                        os = UA.mobile = 'android';
                    }
                    m = ua.match(/Android ([^\s]*);/);
                    if(m && m[1]){
                        UA.android = numberify(m[1]);
                    }
                }
                // Other WebKit Mobile Browsers
                else if((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))){
                    UA.mobile = m[0].toLowerCase(); // Nokia N-series, Android, webOS, ex: NokiaN95
                }

                if((m = ua.match(/PhantomJS\/([^\s]*)/)) && m[1]){
                    UA.phantomjs = numberify(m[1]);
                }
            }
            // NOT WebKit
            else {
                // Presto
                // ref: http://www.useragentstring.com/pages/useragentstring.php
                if((m = ua.match(/Presto\/([\d.]*)/)) && m[1]){
                    UA[core = 'presto'] = numberify(m[1]);

                    // Opera
                    if((m = ua.match(/Opera\/([\d.]*)/)) && m[1]){
                        UA[shell = 'opera'] = numberify(m[1]); // Opera detected, look for revision

                        if((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]){
                            UA[shell] = numberify(m[1]);
                        }

                        // Opera Mini
                        if((m = ua.match(/Opera Mini[^;]*/)) && m){
                            UA.mobile = m[0].toLowerCase(); // ex: Opera Mini/2.0.4509/1316
                        }
                        // Opera Mobile
                        // ex: Opera/9.80 (Windows NT 6.1; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00
                        // issue: 由于 Opera Mobile 有 Version/ 字段，可能会与 Opera 混淆，同时对于 Opera Mobile 的版本号也比较混乱
                        else if((m = ua.match(/Opera Mobi[^;]*/)) && m){
                            UA.mobile = m[0];
                        }
                    }

                    // NOT WebKit or Presto
                } else {
                    // MSIE
                    // 由于最开始已经使用了 IE 条件注释判断，因此落到这里的唯一可能性只有 IE10+
                    // and analysis tools in nodejs
                    if((ieVersion = getIEVersion(ua))){
                        UA[shell = 'ie'] = ieVersion;
                        setTridentVersion(ua, UA);
                        // NOT WebKit, Presto or IE
                    } else {
                        // Gecko
                        if((m = ua.match(/Gecko/))){
                            UA[core = 'gecko'] = 0.1; // Gecko detected, look for revision
                            if((m = ua.match(/rv:([\d.]*)/)) && m[1]){
                                UA[core] = numberify(m[1]);
                                if(/Mobile|Tablet/.test(ua)){
                                    UA.mobile = 'firefox';
                                }
                            }
                            // Firefox
                            if((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]){
                                UA[shell = 'firefox'] = numberify(m[1]);
                            }
                        }
                    }
                }
            }
        }

        if(!os){
            if((/windows|win32/i).test(ua)){
                os = 'windows';
            } else if((/macintosh|mac_powerpc/i).test(ua)){
                os = 'macintosh';
            } else if((/linux/i).test(ua)){
                os = 'linux';
            } else if((/rhino/i).test(ua)){
                os = 'rhino';
            }
        }

        UA.os = os;
        UA.core = UA.core || core;
        UA.shell = shell;
        UA.ieMode = UA.ie && doc.documentMode || UA.ie;

        return UA;
    }

    var UA = B.UA = getDescriptorFromUserAgent(ua);

    // nodejs
    if(typeof process === 'object'){
        var versions, nodeVersion;

        if((versions = process.versions) && (nodeVersion = versions.node)){
            UA.os = process.platform;
            UA.nodejs = numberify(nodeVersion);
        }
    }

    // use by analysis tools in nodejs
    UA.getDescriptorFromUserAgent = getDescriptorFromUserAgent;

    //设置html的Css
//    var browsers = [
//            // browser core type
//            'webkit',
//            'trident',
//            'gecko',
//            'presto',
//            // browser type
//            'chrome',
//            'safari',
//            'firefox',
//            'ie',
//            'opera'
//        ],
//        documentElement = doc && doc.documentElement,
//        className = '';
//    if (documentElement) {
//        B.each(browsers, function (key) {
//            var v = UA[key];
//            if (v) {
//                className += ' ks-' + key + (parseInt(v) + '');
//                className += ' ks-' + key;
//            }
//        });
//        if (B.trim(className)) {
//            documentElement.className = B.trim(documentElement.className + className);
//        }
//    }
})(B);

