<template>
<el-main class="profile">
	<el-card :body-style="{ padding: '0px'}" class="profile-header">
		<button class="user-pic">
				<img class='userpic' src='../common/assets/logo.png' style="cursor:pointer">
		</button>
		<div style="padding: 14px;">
		<span><el-row class="info" type='flex' justify="center">
			<el-col class="more">
				<label for="username">原始密码</label>
				<div class="moreeditinfo">
				<input type='password' class="moreinfo" name="inputorgin" id="inputorgin" v-model="pwdForm.origin_pwd">
				</div>
				<label for="email">新密码</label>
				<div class="moreeditinfo">
				<input type='password' class="moreinfo" name="inputnew" id="inputnew" v-model="pwdForm.new_pwd">
				</div>
                <label for="email">重复新密码</label>
				<div class="moreeditinfo">
				<input type='password' class="moreinfo" name="inputrenew" id="inputrenew" v-model="pwdForm.re_new_pwd">
				</div>
			</el-col>
		</el-row></span>
		</div>
		<div class="edit-info">
		<el-button  class="button" @click="updatepwd"><img src="../common/assets/edit.png" class="edit-info"></el-button>
		</div>
	</el-card>
</el-main>
</template>

<script>
export default {
	data(){
		return {
			pwdForm:{origin_pwd:'', new_pwd:'', re_new_pwd:''}
		}
	},
	components: {
	},
	methods:{
		updatepwd (){
			if (this.pwdForm.origin_pwd === '' || this.pwdForm.new_pwd === '' || this.pwdForm.re_new_pwd === ''){
				this.$message({
		          message: '内容不能为空！',
		          type: 'warning'
				});
		        return;
			}
			if (this.pwdForm.new_pwd !== this.pwdForm.re_new_pwd){
				this.$message({
		          message: '重复输入新密码不一致!',
		          type: 'error'
				});
		        return;
			}
			this.$store.dispatch('updatepwd', this.pwdForm);
			setTimeout(() => {
				console.log(this.$store.state.msgtype,  this.$store.state.msgcontent);
				let type = this.$store.state.msgtype;
				let msg = this.$store.state.msgcontent;
				if (msg !== ""){
					var param = {'type': type, 'message': msg};
					console.log('message param:', param);
					this.$message(param);
				}
				if (this.$store.state.msgtype === 'success'){
					this.$store.dispatch('logout');
				}
			}, 500)
		},
	},
	computed: {
		// data () {
		// 	return this.$store.getters.profile
		// }
	},
	created () {
		// this.$store.dispatch('initProfile');
		// this.pwdForm.username = this.$store.state.profile.username;
		// this.pwdForm.email = this.$store.state.profile.email;
	},
	activated () {
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

.profile
	overflow hidden
	top 0px
	bottom 50px
	width 100%
	background #fff
	text-align center
	margin-top 0%
	.profile-header
		text-align center
		margin-left 10%
		float left
		width 80%
		height 90%
		.user-pic
			background-color Transparent
			border-style none
			position relative
			margin auto
			height 200px
			display block
			.userpic
				display block
				background #fff
				opacity 1
		.info
			margin-top 20px
			display block
			text-align center
			.more
				font-size 120%
				.moreinfo
					font-size 100%
				.moreeditinfo
					font-size 100%
					white-space pre-line
		.edit-info
			background #fff
			height 20px
			width 50%
			margin-top 20px
			opacity 1
			text-align center
			margin auto
	
</style>
