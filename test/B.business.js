import B from "./B.seed";
/** 业务公用函数
 * business
 * @author BAI
 */
(function (B){
    B._mix(B, {
      /**
       *
       * @param level 等级
       * @return 志愿者等级
       * @param str
       * @returns {string}
       * 等级规则：
       * 1、志愿者累计服务100小时：☆
       * 2、志愿者累计服务300小时：☆☆
       * 3、志愿者累计服务600小时：☆☆☆
       * 4、志愿者累计服务1000小时：☆☆☆☆
       * 5、志愿者累计服务1500小时：☆☆☆☆☆
       */
       dqStarRating:function (level,str){
         if(0!==level)return["一","二","三","四","五","六","七","八","九","十"][level-1]+(str||'星志愿者');
       },
      /**
       * 非常舒适 0 - .3
       * 舒适 .3 - .5
       * 一般 .5 - .6
       * 拥挤 .6 - .8
       * 非常拥挤 > .8
       */
      /**
       *
       * @param ratio 0-1 舒适度
       * @param type spot 景点  hotel 酒店 food 美食
       * @returns {*}
       */
      dqTravelComfort:function (ratio,type){
        // var   ratio=item.ratio.comfortableness
      //   var   realNum=item.ratio.realNum
      //   var   maxNum=item.ratio.maxNum
      // var  ratio=(realNum*1000)/(maxNum*1000)
        var color={
          // 景点
          spot: {
            非常舒适: { color: '#36cd64' },
            舒适: { color: '#8bcd36' },
            一般: { color: '#ff9e05' },
            拥挤: { color: '#ff4e4e' },
            非常拥挤: { color: '#d70c70' }
          },
          // 酒店
          hote: {
            客房充足: { color: '#36cd64' },
            客房紧张: { color: '#ff9e05' },
            客房爆满: { color: '#ff4e4e' }
          },
          // 美食
          food: {
            空位充足: { color: '#36cd64' },
            空位紧张: { color: '#ff9e05' },
            需等位: { color: '#ff4e4e' },
            人气爆棚: { color: '#d70c70' }
          }
        };
        var text, currentColor;
        switch (type) {
          // 景点 参数
          case "spot":
            return (text = "一般", currentColor = "#ff9e05", .3 >= ratio && (text = "非常舒适"),
            ratio > .3 && .5 > ratio && (text = "舒适"),
            ratio >= .6 && .8 > ratio && (text = "拥挤"),
            ratio >= .8 && (text = "非常拥挤"), {
              text:text,
              color:color[type][text].color,
              ratio:ratio
            });
          case "hotelColor":
            break;
          case "foodColor":
        }

      },
      videoNoDownload: function (text) {
        let str = JSON.parse(JSON.stringify(text))
        let index = str.indexOf('><\/video>'); // 获取第一个数字出现的下标
        str = str.slice(0, index) + ' controlslist="nodownload noremoteplayback"' + str.slice(index)
        return str
      }
    });
})(B);

