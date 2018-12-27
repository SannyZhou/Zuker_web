// 缺修改密码
<template>
<el-main class="profile">
	<el-card :body-style="{ padding: '0px'}" class="profile-header">
		<button class="user-pic"  @mouseover="edituserpic" @mouseout="canceleditpic" @click="edituserpic">
				<img class='userpic' src='../common/assets/logo.png' style="cursor:pointer">
				<img v-if="showeditpic" class='button-edit' src='../common/assets/camera.png' style="cursor:pointer" >
		</button>
		<div style="padding: 14px;">
		<span><el-row class="info" type='flex' justify="center">
			<el-col class="more" v-if="showeditprofile">
				<label for="username">账户</label>
				<div class="moreeditinfo">
				<input class="moreinfo" type="text" name="inputusername" id="inputusername" v-model="profileForm.username">
				</div>
				<label for="email">邮箱</label>
				<div class="moreeditinfo">
				<input class="moreinfo" type="text" name="inputemail" id="inputemail" v-model="profileForm.email">
				</div>
			</el-col>
			<el-col class="more" v-else>
				<label for="username">账户</label>
				<div class="moreinfo">
					{{profileForm.username}}
				</div>
				<label for="email">邮箱</label>
				<div class="moreinfo">
					{{profileForm.email}}
				</div>
			</el-col>
		</el-row></span>
		<div class="editinfo">
		<el-button type="text" class="button" @click="toeditprofile"><img src="../common/assets/edit.png" class="edit-info"></el-button>
		</div>
		</div>
	</el-card>
</el-main>
</template>

<script>
export default {
	data(){
		return {
			userpic: '../common/assets/logo.png',
			showeditpic: false,
			showeditprofile:false,
			profileForm:{username:'', email:''}
		}
	},
	components: {
	},
	methods:{
		edituserpic (){
			this.showeditpic = true
		},
		canceleditpic (){
			this.showeditpic = false
		},
		toeditprofile (){
			if (this.showeditprofile === false){
				this.showeditprofile = true
			}
			else{
				this.editprofile();
			}
		},
		editprofile (){
			if (this.profileForm.username === '' || this.profileForm.email === ''){
				this.$message({
		          message: '修改信息不能为空！',
		          type: 'warning'
		        });
		        return;
			}
			var reg = RegExp(/[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+/)
			if (!this.profileForm.email.match(reg)){
				this.$message({
		          message: '邮箱地址格式不正确！',
		          type: 'warning'
		        });
		        return;
			}
			this.$store.dispatch('updateinfo', this.profileForm);
			setTimeout(() => {
				console.log(this.$store.state.msgtype,  this.$store.state.msgcontent);
				let type = this.$store.state.msgtype;
				let msg = this.$store.state.msgcontent;
				let msgcontenttype = this.$store.state.msgcontenttype;
				if (msg !== "" && msgcontenttype === 'updateinfo'){
					var param = {'type': type, 'message': msg};
					console.log('message param:', param);
					this.$message(param);
				}else{
					this.$message({
						message: '加载失败！',
						type: 'error'
					});
					this.showeditprofile = false;
					return;
				}
				console.log(this.$store.state.profile);
				this.profileForm.username = this.$store.state.profile.username;
				this.profileForm.email = this.$store.state.profile.email;
				this.showeditprofile = false;
			}, 500)
		},
		// updatePwd (){
		// 	if (this.profileForm.username === '' || this.profileForm.email === ''){
		// 		this.$message({
		//           message: '修改信息不能为空！',
		//           type: 'warning'
		//         });
		//         return;
		// 	}
		// 	this.$store.dispatch('editprof', profileForm);
		// 	setTimeout(() => {
		// 		console.log(this.$store.state.msgtype,  this.$store.state.msgcontent);
		// 		let type = this.$store.state.msgtype;
		// 		let msg = this.$store.state.msgcontent;
		// 		if (msg !== ""){
		// 			var param = {'type': type, 'message': msg};
		// 			console.log('message param:', param);
		// 			this.$message(param);
		// 		}
		// 		if (this.$store.msgtype === 'success'){
		// 			this.profileForm = this.$store.state.profile;
		// 			this.showeditprofile = false;
		// 		}
		// 	}, 500)
		// },
		edituserpic (){
			// if (this.profileForm.username === '' || this.profileForm.email === ''){
			// 	this.$message({
		    //       message: '修改信息不能为空！',
		    //       type: 'warning'
		    //     });
		    //     return;
			// }
			// this.$store.dispatch('editprof', loginForm);
		}
	},
	computed: {
		// data () {
		// 	return this.$store.getters.profile
		// }
	},
	created () {
		this.$store.dispatch('initProfile');
		setTimeout(()=>{
			this.profileForm.username = this.$store.state.profile.username;
			this.profileForm.email = this.$store.state.profile.email;
		}, 500)
	},
	activated () {
		this.$store.dispatch('initProfile');
		setTimeout(()=>{
			this.profileForm.username = this.$store.state.profile.username;
			this.profileForm.email = this.$store.state.profile.email;
		}, 300)
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
			.button-edit
				margin-right -200px
				margin-top -200px
				opacity 0.8
			
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
			width 20px
			margin-left 200px
			margin-top 20px
	
</style>
