import B from "./B.seed";
/**
 * Date Model
 */
(function (B){
    var AP = Date.prototype;
    AP.addDays = AP.addDays || function (days){
        this.setDate(this.getDate() + days);
        return this;
    };
    AP.addWeeks = AP.addWeeks || function (weeks){
        this.addDays(weeks * 7);
        return this;
    };
    AP.addMonths = AP.addMonths || function (months){
        var d = this.getDate();
        this.setMonth(this.getMonth() + months);
        if(this.getDate() < d)
            this.setDate(0);
        return this;
    };
    AP.addYears = AP.addYears || function (year){
        var m = this.getMonth();
        this.setFullYear(this.getFullYear() + year);
        if(m < this.getMonth()){
            this.setDate(0);
        }
        return this;
    };
    var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var weeksEn = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    var APS = ["上午", "下午", '晚上'];
    AP.format = AP.format || function (strFormat){
        if(strFormat === 'soon' || strFormat === 'week'){
            var left = this.left();
            if(left.dd < 5){
                var str = '';
                var dd = B.now().getDate() - this.getDate();
                if(left.dd == 0 && dd != 0){
                    left.status = dd < 0;
                    left.dd = 1;
                }
                if(left.dd > 0){
                    if(left.dd == 1)
                        return (left.status ? "明天" : "昨天") + this.format(' hh:mm');
                    if(strFormat == 'week'){
                        return weeks[this.getDay()];
                    } else {
                        str = left.dd + '天';
                    }
                } else if(left.hh > 0){
                    str = left.hh + '小时';
                } else if(left.mm > 0){
                    str = left.mm + '分钟';
                } else if(left.ss > 10){
                    str = left.ss + '秒';
                } else {
                    return '刚刚';
                }
                return str + (left.status ? '后' : '前');
            }
            strFormat = 'yyyy-MM-dd';
        }
        if(strFormat === "date")
            return this;
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if(/(y+)/.test(strFormat))
            strFormat = strFormat.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if(new RegExp("(" + k + ")").test(strFormat)){
                strFormat =
                    strFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                        (o[k]) :
                        (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return strFormat;
    };


    AP.left = function (){
        var arr = {status: true};
        var nDifference = this - (new Date());
        if(nDifference < 0){
            arr.status = false;
            nDifference = Math.abs(nDifference);
        }
        console.log(nDifference);
        var iDays = nDifference / (1000 * 60 * 60 * 24);
        arr.dd = iDays > 1 ? parseInt(iDays) : 0;
        var temp = iDays - arr.dd;
        var hh = temp * 24;
        arr.hh = hh > 1 ? parseInt(hh) : 0;
        temp = temp * 24 - arr.hh;
        hh = temp * 60;
        arr.mm = hh > 1 ? parseInt(hh) : 0;
        temp = temp * 60 - arr.mm;
        hh = temp * 60;
        arr.ss = hh > 1 ? parseInt(hh) : 0;
        temp = temp * 60 - arr.ss;
        hh = temp * 1000;
        arr.ms = hh > 1 ? parseInt(hh) : 0;
        return arr;
    };
    B._mix(B, {
        /**
         * 获取当前星期日期
         * @param date
         * @param isChEn
         * @returns {string}
         */
        getweek: function (date, isChEn){
            return (isChEn === 'en' ? weeksEn : weeks)[new Date(date).getDay()]
//      return weeks[new Date(date).getDay()];
        },
        /**
         * 当前时间戳
         */
        nowTick: Date.now || function (){
            return +new Date();
            //  当前时间戳
            //  参入参数 ios.replace(/-/g, '/') 处理
            //
        },
        /**
         * 现在的时
         * @returns {Date}
         */
        now: function (){
            return new Date(B.nowTick());
        },
        /**
         * 添加天数
         * @param date
         * @param days
         * @returns {*}
         */
        addDays: function (date, days){
            if(!B.isDate(date)) return B.now();
            days = (B.isNumber(days) ? days : 0);
            return new Date(date.addDays(days));
        },
        /**
         * 添加年
         * @param date
         * @param days
         * @returns {*}
         */
        addYear: function (date, year){
            if(!B.isDate(date)) return B.now();
            year = (B.isNumber(year) ? year : 0);
            return new Date(date.addYears(year));
        },
        /**
         * 格式化时间
         * @param date
         * @param strFormat
         * @param sms  默认秒
         * @returns {*}
         */
        formatDate: function (date, strFormat, sms){
            strFormat = strFormat || "yyyy-MM-dd"; //yyyy.MM.dd hh:mm:ss q   月(M)、日(d)、小时(h)、分(m) 、秒(s)、  毫秒(S) 季度(q)
            if(date instanceof Date){
                // ms 毫秒
                date *= 1;
                sms == 's' && (date *= 1000);
                if(B.isString(date)) return date;
                return (new Date(date)).format(strFormat);
            } else {
                let newdate = '';
                switch (date.split('-').length) {
                    case 1:
                        newdate = date + '-01-01'
                        break;
                    case 2:
                        newdate = date + '-01'
                        break;
                    case 3:
                        newdate = date
                        break;
                    default :
                }
                return (new Date(newdate.replace(/-/g, '/'))).format(strFormat);
            }

        },
        /**
         * 计算剩余时间
         * @param date
         * @returns {*}
         */
        leftTime: function (date){
            return date.left();
        },
        /**
         * 上午|下午|晚上
         * @param date
         * @returns {string}
         */
        amorpm: function (date){
            if(B.isUndefined(date)){
                date = B.now()
            }
            let hour = date instanceof Date ? new Date(date).getHours() : new Date(date.replace(/-/g, "/")).getHours();
            return APS[12 > hour ? 0 : 17 > hour ? 1 : 24 > hour ? 2 : 2];
        }
    });
})(B);


