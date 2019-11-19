/*注册登录接口*/
const express = require('express');
const router = express.Router();
/* 引入登录注册模型 */
const User = require('../../module/User');
/* 引入加密库 */
const bcrypt = require('bcrypt');
/* 引入全球公认头像库 */
const gravatar = require('gravatar');
/* 引入jsonwebtoken  */
const jwt = require('jsonwebtoken');
/*  引入passport */
const passport = require('passport');

/*
* @router POST api/users/register
* @desc 返回的json数据
* @access public (定义公有接口或者私有接口)
*/
router.post('/register', (req, res) => {
    // 查询数据库中是否拥有该邮箱
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            /*检验邮箱是否已注册*/
            return res.status(400).json('邮箱已被注册!');
        }
        else {
            /* 引入全球公认头像库 */
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'g', d: 'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                identity: req.body.identity,
                avatar
            });
            /*对密码进行加密*/
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if (err) throw err;
                    else {
                        newUser.password = hash;
                        newUser.save()
                            .then(user=>{res.json({user,msg:"用户注册成功"})})
                            .catch(error=>res.json({error,msg:'用户注册失败'}));
                    }
                });
            });
        }
    });
});
/*
* @router POST api/users/login
* @desc 返回 token jwt passport
* @access public (定义公有接口或者私有接口)
*/
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    /* 查询数据库进行匹配 */
    User.findOne({email})
        .then((user=>{
            if (!user) return res.status(404).json('该用户不存在或者未注册');
            /* 对密码进行解密 */
            bcrypt.compare(password, user.password)
                .then(isMatch=>{
                    if (isMatch) {
                        /* 存储为token格式 */
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        // 第一个参数：规则，第二个参数：方式，第三个参数：过期时间
                        jwt.sign(rule,'secret',{expiresIn: 7200},(err,token)=>{
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    }
                    else return res.status(400).json('密码错误');
                });
        }))
});
 /*
 @route  GET api/users/current
 @desc   return current user
 @access Private
 */
router.get('/current',passport.authenticate('jwt',{session: false}),(req, res) => {
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email,
       identity:req.user.identity
   });
});
module.exports = router;