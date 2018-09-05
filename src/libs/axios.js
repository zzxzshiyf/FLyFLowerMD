import Axios from 'axios';
import { setToken, getToken } from '@/libs/util';

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    };
    // 存储请求队列
    this.queue = {};
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url];
    const queue = Object.keys(this.queue);
    return queue.length;
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // Spin.show()
      // 在发送请求之前做些什么
      return config;
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let { data } = res;
      const is = this.destroy(url);
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500);
      }
      return data;
    }, (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401: {
            // 返回 401 清除token信息并跳转到登录页面
            this.$message.error('未登录，或登录失效，请重新登录');
            setToken('');
            window.location.href = '/401';
            break;
          }
          case 403: {
            /** Notice.error({
              title: '登录失败',
              desc: '检查后重新登录，如有问题，联系管理员',
              top: 50,
              duration: 5
            }) */
            setToken('');
            window.location.href = '/login';
            break;
          }
          case 500: {
            this.$message.error('服务器内部错误，无法执行操作');
            window.location.href = '/500';
            break;
          }
          case 404: {
            this.$message.error('页面未找到');
            window.location.href = '/*';
          }
        }
      }
      return Promise.reject(error);
    });
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: 'http://192.168.89.78',
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': getToken()
      },
      withCredentials: true
    };
    return Axios.create(conf);
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    let instance = this.create();
    this.interceptors(instance, options.url);
    options = Object.assign({}, options);
    this.queue[options.url] = instance;
    return instance(options);
  }
}
export default httpRequest;
