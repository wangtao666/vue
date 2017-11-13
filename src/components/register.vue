<template>
	<div id="el_regiseter">
		<nav>
			<span>
				<router-link to="/login"><img src="../assets/left.png"></router-link>
				<span>手机验证</span>
			</span>
		</nav>
		<div class="el_inputs2">
			<div>
				<input type="text" v-model="type1" ref="type1" v-on:input="inputchangge" placeholder="手机号/用户名" data-start="false"/>
				<img src="../assets/x.png" v-show="yes" v-on:click="removeall"/>
			</div>
			<div class="el_yzm1">
				<div id="v_container" style="width: 168px;height: 80px;float: right;"></div>
				<input type="text" id="code_input" v-model="type3" ref="type3"  v-on:input="inputchangge" placeholder="请输入验证码"/>
				<img v-show="no2" v-on:click="removeall3" src="../assets/x.png"/>
			</div>
			<div class="el_yzm2">
				<div>
					<input type="text" v-model="type2" ref="type2" v-on:input="inputchangge" placeholder="验证码"/>
					<img v-show="no" v-on:click="removeall2" src="../assets/x.png"/>
				</div>
				<div v-if="!unbind" @click = 'showTime' class="el_first" ref="item1">获取验证码</div>
				<div v-else class="el_agin">{{times}}s</div>
			</div>
		</div>
		<!--<router-link to="/login/register/Reset" class="el_next">下一步</router-link>-->
		<div id="my_button" class="el_next" v-on:click="el_next">下一步</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				type1:'',
				type2:'',
				type3:'',
				yes:false,
				no:false,
				no2:false,
				unbind : false,
				times:''
			}
		},
		mounted(){
			var _this = this
				function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
					this.options = { //默认options参数值
						id: "", //容器Id
						canvasId: "verifyCanvas", //canvas的ID
						width: "100", //默认canvas宽度
						height: "30", //默认canvas高度
						type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
						code: ""
					}
					
					if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
						for(var i in options) { //根据传入的参数，修改默认参数值
							this.options[i] = options[i];
						}
					}else{
						this.options.id = options;
					}
					
					this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
					this.options.letterArr = getAllLetter();
			
					this._init();
					this.refresh();
				}
			
				GVerify.prototype = {
					/**版本号**/
					version: '1.0.0',
					
					/**初始化方法**/
					_init: function() {
						var con = document.getElementById(this.options.id);
						var canvas = document.createElement("canvas");
						this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
						this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
						canvas.id = this.options.canvasId;
						canvas.width = this.options.width;
						canvas.height = this.options.height;
						canvas.style.cursor = "pointer";
						canvas.innerHTML = "您的浏览器版本不支持canvas";
						con.appendChild(canvas);
						var parent = this;
						canvas.onclick = function(){
							parent.refresh();
						}
					},
					
					/**生成验证码**/
					refresh: function() {
						this.options.code = "";
						var canvas = document.getElementById(this.options.canvasId);
						if(canvas.getContext) {
							var ctx = canvas.getContext('2d');
						}else{
							return;
						}
						
						ctx.textBaseline = "middle";
			
						ctx.fillStyle = randomColor(180, 240);
						ctx.fillRect(0, 0, this.options.width, this.options.height);
			
						if(this.options.type == "blend") { //判断验证码类型
							var txtArr = this.options.numArr.concat(this.options.letterArr);
						} else if(this.options.type == "number") {
							var txtArr = this.options.numArr;
						} else {
							var txtArr = this.options.letterArr;
						}
			
						for(var i = 1; i <= 4; i++) {
							var txt = txtArr[randomNum(0, txtArr.length)];
							this.options.code += txt;
							ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
							ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色		
							ctx.shadowOffsetX = randomNum(-3, 3);
							ctx.shadowOffsetY = randomNum(-3, 3);
							ctx.shadowBlur = randomNum(-3, 3);
							ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
							var x = this.options.width / 5 * i;
							var y = this.options.height / 2;
							var deg = randomNum(-30, 30);
							/**设置旋转角度和坐标原点**/
							ctx.translate(x, y);
							ctx.rotate(deg * Math.PI / 180);
							ctx.fillText(txt, 0, 0);
							/**恢复旋转角度和坐标原点**/
							ctx.rotate(-deg * Math.PI / 180);
							ctx.translate(-x, -y);
						}
						/**绘制干扰线**/
						for(var i = 0; i < 4; i++) {
							ctx.strokeStyle = randomColor(40, 180);
							ctx.beginPath();
							ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
							ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
							ctx.stroke();
						}
						/**绘制干扰点**/
						for(var i = 0; i < this.options.width/4; i++) {
							ctx.fillStyle = randomColor(0, 255);
							ctx.beginPath();
							ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
							ctx.fill();
						}
					},
					
					/**验证验证码**/
					validate: function(code){
						var code = code.toLowerCase();
						var v_code = this.options.code.toLowerCase();
						if(code == v_code){
							return true;
						}else{
							this.refresh();
							return false;
						}
					}
				}
				/**生成字母数组**/
				function getAllLetter() {
					var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
					return letterStr.split(",");
				}
				/**生成一个随机数**/
				function randomNum(min, max) {
					return Math.floor(Math.random() * (max - min) + min);
				}
				/**生成一个随机色**/
				function randomColor(min, max) {
					var r = randomNum(min, max);
					var g = randomNum(min, max);
					var b = randomNum(min, max);
					return "rgb(" + r + "," + g + "," + b + ")";
				}
