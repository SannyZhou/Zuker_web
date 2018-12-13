<style>
</style>

<template>
    <div>
        <el-button @click="startHacking">Start</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        startHacking () {
            this.$notify({
                title: 'It works!',
                type: 'success',
                message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                duration: 5000
            })
            this.$axios.get("/api/test").then(function(res) {
                console.log(res.data)
            }).catch(function(err) {
                console.log(err.response)
            })
        }
    },
    data:{
        // id: true
    }
}
</script>
