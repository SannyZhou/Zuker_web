<template>
	<div class="login">
		<div class="tip">
			<router-link to="/">
	            <img class="logo-img" src='../assets/logo.png'>
	            <span class="logo-text">Zuker</span>
            </router-link>
        </div>

		<div class="methods">
			<div class="item" @click="loginOther" ref="weixin">
				<img src="../common/assets/wechat-icon.png" width="25" height="25"><h2>使用微信登录</h2>
			</div>
			<div class="item" @click="accountLogin" ref="account">
				<i class="icon-user"  style="font-size: 25px; margin-right: 10px"></i><h2>账号密码登录</h2>
			</div>
		</div>
		<div class="panel" v-if="show">
			<h2 v-if="show" style="text-align: center; padding: 15px; color: #8f8f8f; font-weight: bold; background: #f2f2f2; font-size: 25px">
			输入账号密码登录</h2>
			<div class="accountLogin">
				<div class="account"><h2>账号：</h2><input type="text" v-model="loginForm.username" placeholder="输入账号..." style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;"></div>
				<div class="password"><h2>密码：</h2>
				<input id='inputpwd' onkeypress="if(event.keyCode==13) {btnlogin.click();return false;}" type="password" v-model="loginForm.password" placeholder="输入密码..." style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;">
				<img id='pwdimg' src='../common/assets/hide2.png' @click="hidepwd" style="cursor:pointer;position:absolute;right:5px;margin-top: 4%;z-index:5;background-repeat:no-repeat;backgroud-position:0px 0px;width:25px;height:20px;"></div>
				<button :class="{'active': loginForm.username.length !== 0}" id="btnlogin" @click="login">登录</button>
				<div class='tologin'>
			<router-link to='/register'>创建新账号</router-link> | <router-link to='/forgetpwd'>忘记密码？</router-link>
				</div>
			</div>
			<div class="cancel"><img src='../common/assets/cross_icon.png' class="icon-cross" @click="cancel"></div>
		</div>
		<div v-if="show2" class="message" style="text-align: center; font-size: 20px; color: #ED4956">
			需要申请第三方API，暂时无法完成
		</div>
	</div>
</template>



<script>
import showmsg from './showmsg'

export default {
	data () {
		return {
			show: false,
			show2: false,
			loginForm:{username: '', password: ''},
			user_id: 0,
			isLogin:false,
			showpngurl:'../common/assets/hide2.png'
		}
	},
	components: {

	},
	created: function(){
		if (this.$store.state.isLogin){
			if (this.$route.query.redirect === undefined || this.$route.query.redirect === ''){
				this.$router.replace('/my')
			}else{
				this.$router.replace(this.$route.query.redirect)
			}
		}
	},
	methods: {
		close () {
			this.loginForm.username = '';
			this.loginForm.password = '';
		},
		cancel () {
			this.show = false
		},
		loginOther () {
			this.show = false
			this.show2 = true
			setTimeout(() => {
				this.show2 = false
			}, 1000)
		},
		login () {
			if (this.loginForm.username === '' || this.loginForm.password === ''){
				this.$message({
		          message: '账号不能为空！',
		          type: 'warning'
		        });
		        return;
			}
			this.$store.dispatch('login', this.loginForm);
			setTimeout(() => {
				console.log(this.$store.state.msgtype,  this.$store.state.msgcontent);
				let type = this.$store.state.msgtype;
				let msg = this.$store.state.msgcontent;
				let msgcontenttype = this.$store.state.msgcontenttype;
				if (msg !== "" && msgcontenttype === 'login'){
					var param = {'type': type, 'message': msg};
					console.log('message param:', param);
					this.$notify(param);
				}else{
					this.$message({
						message: '加载失败！',
						type: 'error'
					});
					return;
				}
				if (this.$store.state.isLogin){
					if (this.$route.query.redirect === undefined || this.$route.query.redirect === ''){
						this.$router.replace('/my');
					}else{
						this.$router.replace(this.$route.query.redirect);
					}
				}
			}, 800)
		},
		accountLogin () {
			this.show = true
		},
		hidepwd(){
			var inputpwd = document.getElementById("inputpwd");
			var pwdimg = document.getElementById("pwdimg");
			inputpwd.type = (inputpwd.type === 'password')?'text':'password';
			pwdimg.src = (inputpwd.type === 'text')?'src/common/assets/hide.png':'src/common/assets/hide2.png';
		}
	},
	activated :function() {
		this.show2 = false
		this.show = false
	},
	computed: {
		data () {
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/styl" scoped>
.login
	background #FFF
	.tip{
		height: 80px;
		text-align:center;
		line-height: 80px;
		font-size: 40px;
		font-weight: bold;
		background: #000;
		color: #8f8f8f;
		vertical-align: middle;
		.logo-img {
        	margin: 2px 2px;
        	vertical-align: middle;
        	width: 45px;
        	height: 45px;
    	}
	    .logo-text {
	        margin: 2px;
	        color: white;
	        font-size: x-max;
	        vertical-align: middle;
	    }
	}
	.methods{
		text-align: center;
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.item{
			width: 40%
			margin-top 10px
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px 22px;
			height: 40px;
			border: 2px solid #8f8f8f;
			height: 20px;
			font-size: 14px;
			border-radius: 70px;
			margin-bottom: 25px;
			.img{
				margin-right: 10px;
			}
		}
	}
	.panel
		position fixed
		top 0px
		width 100%
		height 100%
		background #fff
		vertical-align middle
		.content
			display flex
			flex-wrap wrap
			.prof-item
				flex 0 0 20%
				display block
				font-size 14px
				color #000
				padding 6px 0
				.avatar, .name
					display block
					text-align center
		.accountLogin
			text-align center
			display flex
			flex-direction column
			justify-content center
			align-items center
			vertical-align middle
			.account, .password
				display flex
				width 45%
				padding 10px 0
				position relative
				h2
					flex 0 0 60px
					display inline-block
					font-size 20px
					line-height 32px
					color #8f8f8f
				input
					width 100%
					border 1px solid #f2f2f2
					padding 6px
					border-radius 10px
					outline none
			button
				margin-top 25px
				outline none
				border none
				color #FFF
				padding 4px
				font-size 20px
				border-radius 10px
				width 25%
				height 40px
				background #26A2FF
		.tologin
			margin-top 25px
			outline none
			padding 4px
			font-size 15px
			border-radius 10px
			width 50%
			height 40px
			text-align center
		.cancel
			position absolute
			bottom 60px
			width 100%
			display block
			text-align center
			.icon-cross :before{
		   		margin 2px 2px
		        vertical-align middle
		        width 45px
		        height 45px
		    }
	
</style>
