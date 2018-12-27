<style scoped>
    .logo-img {
        margin: 2px 10px;
        width: 50px;
        height: 50px;
    }
    .logo-text {
        margin: 5px;
        color: white;
        font-size: x-large;
    }
    .help{
        margin: 5px;
        font-size: 15px;
        color: white;
        text-align: right;
    }
</style>


<template : isLogin.sync='isLogin'>
    <el-container style="height: 100%;">
        <el-header type="flex" justify="space-around" style="background-color: #545c64">
            <el-row>
                <el-col span="3">
                    <router-link to="/">
                    <img class="logo-img" src='../assets/logo.png'>
                    <span class="logo-text">Zuker</span>
                    </router-link>
                </el-col>
                <el-col offset="15" span="5" type='flex'>
                    <el-menu style="text-align: right" mode="horizontal" router=true :default-active="$route.path.split('/')[1]" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" v-if="isLogin">
                        <el-menu-item index="my">
                            <i class="el-icon-star-on"></i>
                            个人中心
                        </el-menu-item>
                        <el-menu-item @click="tologout">
                            退出登录
                        </el-menu-item>
                    </el-menu>
                    <el-menu style="text-align: right" mode="horizontal" router=false background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"  v-else>
                        <el-menu-item route='/login'>
                            登录
                        </el-menu-item>
                    </el-menu>
                    
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <router-view></router-view>
                <el-footer  type="flex" justify="space-around" style="background-color: #545c64; height: 38px;" >
                    <el-row type="flex" justify="end">
                        <el-col span="3px">
                            <router-link to="/about">
                                <span class="help">关于</span>
                            </router-link>
                        </el-col>
                        <el-col span="3px">
                            <router-link to="/contactus">
                                <span class="help">联系我们</span>
                            </router-link>
                        </el-col>
                    </el-row>
                </el-footer>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            isLogin: this.$store.state.isLogin,
        }
    },
    created:function(){
        this.$message({
            message: "欢迎使用Zuker！"
        });
        this.$store.commit(types.LOG_CHECK);
        this.isLogin = this.$store.state.isLogin;
    },
    activated:function(){
        this.$store.commit(types.LOG_CHECK);
        this.isLogin = this.$store.state.isLogin;
    },
    methods: {
        tologout(){
            this.$store.dispatch('logout');
            this.isLogin = false;
            setTimeout(() => {
				let type = this.$store.state.msgtype;
				let msg = this.$store.state.msgcontent;
				let msgcontenttype = this.$store.state.msgcontenttype;
				if (msg !== "" && msgcontenttype === 'logout'){
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
			    this.$router.replace('/'); 
			}, 500)
        },
    }
}
</script>
