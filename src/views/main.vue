<style>
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
</style>


<template>
    <div>
        <el-header type="flex" justify="space-around" style="background-color: #545c64">
            <el-row>
                <el-col span="12">
                    <router-link to="/">
                    <img class="logo-img" src='../assets/logo.png'>
                    <span class="logo-text">Zuker</span>
                    </router-link>
                </el-col>
                <el-col offset="9" span="3">
                    <el-menu style="text-align: right" mode="horizontal" router=true :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="/my">
                            <i class="el-icon-star-on"></i>
                            个人中心
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {

    }
}
</script>
