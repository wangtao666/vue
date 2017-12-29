<template>
	<div id="el_login">
		<img src="../assets/timg.png"/>
		<div class="el_user1">
			<div class="el_username">
				<img src="../assets/people.png"/>
				<span>账号</span>
				<div class="">
					<!--注意，要获得值需要这样做！！！！-->
					<input type="text" name="el_username" v-model="type1" ref="type1" v-on:input="inputchangge" placeholder="Quanyou8888wt" class="el_username1"/>
					<img v-show="yes" v-on:click="removeall" src="../assets/x.png"/>
				</div>
			</div>
			<div class="el_bank2"></div>
			<div class="el_password">
				<img src="../assets/lock.png"/>
				<span>密码</span>
				<div class="">
					<input type="password" class="el_password1" v-model="type2" ref="type2" v-on:input="inputchangge"/>
					<img v-show="no" src="../assets/x.png" v-on:click="removeall2" style="right: 46px;"/>
					<img v-show="eye" src="../assets/eye.png" v-on:click="openEye"/>
					<img v-show="open_eye"  src="../assets/open_eye.png" v-on:click="CloseEye"/>
				</div>
			</div>
			<div class="el_btns1">
				<router-link to="/login/register" class="el_forget">忘记密码？</router-link>
				<!--<router-link to="/login/index1" class="el_logins" v-on:click="toLogin">登录</router-link>-->
				<div class="el_logins" v-on:click="toLogin">登录</div>
				<!--跳转链接需要加上协议前缀,否则跳转无效-->
				<!--<a href="https://www.baidu.com" class="el_logins">百度</a>-->
			</div>
			<p>全友家居&copy;2017 <span>www.quanyou.com.cn</span></p>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Bus from '@/assets/js/bus.js'
  import Util from '../util/util'
	export default{
		data(){
			return{
				type1:'',
				type2:'',
				yes:false,
				no:false,
				eye:true,
				open_eye:false,
			}
		},
		methods:{
			//表格值改变后的事件
			inputchangge:function(val,oldval){
				//获得表单的值，直接用this.(v-model绑定的值),这里是type1，所以
				if(this.type1 == ''){
					this.yes = false;
				}else{
					this.yes = true;
				}
				//第二个表格值改变后的事件
				if(this.type2 == ''){
					this.no = false;
				}else{
					this.no = true;
				}
			},
			//第一个表格x点击事件
			removeall:function(e){
				this.type1 = '';
				this.yes = false;
				$(e.target).parent().find('input').focus()
			//要想获得元素还是得用this.$refs.(ref绑定的值)
			},
			//第二个表格x点击事件
			removeall2:function(e){
				this.type2 = '';
				this.no = false;
				$(e.target).parent().find('input').focus()
			},
			openEye:function(e){
				this.eye = false;
				this.open_eye = true;
				$('.el_password1').prop('type','text');
				$(e.target).parent().find('input').focus()
			},
			CloseEye:function(e){
				this.eye = true;
				this.open_eye = false;
				$('.el_password1').prop('type','password');
				$(e.target).parent().find('input').focus()
			},
			toLogin:function(e){
//				var id = '59b7a4a355464ef104d52c68'
				var user = $('input[name=el_username]').val()
				var passwords = $('.el_password1').val()
				this.$http.get('http://192.168.79.12:8888/read10?user='+user).then(response => {
				  var $this = this;
					//请求到的数据
				    var data2 = response.body;
				    var houtai_user = data2[0].user;
				    var houtai_password = data2[0].password;
				    var ids = response.body[0]._id;
				    var users = response.body[0].user;
					var phones = response.body[0].phone;
					var oldpass = response.body[0].password;
					//存临时数据
					sessionStorage.setItem('users',users);
					sessionStorage.setItem('phones',phones);
					sessionStorage.setItem('ids',ids);
					sessionStorage.setItem('oldpass',oldpass);
				    if(user===houtai_user&&passwords===houtai_password){
              this.setCookie("user","wangtao2",1);
              console.log('cookie:',this.getCookie("user"));
//              location.href='#/login/index1';
                //如果用this.$router.push来跳转路由，记得查看this指向，不然抠破头你也找不到问题所在！！！！！
                $this.$router.push({path:'/login/index1'})
				    }else{
				    	alert('用户名或者密码错误！')
				    }
				  }, response => {
					    // error callback
				    alert('连接失败！')
				  });
			}
		},
		mounted(){
////			动态挂载一个新的元素，该元素可以挂载指令并且生效！
//			var MyComponent = Vue.extend({
//				template:'<div v-show="true" @click="asd" style="position: absolute;top: 10px;height: 100px;width: 750px;background: red;">Hello!</div>',
//				//如果该元素上还要挂载事件，那么事件定义在这里面
//				methods:{
//					asd:function(){
//						alert(1)
//					}
//				}
//			});
//			//学习文档地址：https://cn.vuejs.org/v2/api/#vm-mount
//			var component = new MyComponent().$mount();
//			//如果挂载到app上，那么每个页面都会有，可以用来做导航页签,这里可以添加到指定的元素里  component.$el代表动态添加的元素
//			document.getElementById('el_login').appendChild(component.$el);
		}
	}

