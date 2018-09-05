import axios from '@/libs/api.request';

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  };
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  });
};

export const getUserInfo = () => {
  return axios.request({
    url: 'api/v1/authuser/userinfo',
    params: '',
    method: 'get'
  });
};

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  });
};

export const userList = (page) => {
  return axios.request({
    url: 'api/v1/authuser/userlist',
    params: {
      page
    },
    method: 'get'
  });
};

export const userAdd = (data) => {
  return axios.request({
    url: 'api/v1/authuser/useradd',
    data,
    method: 'post'
  });
};
