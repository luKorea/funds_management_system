<template>
    <div class="register">
        <section class="form_container">
            <el-form :model="registerUser"
                     :rules="rules" class="registerForm"
                     ref="registerForm" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="registerUser.identity" placeholder="请选择身份">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="员工" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            let validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                registerUser: {
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
                    identity: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '用户名不能为空',
                            trigger: 'blur'
                        },
                        {
                            min: 2, max: 30,
                            message: '输入的长度不能小于2',
                            trigger: 'blur'
                        }
                    ],
                    email: [{
                        type: 'email',
                        required: true,
                        message: '邮箱格式有误',
                        trigger: 'blur'
                    }],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 30, message: '长度在6-30之间', trigger: 'blur'}],
                    password2: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 30, message: '长度在6-30之间', trigger: 'blur'},
                        {validator: validatePass2, trigger: "blur"}]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /* 发送axios请求 */
                        this.$axios.post('/api/users/register',this.registerUser)
                            .then(response=>{
                                //  注册成功
                                 this.$message({
                                     message: '账号注册成功',
                                     type: 'success'
                                 })
                            });
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .register
        position relative
        width 100%
        height 100%
        overflow hidden
        background-color aliceblue
       /* background url(../assets/bg2.jpg) no-repeat center center
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
            .registerForm
                margin-top 20px
                background-color #fff
                padding 20px 40px 20px 20px
                border-radius 5px
                box-shadow 0px 5px 10px #cccc
            .submit_btn
                width 100%
</style>