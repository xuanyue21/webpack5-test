<template>
    <div class="container">
        <h1>我是app</h1>
        <div><router-link to="/home">home</router-link></div>
         <div> <router-link to="/about">about</router-link></div>
        <router-view></router-view>
    </div>
</template>

<script>
export default{
    name: 'App',
}
</script>
<style scoped>
</style>