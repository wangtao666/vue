<template>
	<div id="el_index1">
		<router-link to='/login/index1/SerchPage' class="el_serch">
			<div>
				<img src="../assets/search.png"/>
				<input type="text" value="搜索排工单" readonly="readonly"/>
			</div>
		</router-link>
		<div class="el_nav">
			<ul>
				<li style="margin: 0;" v-on:click="locationto1">
					<p>
						<img src="../assets/paper.png"/>
						<i>{{Pending}}</i>
					</p>
					<span>待处理</span>
				</li>
				<li v-on:click="locationto2">
					<p>
						<img src="../assets/money.png"/>
						<i>5</i>
					</p>
					<span>待收尾款</span>
				</li>
				<li v-on:click="locationto3">
					<p>
						<img src="../assets/task.png"/>
					</p>
					<span>历史任务</span>
				</li>
				<li v-on:click="locationto4">
					<p>
						<img src="../assets/self_center.png"/>
					</p>
					<span>个人中心</span>
				</li>
			</ul>
		</div>
		<div class="el_all">
			<div class="el_title">
				<img src="../assets/time.png"/>
				<span>待处理排工单</span>
			</div>
			<!--循环元素的另一种写法-->
			<!--<span v-for="i in 10" :class="[i +'']">{{i}}</span>-->
			<!--<router-link to="/login/index1/SerchPage/allotList/userinfor" v-on:click="fasong" class="el_users" v-for='(item,index) in people' :key="item.id">-->
			<div v-on:click="fasong(item)" class="el_users" v-for='(item,index) in people' :key="item.id">
				<div class="el_inform">
					<span>{{ item.numbers }}</span>
					<span>{{ item.name }}</span>
				</div>
				<div class="el_userinform">
					<p>
						<img src="../assets/pepole.png"/>
						<span>{{ item.user }}</span>
						<span>{{ item.phone }}</span>
					</p>
					<p>
						<img src="../assets/Location.png"/>
						<span>{{ item.address }}</span>
					</p>
				</div>
				<div class="el_bank"></div>
			</div>
			<!--<div class="el_footer"></div>-->
		</div>
	</div>
</template>

<script>
//	import PeopleData from './datas.json'
	export default {
		name:'el_index1',
		data() {
			return {
				people : "",
				Pending: "",
//				msg2 : {},
//				msg2 : "",
			}
		},
		created(){
//			var that = this;
//			console.log('1最初的值:',this.msg2)
//			this.$root.Bus.$on('setMsg',(res) =>{
//				that.msg2 = res;
//				console.log('that.msg2:',that.msg2)
//			})
//			console.log('3最后的值：',this.msg2)
//			this.$root.Bus.$on("setMsg",(res) => {
//				that.msg2 = res;
//				console.log('3最后的值：',that.msg2);
//			})
		},

		methods:{
			locationto1 : function(){
				location.href = '#/login/index1/SerchPage/allotList'
			},
			locationto2 : function(){
				location.href = '#/login/index1/SerchPage/allotList/userinfor/retainage/retainageList'
			},
			locationto3 : function(){
				location.href = '#/login/index1/History'
			},
			locationto4 : function(){
				location.href = '#/login/index1/center'
			},
			fasong:function(obj){
				console.log(obj.user)
				var xd_user = sessionStorage.setItem('xd_user',obj.user)
				location.href="#/login/index1/SerchPage/allotList/userinfor"
			}
		},
		mounted(){
			this.$http.get('http://192.168.79.12:8888/read').then(response => {
				//请求到的数据
			    var data2 = response.body;
			    //绑定this
			    var _this = this;
			    //定义一个新值的库
			    var pepoleArray = [];
			    //总的数据量
			    this.Pending = data2.length;
			    $.each(data2, function(index,item) {
			    	//如果此值为undefinded  或者 是字符串的undefined 那么过滤掉
					if(item.numbers !== 'undefined' && item.numbers !== undefined && item.user !== undefined){
						pepoleArray.push(this);
					}
//					console.log(pepoleArray)
					//把过滤掉的值赋给people,实现渲染
					_this.people = pepoleArray
			    });
			  }, response => {
			    // error callback
		    alert('连接失败！')
		  });
		}
	}
</script>

<style>
	#el_index1{
		height: 0px;
	}
	.el_users{
		display: block;
		color: #000000;
	}
	.el_serch{
		display: block;
		width: 750px;
		height: 120px;
		box-sizing: border-box;
		background: #00916c;
		padding-top: 30px;
		padding-left: 50px;
	}
	.el_serch>div{
		width: 650px;
		height: 60px;
		border-radius: 8px;
		background: #fff;
		box-sizing: border-box;
		position: relative;
		background: #008761;
	}
	.el_serch>div>img{
		width: 20px;
		height: 20px;
		vertical-align: middle;
		position: absolute;
		left: 240px;
		top: 22px;
	}
	.el_serch>div>input{
		width: 300px;
		height: 40px;
	    margin-left: 280px;
  		margin-top: 8px;
  		border: none;
  		outline: none;
  		color: #fff;
  		font-size: 28px;
  		background: #008761;
	}
	.el_nav{
		font-size: 28px;
		border-bottom: 1px solid #e7e7e7;
	}
	.el_nav>ul{
	    width: 704px;
	    height: 180px;
	    margin: 40px 0 20px 30px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    padding-left: 10px;
	}
	.el_nav>ul>li{
		float: left;
		list-style: none;
		margin-left: 80px;
	}
	.el_nav>ul>li>p{
		width: 100px;
		position: relative;
	}
	.el_nav>ul>li>p>img{
		width: 70px;
	    height: 70px;
	    padding: 20px;
	    background: #53c9eb;
	    border-radius: 20px;
	}
	.el_nav>ul>li:nth-child(1)>span{
		margin-left: 6px;
	}
	.el_nav>ul>li>p>i{
		display: block;
	    width: 50px;
	    height: 50px;
	    border-radius: 25px;
	    background: rgba(123, 202, 73, 0.79);
	    color: yellow;
	    text-align: center;
	    line-height: 50px;
	    position: absolute;
	    top: -20px;
	    right: -30px;
	    font-size: 18px;
	}
	.el_nav>ul>li>span{
		margin-left: -4px;
		width: 112px;
	}
	.el_title{
		width: 100%;
		height: 80px;
		font-size: 28px;
		border-bottom: 1px solid #e7e7e7;
		line-height: 80px;
		padding-left: 20px;
	}
	.el_title>img{
		width: 24px;
		height: 24px;
		vertical-align: middle;
	}
	.el_inform{
		height: 80px;
		border-bottom: 1px solid #e7e7e7;
		font-size: 28px;
		line-height: 80px;
	}
	.el_inform>span:nth-child(1){
		color: red;
		margin-left: 20px;
	}
	.el_inform>span:nth-child(2){
		float: right;
		margin-right: 40px;
	}
	.el_userinform{
		height: 160px;
		border-bottom: 1px solid #e7e7e7;
		box-sizing: border-box;
	}
	.el_userinform>p{
		font-size: 28px;
		margin-left: 20px;
		margin-top: 60px;
		display: block;
	}
	.el_userinform>p:nth-child(1)>span:nth-child(3){
		margin-left: 40px;
	}
	.el_userinform>p>img{
	    width: 40px;
	    height: 40px;
	    vertical-align: middle;
	}
	.el_bank{
		width: 100%;
		height: 20px;
		background: #f2f2f2;
	}
	.el_all{
		height: 900px;
		overflow-y: auto;
	    overflow-x: hidden;
	}
	.el_footer{
		height: 100px;
		background: #f2f2f2;
	}
</style>