//				window.GVerify = GVerify;
				var verifyCode = new GVerify("v_container");
				document.getElementById("my_button").onclick = function(){
					var res = verifyCode.validate(document.getElementById("code_input").value);
					if(res){
						$(_this.$refs.type1).attr('data-start','true');
						console.log("验证正确");
					}else{
						$(_this.$refs.type1).attr('data-start','false');
						console.log("验证码错误");
					}
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
				//第三个表格值改变后的事件
				if(this.type2 == ''){
					this.no = false;
				}else{
					this.no = true;
				}
				//第二个表格值改变后的事件
				if(this.type3 == ''){
					this.no2 = false;
				}else{
					this.no2 = true;
				}
			},
			//第一个表格x点击事件
			removeall:function(e){
				this.type1 = '';
				this.yes = false;
				$(e.target).parent().find('input').focus()
			//要想获得元素还是得用this.$refs.(ref绑定的值)
			},
			//第三个表格x点击事件
			removeall2:function(e){
				this.type2 = '';
				this.no = false;
				$(e.target).parent().find('input').focus()
			},
			//第二个表格x点击事件
			removeall3:function(e){
				this.type3 = '';
				this.no2 = false;
				$(e.target).parent().find('input').focus()
			},
			//发送短信验证码倒计时点击事件
			showTime:function(e){
				var s = this.times = 10//倒计时时间
				var flage = true//默认状态，无需修改
				var $this = this//绑定this指向
				//因为点击后el_first会关闭，el_agin会打开，中间会有过度，如果直接查找el_agin是找不到的
				setTimeout(function(){
					$('.el_agin').text(s+'s');
				},5)
				var timeId = setInterval(function(){
					--s
					$('.el_agin').text(s + 's');
					if(s < 0){
						clearInterval(timeId)
						//在click事件处理过程中，过程都是有过度时间的，所以立马查找元素是找不到，需要延迟
						setTimeout(function(){
							$('.el_first').text('重新获取');
						},5)
						$($this).css({'background':'orangered','color':'#fff'})
						flage = false;
						//点击事件生效
						$this.unbind = false;
					}
				},1000)
				if(flage){
					$($this).css({'background':'#f2f2f2','color':'#000'})
					//点击事件失效
					$this.unbind = true;
				}
			},
			//下一步点击事件
			el_next:function(){
				var user = $(this.$refs.type1).val()
				this.$http.get('http://192.168.79.12:8888/read10?user='+user).then(res=>{
					var data = res.body;
					var _this = this;
					var ids = data[0]._id;
					var users = data[0].user;
					//储存id 和 用户名  为下一步做准备
					sessionStorage.setItem('users',users);
					sessionStorage.setItem('ids',ids);
//					console.log('用户名验证:',data)
					if(data !== '1'){
						setTimeout(function(){
//							console.log('验证码验证:',$(_this.$refs.type1).attr('data-start'))
							if($(_this.$refs.type1).attr('data-start')=='true'){
								location.href = '#/login/register/Reset';
							}else{
								alert('验证码错误！');
							}
						},5)
					}else{
						alert('手机号不正确!');
					}
				},res=>{
					alert('链接服务器失败！');
				})
			}
		},
	}
</script>

<style>
	html{
		/*background: #f2f2f2;*/
	}
	#el_regiseter>nav{
		width: 750px;
		box-sizing: border-box;
	}
	#el_regiseter>nav>span{
		display: inline-block;
		width: 750px;
		height: 80px;
		margin: 0 auto;
		line-height: 80px;
		background: #00916c;
		text-align: center;
		font-size: 32px;
		color: #fff;
		position: relative;
	}
	#el_regiseter>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	#code_input{
		width: 400px;
		margin-left: -2px;
	}
	.el_yzm1>img{
	    right: 216px!important;
	}
	.el_inputs2>div{
		width: 600px;
		margin-left: 75px;
		position: relative;
	}
	.el_inputs2>div>img{
		position: absolute;
		right: 15px;
		top: 24px;
	}
	.el_inputs2 input{
		width: 600px;
		height: 80px;
		font-size: 32px;
		outline: none;
		border: none;
		background: #fff;
		display: block;
		margin: 40px auto;
		border: 1px solid #00916c;
		padding-left: 20px;
		box-sizing: border-box;
	}
	.el_yzm2{
		width: 600px;
		height: 80px;
		font-size: 32px;
		outline: none;
		border: none;
		/*background: #f2f2f2;*/
		margin-left: 40px;
		margin-top: 20px;
		display: block;
		margin: 20px auto;
		position: relative;
	}
	.el_yzm2>div:first-child{
		width: 400px;
		position: relative;
	}
	.el_yzm2>div:first-child>img{
		position: absolute;
		right: 15px;
		top: 24px;
	}
	.el_yzm2>div>input{
		width: 400px;
		height: 80px;
		font-size: 32px;
		outline: none;
		border: none;
		background: #fff;
		border: 1px solid #00916c;
		padding-left: 20px;
		box-sizing: border-box;
	}
	.el_yzm2>div.el_first{
		width: 150px;
		height: 80px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		background: orangered;
		color: #fff;
		padding: 0 10px;
		position: absolute;
		right: 0;
		top: 0;
	}
	.el_yzm2>div.el_agin{
		width: 150px;
		height: 80px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		background: #f2f2f2;
		color: #000;
		padding: 0 10px;
		position: absolute;
		right: 0;
		top: 0;
	}
	.el_next{
		width: 600px;
		height: 80px;
		font-size: 28px;
		text-align: center;
		line-height: 80px;
		background: #00916c;
		color: #fff;
		display: block;
		margin: 40px auto;
		border-radius: 8px;
	}
</style>