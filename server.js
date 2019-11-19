/*入口文件 */
const express = require('express');
const bodyParser = require('body-parser');
/* 引入passport */
const passport = require('passport');
const app = express();
// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// passport 初始化
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// 引入路由模块
const user = require('./routers/api/users');
app.use('/api/users',user);
const profile = require('./routers/api/profiles');
app.use('/api/profile',profile);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port localhost:${port}`);
});
