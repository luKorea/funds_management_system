/* 请求拦截文件  */
import axios from 'axios';
// 引入loading加载动画
import { Loading,Message } from 'element-ui';
import router from './router';
// 自定义动画函数
let loading;
let startLoading = () =>{
    /* 开场动画 */
    loading = Loading.service({
        lock: true,
        text: '正在加载...客官请稍等...',
        background: 'rgba(0,0,0,.6)'
    })
};
let endLoading = () =>{
    /* 结束动画 */
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(config=>{
   startLoading();
   /* 设置请求头 */
    let userToken = localStorage.userToken;
    if (userToken) {
        // 设置统一的请求头
        config.headers.Authorization = userToken;
    }
   return config;
},error => {
    return Promise.reject(error)
});
// 响应拦截
axios.interceptors.response.use(response=>{
   endLoading();
   return response;
},error => {
    endLoading();
    Message.error(error.response.data);
    // 获取错误状态码
    const { status } = error.response;
    if (status === 401) {
        Message.error('token已经过期，请重新登录');
        // 清除token
        localStorage.removeItem('userToken');
        // 跳转到登录页面
        router.push('/login');
    }


    return Promise.reject(error)
});

export default axios;