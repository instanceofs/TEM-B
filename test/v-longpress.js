import Vue from "vue";
// 长按事件
Vue.directive('longpress', function (el, binding){
  var timer = null;
  var start = function (e) {
    // 如果是点击事件，不启动计时器，直接返回
    if (e.type === 'click'){
      return
    }
    if (timer == null){
      // 创建定时器 ( 2s之后执行长按功能函数 )
      timer = setTimeout(function () {
        //执行长按功能函数
        binding.value()
      },10000)
    }
  }
  var cancel = function () {
    if (timer !== null){
      clearTimeout(timer)
      timer = null
    }
  }

  // 添加事件监听器
  el.addEventListener("mousedown", start);
  el.addEventListener('touchstart', start)
  // 取消计时器
  el.addEventListener("click", cancel);
  el.addEventListener("mouseout", cancel);
  el.addEventListener('touchend', cancel)
  el.addEventListener('touchcancel', cancel)
})

// <button  v-longpress="daqvConsole">该按钮具有长按功能哦！！！</button>
// methods:{
// 调试模式
// daqvConsole(){
//   this.B.daqsoft.vConsole();
// }

// },
