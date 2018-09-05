<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m-new.jpg" alt="FLy FLower" width="120" height="100">
                  <h1 class="flex my-4 primary--text">FLy FLower</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="用户名" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="密码" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-qq fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-weibo fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-weixin fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog3" max-width="500px">
    <v-card>
      <v-card-title>
        <span>提示</span>
        <v-spacer></v-spacer>
        <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" flat @click="dialog3=false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Cookies from 'js-cookie';

export default {
  data: () => ({
    loading: false,
    dialog3: false,
    items: [
      {
        title: '用户名或密码错误！'
      }
    ],
    model: {
      username: '',
      password: ''
    }
  }),

  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    login () {
      this.loading = true;
      /** this.handleLogin(this.model.username, this.model.password).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push('/dashboard');
        });
      }); **/
      if ((this.model.username === 'shiyf') && (this.model.password === '8426951')) {
        setTimeout(() => {
          Cookies.set('token', 'token', { expires: 1 });
          window.getApp.$emit('APP_LOGIN_SUCCESS');
        }, 1000);
      } else {
        this.dialog3 = true;
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
