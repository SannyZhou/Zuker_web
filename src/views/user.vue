<style>
    .sidebar {
        height: 100%;
    }
</style>

<template>
    <el-container>
    <el-aside>
        <el-menu class="sidebar" router=true :default-active="$route.path">
            <el-menu-item index="/my/posts">
                我的发布
            </el-menu-item>
            <el-menu-item index="/my/messages">
                私信
            </el-menu-item>
            <el-menu-item index="/my/setting">
                个人信息
            </el-menu-item>
            <el-menu-item index="/my/collections">
                我的收藏
            </el-menu-item>
        </el-menu>
    </el-aside>
    <router-view></router-view>
    </el-container>
</template>

<script>
export default {
    data () {
            return this.$store.getters.profile
    },
    methods: {

    }
}
</script>
