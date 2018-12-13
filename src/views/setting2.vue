<template>
<el-main>
	<div class="profile">
		<div class="profile-header">
			<div class="info">
				<div class="more" @click="more">
					<button class="button-more">
						<i class="icon-more10"></i>
					</button>
				</div>
				<div class="avatar">
					<img :src="data.avatar" height="72" width="72">
				</div>	
				<div class="text">
					<h2 class="name">{{data.nickname}}</h2>
					<h2 class="gender" :class="{'female':!data.gender>0}">{{data.gender?'♂':'♀'}}</h2>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
    <div class="row-profile">
			<div class="profile-sidebar">
				<div class="profile-usertitle">
                                        <div id="userphoto"><img id="profilepic" src="data.userimg"  height="150" width="150">
										<img onclick="uploadProfilePicture();" id="camera" style="cursor:pointer" src="../common/assets/qq-icon.png" alt="edit image" height="150" width="150"/></div>
                                        <form action="profile-madeline.html" method="post" id="profileform" enctype="multipart/form-data"><input name="photo" type="file" id="photo" style="display: none;" /></form>
										<div id="profile-name" class="profile-usertitle-name">madeline</div>
					<div class="profile-usertitle-job"> Madeline Huang</div>
				</div>
				
			</div>
            <div class="profile-content">
            <div id="about" class="city">
            <div class="title"><img src="../common/assets/qq-icon.png"> About</div>
            <div class="profile-userbuttons">
			<button id="editpage" onclick = editPage(); class="btn btn-message btn-profile">EDIT</button>
                </div></br>
            <hr style="margin-top:-10px">
            <p class="info">
            <label class="col-about"> <b>Name: </b> </label> Madeline Huang</br>
            <label class="col-about"> <b>Favorite Category:</b> </label> <span name="favtag" id="favtag" style="display:inline-block;">None</span> 
            <p class="info"><label class="col-about"> <b>Bio:</b> </label> <span name="bio" id="bio" style="width: 60%; display:inline-block;">This user hasn't made a bio yet!
           </span> </p></br>
            
            <label class="col-about"> <b>User Stats:</b> </label> <br/>
            <p class="smallinfo">
            <label class="smallabout">Articles Written:</label>10<br/>
            <label class="smallabout">Articles Favorited:</label>10<br/>
            <label class="smallabout">Comments Posted:</label>10<br/>
            <label class="smallabout">Articles Rated:</label>10<br/>
            </p>
            </div>
            <!-- END OF ABOUT-->
            
            <!-- COMMENTS SECTION-->
            <div id="comment" class="city" style="display:none">
            <div class="title"><img src="../common/assets/talk.png"> Comments</br></div> 
            madeline<br/> </h1> 
<div class="commentBox">
					<form class="insertCommentForm"> 
					<textarea style="padding:10px" id="insertComment" class="insertComment" placeholder="Leave a comment..." ></textarea>
					<button type="button" onclick="commentOnPage()" class="insertCommentButton" id="insertCommentButton">Post</button>
					</form>
					<br/> 
					<div class="commentInside">
                                                <img onclick="location.href=''"; style="cursor: pointer;display:inline;position:relative; float:left;top:3px;" id="profilepic" src="images/jayleen.jpg" alt="default avatar" height="45" width="45">
						<div style="padding:3px;margin-left:50px;"><span onMouseOver="this.style.color='#779aff'" onMouseOut="this.style.color='#315cd8'" class="commenterName" id="commenterName" style="cursor: pointer" onclick="location.href=''";>
                                                jayleen</span>
						<span class="commenterTime" id="commenterTime">1/1/11 at 1:11pm</span>
						<div class="commentLine">wow what a comment</div></div>
						
						<img onclick="location.href='profile-madeline.html'"; style="cursor: pointer;display:inline;position:relative; float:left;top:3px;" id="profilepic" src="images/madeline.jpg" alt="default avatar" height="45" width="45">
						<div style="padding:3px;margin-left:50px;"><span onMouseOver="this.style.color='#779aff'" onMouseOut="this.style.color='#315cd8'" class="commenterName" id="commenterName" style="cursor: pointer" onclick="location.href='profile-madeline.html'";>
                                                madeline</span>
						<span class="commenterTime" id="commenterTime">2/2/22 at 2:22am</span>
						<span> <img style="cursor: pointer; float:right;" title="Delete comment" onclick="deleteComment(''. $commentArray[$x*4+3]. '');" src="images/delete.png" height="15" width="15"></span><div class="commentLine">yes what a comment</div></div>
						</div>
				</div>
            </div> 
	    </div>
	    </div>
	    </div>
</el-main>
</template>

<script>
export default {
	data(){
		return {
			flag: false
		}
	},
	components: {
	},
	computed: {
		data () {
			return this.$store.getters.profile
		}
	},
	methods: {
		enterPosted () {
			this.$router.push({path: '/posted'})
		},
		enterCommented () {
			this.$router.push({path: '/commented'})
		},
		enterLiked () {
			this.$router.push({path: '/liked'})
		},
		enterNotice () {
			this.$router.push({path: '/notice'})
		},
		more () {
			this.$refs.sheet.show()
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
	position absolute
	top 0
	bottom 50px
	width 100%
	background #fff
	.profile-header
		padding  16px 20px 0 20px
		background #fff
		.more
			display block
			.button-more
				float right
				outline none
				border none
				background #fff
				color rgba(0, 0, 0, 0.8)
				font-size 22px
		.info
			.avatar
				margin-left 36px
				text-align center
				img
					border-radius 50%
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
