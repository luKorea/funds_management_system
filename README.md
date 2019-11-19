# funds_management_system

#### 介绍
    运用express进行后端接口编写
    运用vue-cli 进行前端页面开发
     vue create client
     使用 concurrently 实现前后端连载
#### 软件架构
软件架构说明
#### 安装教程
##### 引入加密库,对密码进行加密
    cnpm i bcrypt --save
    const bcrypt = require('bcrypt');
##### 引入全球公认头像库
    https://en.gravatar.com/emails?auto-applied=1
    cnpm i gravatar --save
    const gravatar = require('gravatar');
##### 引入mongoose，对数据库进行操作
    cnpm i mongoose --save
    const mongoose = require('mongoose');
##### 引入jwt，登录
    cnpm i jsonwebtoken --save
    const jwt = require('jsonwebtoken');
##### 引入passport，passport-jwt验证token
    cnpm i passport,passport-jwt --save
    const passport = require('passport');
    const ppjwt = require('passport-jwt');
#### 使用说明
##### 前端配置：
    "start": "npm run serve"
##### 后端配置：
    "client-install": "npm install --prefix client",
    "client": "npm start --prefix client",
     "dev": "concurrently\"npm run server\"\"npm run client\""
#### 参与贡献
1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
