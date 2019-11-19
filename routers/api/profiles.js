/* 数据信息接口 */
const express = require('express');
const router = express.Router();
const passport =require('passport');
/* 引入登录注册模型 */
const Profile = require('../../module/Profile');

/*
    @router GET api/profile/
    @desc 获取信息接口
    @access private
* */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        Profile.find()
            .then(profile => {
                if (!profile) {return res.status(404).json('没有任何内容');}
                res.json(profile);})
            .catch(err => res.status(404).json(err));
    });
/*
    @router GET api/profile/:id
    @desc 获取单个信息接口
    @access private
* */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        Profile.findOne({ _id: req.params.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    });
/*
    @router POST api/profile/add
    @desc 创建添加接口
    @access private
* */
router.post('/add',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const profileFiles = {};
    if (req.body.type) profileFiles.type = req.body.type;
    if (req.body.describe) profileFiles.describe = req.body.describe;
    if (req.body.income) profileFiles.income = req.body.income;
    if (req.body.expend) profileFiles.expend = req.body.expend;
    if (req.body.cash) profileFiles.cash = req.body.cash;
    if (req.body.remark) profileFiles.remark = req.body.remark;
    new Profile(profileFiles).save()
        .then(profile=>{res.json(profile)})
});
/*
    @router POST api/profile/edit/:id
    @desc 创建添加接口
    @access private
* */
router.post('/edit/:id',passport.authenticate('jwt', { session: false}),(req,res)=>{
    const profileFiles = {};
    if (req.body.type) profileFiles.type = req.body.type;
    if (req.body.describe) profileFiles.describe = req.body.describe;
    if (req.body.income) profileFiles.income = req.body.income;
    if (req.body.expend) profileFiles.expend = req.body.expend;
    if (req.body.cash) profileFiles.cash = req.body.cash;
    if (req.body.remark) profileFiles.remark = req.body.remark;
    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set:profileFiles},
        {new: true}
        ).then(profile=>res.json({profile,msg:'修改成功'}))
});
/*
    @router POST api/profile/delete:id
    @desc 创建添加接口
    @access private
* */
router.delete('/delete/:id',passport.authenticate('jwt', { session: false}),(req,res)=>{
   Profile.findOneAndRemove({_id: req.params.id})
       .then(profile=>{
           profile.save()
               .then(profile=>{
                   res.json(profile)
               })
       })
       .catch(err=>res.status(404).json('删除失败'))
});
module.exports = router;