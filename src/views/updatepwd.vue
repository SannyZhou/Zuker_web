<template>
<el-main class="profile">
	<el-card :body-style="{ padding: '0px'}" class="profile-header">
		<!-- <button class="user-pic">
				<img class='userpic' src='../common/assets/logo.png' style="cursor:pointer">
		</button> -->
		<div style="padding: 3px;">
		<span><el-row class="info" type='flex' justify="center">
			<el-col class="more">
				<div class="moreeditinfo">
				<label class='editlabel' for="inputorgin">&nbsp;原始密码&nbsp;&nbsp;</label>
				<input type='password' class="moreinfo" name="inputorgin" id="inputorigin" v-model="pwdForm.origin_pwd">
				<img id='pwdimgorigin' src='../common/assets/hide2.png' @click="hidepwdorigin" style="cursor:pointer;position:absolute;margin-right:0px;margin-top: 3%;z-index:5;background-repeat:no-repeat;backgroud-position:0px 0px;width:25px;height:20px;">
				</div>
				<div class="moreeditinfo">
				<label class='editlabel' for="inputnew">&nbsp;&nbsp;&nbsp;新密码&nbsp;&nbsp;&nbsp;</label>
				<input type='password' class="moreinfo" name="inputnew" id="inputnew" v-model="pwdForm.new_pwd">
				<img id='pwdimgnew' src='../common/assets/hide2.png' @click="hidepwdnew" style="cursor:pointer;position:absolute;margin-right:0px;margin-top: 3%;z-index:5;background-repeat:no-repeat;backgroud-position:0px 0px;width:25px;height:20px;">
				</div>
				<div class="moreeditinfo">
                <label class='editlabel' for="inputrenew">重复新密码</label>
				<input type='password' class="moreinfo" name="inputrenew" id="inputrenew" v-model="pwdForm.re_new_pwd">
				<img id='pwdimgrenew' src='../common/assets/hide2.png' @click="hidepwdrenew" style="cursor:pointer;position:absolute;margin-right:0px;margin-top: 3%;z-index:5;background-repeat:no-repeat;backgroud-position:0px 0px;width:25px;height:20px;">
				</div>
			</el-col>
		</el-row></span>
		</div>
		<div>
		<!-- <el-button  class="button" @click="updatepwd"><img src="../common/assets/edit.png" class="edit-info"></el-button> -->
		<el-button  class="button" @click="updatepwd">修改密码</el-button>
		</div>
	</el-card>
</el-main>
</template>

<script>
export default {
	data(){
		return {
			pwdForm:{origin_pwd:'', new_pwd:'', re_new_pwd:''},
			newisLogin: this.$store.state.isLogin
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
			if (this.pwdForm.new_pwd.length < 6){
				this.$message({
		          message: '密码不可以少于6位！',
		          type: 'warning'
		        });
		        return;
			}
			this.$store.dispatch('updatepwd', this.pwdForm);
			setTimeout(() => {
				console.log(this.$store.state.msgtype,  this.$store.state.msgcontent);
				let type = this.$store.state.msgtype;
				let msg = this.$store.state.msgcontent;
				let msgcontenttype = this.$store.state.msgcontenttype;
				if (msg !== "" && msgcontenttype === 'updatepwd'){
					var param = {'type': type, 'message': msg};
					console.log('message param:', param);
					this.$message(param);
				}else{
					this.$message({
						message: '加载失败！',
						type: 'error'
					});
					return;
				}
				if (type === 'success'){
					this.$store.dispatch('logout');
				}
			}, 300);
			setTimeout(()=>{
				this.newisLogin = this.$store.state.isLogin;
			}, 800)
			setTimeout(()=>{
				if (!this.newisLogin){
					this.$router.replace('/login');
				}
			}, 1200)
		},
		hidepwdorigin(){
			var inputpwd = document.getElementById("inputorigin");
			var pwdimg = document.getElementById("pwdimgorigin");
			inputpwd.type = (inputpwd.type === 'password')?'text':'password';
			pwdimg.src = (inputpwd.type === 'text')?'../src/common/assets/hide.png':'../src/common/assets/hide2.png';
		},
		hidepwdnew(){
			var inputpwd = document.getElementById("inputnew");
			var pwdimg = document.getElementById("pwdimgnew");
			inputpwd.type = (inputpwd.type === 'password')?'text':'password';
			pwdimg.src = (inputpwd.type === 'text')?'../src/common/assets/hide.png':'../src/common/assets/hide2.png';
		},
		hidepwdrenew(){
			var inputpwd = document.getElementById("inputrenew");
			var pwdimg = document.getElementById("pwdimgrenew");
			inputpwd.type = (inputpwd.type === 'password')?'text':'password';
			pwdimg.src = (inputpwd.type === 'text')?'../src/common/assets/hide.png':'../src/common/assets/hide2.png';
		}
	},
	watch:{
		newisLogin(newVal, oldVal){
			this.$emit('update:isLogin', newVal);
		}
	},
	computed: {
		
	},
	created () {
		console.log(this.isLogin)
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
	margin center
	.profile-header
		text-align center
		// margin-left 10%
		float left
		width 50%
		height 50%
		margin center
		.user-pic
			background-color Transparent
			border-style none
			position relative
			margin auto
			height 80%
			display block
			.userpic
				display block
				background #fff
				opacity 1
		.info
			margin-top 20px
			display block
			text-align center
			width 100%
			.more
				font-size 100%
				// position relatixve
				.moreeditinfo
					font-size 100%
					white-space pre-line
					margin-top 5px
					// position relative
					.editlabel
						margin-top 10px
						text-align center
						width 50%
						color #777
					.moreinfo
						margin-top 10px
						font-size 100%
						position relative
		.button
			margin-top 30px
			outline none
			border none
			color #FFF
			padding 4px
			font-size 15px
			border-radius 10px
			width 25%
			height 35px
			background #26A2FF
			// .edit-info
			// 	background #fff
			// 	height 20px
			// 	width 50%
			// 	opacity 1
			// 	text-align center
			// 	margin auto
	
</style>
