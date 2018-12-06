<template>
    <el-main class="profile">
    <el-container class="profile-header">
	    <el-row class="info">
				<el-col class="more">
					<button class="user-pic"  @mouseover="edituserpic" @mouseout="canceleditpic">
						<img v-if="showeditpic" class='button-edit' src='../common/assets/camera.png' style="cursor:pointer" >
						<img class='userpic' src='../common/assets/logo.png'>
					</button>
				</el-col>
		</el-row>
	</el-container>
    </el-main>
</template>

<script>
export default {
	data(){
		return {
			flag: false,
			userpic: '../common/assets/logo.png',
			showeditpic: false
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
	},
	computed: {
		data () {
			return this.$store.getters.profile
		}
	},
	created () {
		if (this.$store.getters.profile.profId === undefined || this.$store.getters.profile.profId === 0) {
			this.$store.dispatch('initProfile')
		}
		this.flag = true
	},
	activated () {
		if (!this.flag && (this.$store.getters.profile.profId === 0 || this.$store.getters.profile.profId === undefined)) {
			this.$router.replace({name: 'login'})
		}
		this.flag = false
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.profile
	color #26A2FF
	overflow hidden
	top 0px
	bottom 50px
	width 100%
	background #fff
	.profile-header
		.more
			margin auto
			display block
		    background #fff
		    .user-pic
		    	display block
		    	margin auto
		    	poistion relative
		    	.userpic
		    		display block
		    		background #fff
		    		border-radius 50%
		    	.button-edit
		    		poistion absolute
		    		top 0px
		    		left 0px
		    		display block
		    		background #fff
				    box-shadow 0 1px 3px rgba(0,0,0,0.4)
				    border-radius 50%
				    height 10px
				    width 10px
				    opacity 0
		.info
			.text
				margin-top 4px
				font-size 18px
				color rgba(0, 0, 0, 0.8)
				text-align center
				.name, .gender
					padding 5px 0
					display inline-block
				.gender
					color #26A2FF
					padding-left 0
					&.female
						color #FF83FA
				.name
					text-align center
					padding-right 0
	.profile-record
		padding-top 10px
		display flex
		background #fff
		.record1, .record2, .record3, .record4
			flex 1
			font-size 15px
			color #999
			text-align center
			h2
				margin-top 4px
				color rgba(0, 0, 0, 0.8)
				font-size 24px
		.record1, .record2, .record3
			border-right 1px solid #D4D4D4
	.notice
		padding-top 10px
		display block
		text-align center
		font-size 15px
		color #fff
		background  #fff
		.main
			background rgba(0, 0, 0, 0.4)
			margin 0 auto
			width 130px
			padding 8px 0px 5px 8px
			border-radius 6px
			font-size 0
			.icon-speaker85
				display inline-block
				font-size 18px
				line-height 15px
				margin-right 3px
				vertical-align top
			h2
				font-size 15px
				line-height 13px
				display inline-block
				letter-spacing 1.2px
				vertical-align top
			.icon-keyboard_arrow_right
				font-size 21px
				line-height 14px
				vertical-align top
	.title-bar
		margin-top 18px
		background #F5F5F5	
		color #949494
		padding 10px
	.section
		display flex
		flex-wrap wrap
		a
			flex 0 0 33.333%
			.item
				border-right 1px solid #D4D4D4
				border-bottom 1px solid #D4D4D4
				text-align center
				padding 16px 0
				.icon
					margin-bottom 4px
</style>
