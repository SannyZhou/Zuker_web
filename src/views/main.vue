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
        text-algin: right;
    }
</style>


<template>
    <el-container style="height: 100%;">
        <el-header type="flex" justify="space-around" style="background-color: #545c64">
            <el-row>
                <el-col span="12">
                    <router-link to="/">
                    <img class="logo-img" src='../assets/logo.png'>
                    <span class="logo-text">Zuker</span>
                    </router-link>
                </el-col>
                <el-col offset="9" span="3">
                    <el-menu style="text-align: right" mode="horizontal" router=true :default-active="$route.path.split('/')[1]" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"  v-if="isLogin">
                        <el-menu-item index="my">
                            <i class="el-icon-star-on"></i>
                            个人中心
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
            isLogin: this.$store.state.isLogin
        }
    },
    methods: {

    }
}
</script>
