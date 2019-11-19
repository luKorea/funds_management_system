/* 连接数据库模型 */
const mongoose = require('mongoose');
const config = require('.././config/config');
mongoose.connect(config.mongodnURl,{ useNewUrlParser: true },err=>{
    if (!err) console.log('连接数据库成功');
    console.log(err);
});
/* 将模型暴露出去 */
module.exports = mongoose;