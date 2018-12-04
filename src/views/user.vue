<style>

</style>

<template>
    <el-aside>
        <el-menu router=true :default-active="$route.path">
            <el-menu-item index="/my/posts">
                posts
            </el-menu-item>
            <el-menu-item index="/my/messages">
                message
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    methods: {

    }
}
</script>
