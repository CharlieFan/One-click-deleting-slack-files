<template>
<div id="app" class="main">
    <h1 class="heading-one">Bulk delete slack files</h1>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style media="screen">
body{
    background: #c5c5c5;
}
</style>

<style lang="scss" scoped>
.main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    max-width: 100%;
    position: relative;
    h1,
    h2 {
        font-weight: normal;
    }
    .heading-one {
        margin: 0;
    }
}
</style>
