<template>
    <div class="header">
        <el-row>
            <el-col :span="6" class="logo_container">
                <img src="../assets/logo.png" alt="" class="logo">
                <span class="title">资金管理系统</span>
            </el-col>
            <el-col :span="6" class="user">
                <div class="userInfo">
                    <img :src="user.avatar"  class="avatar">
                    <div class="userTitle">
                        <p class="name comeName">欢迎</p>
                        <p class="name avatarName">{{user.name}}</p>
                    </div>
                    <span class='username'>
                        <el-dropdown
                                trigger="click"
                                @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                     </span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            setDialogInfo(cmdInfo) {
                switch (cmdInfo) {
                    case 'info':
                        this.showInfoList();
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },
            showInfoList(){
                this.$router.push('/infoshow')
                },
            logout(){
                this.$confirm('是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 清除token
                    localStorage.removeItem('userToken');
                    // 设置vuex
                    this.$store.dispatch('clearCurrentState');
                    // 跳转到登录页面
                    this.$router.push('/login')
                });
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped lang="stylus">
    .header
        font-size 24px
        line-height 60px
        background-color #324057
        color white
        padding-left 10px
        .logo_container
            line-height 60px
            min-width 400px
            .logo
                height 50px
                width 50px
                margin-right 5px
                vertical-align middle
                display inline-block
            .title
                vertical-align middle
                font-size 22px
                font-family "仿宋"
                letter-spacing 3px
        .user
            line-height 60px
            text-align right
            float right
            padding-right 10px
            .avatar
                width 40px
                height 40px
                border-radius 50%
                vertical-align middle
                display inline-block
            .userTitle
                display inline-block
                width auto
                vertical-align: middle
                padding 0 5px
                .name
                    line-height 20px
                    text-align center
                    font-size 14px
                .comeName
                    font-size 12px
                .avatarName
                    color black
            .username
                cursor pointer
                margin-right 5px
            .el-dropdown
                color #fff
</style>