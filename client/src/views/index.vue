<template>
    <div class="index">
        <Header></Header>
        <SideBar></SideBar>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import SideBar from "../components/SideBar";

    export default {
        name: "index",
        components: {
            Header,
            SideBar
        }
    };
</script>
<style scoped lang="stylus">
    .index
        width 100%
        height 100%
        overflow hidden
        .rightContainer
            position: relative
            top 0
            left 180px
            width calc(100% - 180px)
            height calc(100% - 64px)
            overflow auto
</style>

