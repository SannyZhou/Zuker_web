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
				<div class="account"><h2>账号：</h2><input type="text" v-model="account" placeholder="输入账号..." style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;"></input></div>
				<div class="password"><h2>密码：</h2><input type="password" v-model="password" placeholder="输入密码..."style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;"></input></div>
				<button :class="{'active': account.length !== 0}" @click="login">登录</button>
			</div>
			<div class="cancel"><img src='../common/assets/cross_icon.png' class="icon-cross" @click="cancel"></i></div>
		</div>
		<div v-if="show2" class="message" style="text-align: center; font-size: 20px; color: #ED4956">
			需要申请第三方API，暂时无法完成
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			show: false,
			show2: false,
			account: '',
			password: ''
		}
	},
	components: {

	},
	created () {
		this.$store.dispatch('initProfile')
	},
	methods: {
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
			if (this.account == '' || this.password == ''){
				this.$message({
		          message: '账号不能为空！',
		          type: 'warning'
		        });
		        return;
			}
			this.$store.dispatch('login',{
				loginuser: this.account,
				password: this.password
			})
            /*this.$axios.post('/auth/login', {
            	account: this.account, 
            	password: this.password
            }).then(function(res){
            	if (res.data.id == '0'){
            		this.$message.error('账号或密码错误！');
            	}
            	else{
	            	this.$notify({
	            		title: '欢迎使用Zuker!',
	            		type: 'success',
	            		message: 'Hi, ' + this.account + '!',
	            		duration: 5000
	            	});
	            }
        	}).bind(this)
            .catch(function(err) {
                console.log(err.response)
            })*/
			this.account = ''
			this.password = ''
		},
		accountLogin () {
			this.show = true
		}
	},
	activated () {
		this.show2 = false
		this.show = false
		this.$store.commit('UPDATE_LOGIN_LOADING', false)
	},
	computed: {
		data () {
			return this.$store.getters.profileLists
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
				width 55%
				padding 10px 0
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
				width 30%
				height 40px
				background #26A2FF
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
