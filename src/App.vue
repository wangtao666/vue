<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      no:false,
      no2:false,
      no3:true
    }
  },
  mounted () {
  },
  methods:{

  },
  components:{
  },
	created(){
	},
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
	  '$route' (to, from) {
//	  	console.log('现在路由:',to.path.split('/')[to.path.split('/').length-1],'来自路由:',from.path.split('/')[from.path.split('/').length-1],'现在的动画:',this.transitionName)
	    const toDepth = to.path.split('/').length
	    const fromDepth = from.path.split('/').length
	    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

      //设置cookie
      function setCookie(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +value+ ((expiredays==null) ? "" : ";expires="+exdate)
      }
      //获取cookie
      function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
      }
      //如果在登陆页面，登陆成功设置cookie
      if(to.path.split('/')[to.path.split('/').length-1] === 'login'){

       console.log('cookie:',getCookie("user"));
      //修改密码页面不做限制
      }else if(to.path.split('/')[to.path.split('/').length-1] === 'register'){

      //修改密码页面不做限制
      }else if(to.path.split('/')[to.path.split('/').length-1] === 'Reset'){

      //其余页面如果没有cookie,那么提示并且跳转到登录页面
      }else {
        if(getCookie("user") == ''){
          alert('您还没登陆呢！想忽悠我吗？赶紧登陆~');
          location.href = '#/login';
        }
        console.log('cookie:',getCookie("user"));
      }
	  }
	}
}
</script>

<style>
*{
	margin: 0;
	padding: 0;
}
a{
	text-decoration: none;
}
#nav{
  margin: 80px auto;
}
.child-view {
	position: absolute;
	left: 0;
	top: 0;
  width: 100%;
  height: 100%;
  transition: all .4s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