</script>

<style>
	#el_login{
		width: 100%;
		height: 1300px;
		box-sizing: border-box;
		padding-top: 100px;
	}
	#el_login>img{
		width: 300px;
		height: 500px;
		margin-left: 225px;
	}
	.el_bank2{
		width: 700px;
		height: 2px;
		background: #e7e7e7;
		margin: 0 auto;
	}
	.el_user1{
		width: 750px;
		box-sizing: border-box;
	    height: 226px;
		padding-top: 20px;
		margin-top: 20px;
		background: #fff;
	}
	.el_user1>.el_username{
		width: 710px;
		height: 80px;
		font-size: 32px;
		margin-bottom: 10px;
		margin-left: 20px;
		/*border: 1px solid #00916c;*/
		padding-left: 20px;
		box-sizing: border-box;
	    /*box-shadow: 3px 4px 6px 1px #00916c;*/
	    line-height: 80px;
	    position: relative;
	}
	.el_username>img{
		width: 32px;
		height: 32px;
		vertical-align: middle;
		padding: 4px;
    	border-radius: 10px;
		background: #b412b4;
	}
	.el_username>div{
	    width: 600px;
	    margin-left: -20px;
	    position: absolute;
	    top: 0;
	    left: 100px;
	}
	.el_username>div>img{
	    position: absolute;
	    right: 0;
	    top: 24px;
	}
	.el_username input,.el_password input{
		width: 520px;
		height: 60px;
		font-size: 32px;
		outline: none;
		border: none;
		background: #fff;
		margin-left: 70px;
	}
	.el_user1>.el_password{
		width: 710px;
		height: 80px;
		float: left;
		font-size: 32px;
		margin-left: 20px;
		margin-top: 10px;
		/*border: 1px solid #00916c;*/
		padding-left: 20px;
		box-sizing: border-box;
	    /*box-shadow: 3px 4px 6px 1px #00916c;*/
	    line-height: 80px;
	    position: relative;
	}
	.el_password>img{
		width: 32px;
		height: 32px;
		vertical-align: middle;
		padding: 4px;
    	border-radius: 10px;
		background: #5353db;
	}
	.el_password>div{
	    width: 600px;
	    position: absolute;
	    top: 0;
	    left: 80px;
	}
	.el_password>div>img{
		position: absolute;
		right: 0;
		top: 24px;
	}
	.el_forget{
		display: block;
		float: right;
		margin-right: 20px;
		margin-top: 40px;
		font-size: 28px;
		color: #6a6ac2;
	    position: absolute;
	    top: -52px;
	    right: 0;
	}
	.el_logins{
		display: block;
		width: 650px;
		height: 80px;
		border-radius: 8px;
		background: #00916c;
		color: #fff;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
	    position: absolute;
	    top: 60px;
	    left: 50px;
	}
	.el_user1>p{
	position: absolute;
	width: 600px;
	bottom: 50px;
	width: 600px;
	text-align: center;
	left: 75px;
	}
	.el_btns1{
		height: 200px;
		position: relative;
		top: 140px;
	}
</style>
