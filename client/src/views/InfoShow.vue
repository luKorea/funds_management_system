<template>
    <div class="infoShow">
        <el-row type="flex" class="row_bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <img :src="user.avatar" alt="" class="avatar">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userInfo">
                    <div class="user-item">
                        <i class="fa fa-user"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="fa fa-cog"></i>
                        <span>{{user.identity === 'boss'? '老板' :'员工'}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Infoshow",
        computed: {
            user() {
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped lang="stylus">
    .infoShow
        width 100%
        height 100%
        box-sizing border-box
        .row_bg
            width 100%
            height 100%
            .user
                text-align center
                position relative
                top 30%
                img
                    width 150px
                    border-radius 50%
                span
                    display block
                    text-align center
                    margin-top 20px
                    font-size 20px
                    font-weight bold
            .userInfo
                height 100%
                background-color #eee
                .user-item
                    position relative
                    top 30%
                    padding 26px
                    font-size 28px
                    color #333
</style>