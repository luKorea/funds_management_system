<template>
    <div class="login">
            <section class="form_container">
                <el-form :model="loginUser"
                         :rules="rules" class="loginForm"
                         ref="loginForm" label-width="80px">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                    </div>
                </el-form>
            </section>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode';
    export default {
        name: "Login",
        data() {
            return {
                loginUser:{
                    name: '',
                    email: ''
                },
                /* 检测规则 */
                rules: {
                    email: [{
                        type: 'email',
                        required: true,
                        message: '邮箱格式有误',
                        trigger: 'blur'
                    }],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 30, message: '长度在6-30之间', trigger: 'blur'}],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /* 发送axios请求 */
                        this.$axios.post('/api/users/login',this.loginUser)
                            .then(response=>{
                                // 获取token 并将其存储到localStorge
                                const { token } = response.data;
                                // 设置token
                                localStorage.setItem('userToken',token);
                                // 解析token
                                const decode = jwt_decode(token);
                                // 将token存储到vuex中
                                this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
                                this.$store.dispatch('setUser',decode);
                                this.$router.push('/index');
                            });
                    }
                })
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>

<style scoped lang="stylus">
    .login
        position relative
        width 100%
        height 100%
        overflow hidden
        background-color aliceblue
      /*  background url(../assets/bg2.jpg) no-repeat center center
        background-size 100% 100%*/
        .form_container
            width 400px
            height 250px
            position absolute
            top 20%
            left 40%
            padding 20px
            border-radius 5px
            text-align center
            .loginForm
                margin-top 20px
                background-color #fff
                padding 20px 40px 20px 20px
                border-radius 5px
                box-shadow 0px 5px 10px #cccc
            .submit_btn
                width 100%
            .tiparea
                text-align right
                font-size 12px
                color #333
                p
                 a
                     color: #409eff;

</style>