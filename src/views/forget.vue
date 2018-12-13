<template>
<div>
	<div class="forget">
		<div class="tip">
			<router-link to="/">
	            <img class="logo-img" src='../assets/logo.png'>
	            <span class="logo-text">Zuker</span>
	        </router-link>
        </div>
        <div class="methods">
        	<div class='accountforget'>
			  	<div class="email"><h2>*Email: </h2><input type="text" v-model="forgetForm.email" placeholder="输入邮箱..." style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;" ></div>
			    <div class="account"><h2>* 用户名: </h2><input type="text" v-model="forgetForm.username" placeholder="输入用户名..." style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;" required></div>
			    <div class="password"><h2>* 密码: </h2><input type="text" v-model="forgetForm.password" placeholder="输入密码..." style="font-weight: color: #EEE; text-align:left; padding: 10px; font-size: 16px;" required></div>
			    <div style="text-align: center; font-size: 20px; color: #ED4956"> *标签为必填项</div>
		    	<button :class="{'active': forgetForm.username.length !== 0}" @click="forget">重设密码</button>
		    </div>
		</div>
		<div class='tologin'>
		    	<router-link to='/login'>
		    		<div style="text-align: center; font-size: 15px; color: #BBB">直接登录，请点击此处。</div>
		    	</router-link>|<router-link to='/register'> <div style="text-align: center; font-size: 15px; color: #BBB">注册新用户</div></router-link>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			user_id: 0,
			forgetForm: {username: '', password: '', email: ''},
			isLogin: false
		}
	},
	components: {
	},
	created () {
	},
	methods: {
		close (){
			this.forgetForm.username = '';
			this.forgetForm.password = '';
			this.forgetForm.email = '';
		},
		forget () {
			if (this.forgetForm.email == '' || this.forgetForm.username == '' || this.forgetForm.password == ''){
				this.$message({
		          message: '必要信息不能为空！',
		          type: 'warning'
		        });
		        return;
			}
			this.$store.dispatch('forget', this.forgetForm);
            /*this.$axios.post('/auth/forget', {
            	account: this.account, 
            	password: this.password,
            	email: this.email
            }).then(function(res){
            	if (res.data.ifforget == '1'){
            		this.$message.error('账号已被注册！');
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
			this.forgetForm.username = null;
			this.forgetForm.password = null;
			this.forgetForm.email = null;
		},
	},
	activated () {
		this.$message({
			message: "欢迎注册Zuker！"
		});
	},
	computed: {
		data () {
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/styl" scoped>
.forget
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
	.tologin
		margin-top 20px
	.methods
		height 100%
		text-align center
		margin-top 30px
		display flex
		flex-direction column
		justify-content center
		align-items center
		.accountforget
			text-align center
			display flex
			flex-direction column
			justify-content center
			align-items center
			vertical-align middle
			width 45%
			.email, .account, .password
				text-align center
				display flex
				width 100%
				padding 10px 0
				h2
					flex 0 0 100px
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
