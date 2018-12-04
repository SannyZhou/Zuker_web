<style>
    .sidebar {
        min-height: 400px;
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
        </el-menu>
    </el-aside>
    <router-view></router-view>
    </el-container>
</template>

<script>
export default {
    methods: {

    }
}
</script>
