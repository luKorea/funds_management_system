/* 用户信息模型 */
const db = require('../module/db');
const UserSchema = db.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    identity:{
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = db.model('User',UserSchema,'user');