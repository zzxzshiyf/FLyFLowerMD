import { login, logout, getUserInfo } from '@/data/user';
import { setToken, getToken } from '@/libs/util';

export default {
  state: {
    userName: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath;
    },
    setUserName (state, name) {
      state.userName = name;
    },
    setAccess (state, access) {
      state.access = access;
    },
    setToken (state, token) {
      state.token = token;
      setToken(token);
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim();
      if ((userName === 'shiyf') && (password === '8426951')) {
        const data = '';
        commit('setToken', data);
      }
      /** return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data;
          commit('setToken', data.token);
          resolve();
        }).catch(err => {
          reject(err);
        });
      }); **/
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '');
          commit('setAccess', []);
          resolve();
        }).catch(err => {
          reject(err);
        });
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      });
    },
    handleUserInfo ({ commit }, { res }) {
      const data = res;
      commit('setAvator', 'https://www.gravatar.com/avatar/87bcc3cfbb79987ea127645c1700068a');
      commit('setUserName', data.username);
      commit('setAccess', data.access);
    },
    // 获取用户相关信息
    getStoreUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          let info = JSON.parse(res);
          commit('setAvator', 'https://www.gravatar.com/avatar/87bcc3cfbb79987ea127645c1700068a');
          commit('setUserName', info.data.username);
          commit('setAccess', info.data.access);
          resolve(info);
        }).catch(err => {
          // console.log(err.response)
          reject(err);
        });
      });
    }
  }
};
