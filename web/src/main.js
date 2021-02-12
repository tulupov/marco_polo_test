import Vue from 'vue'
import App from './App.vue'
import router from './router'
import oauthService from "./services/OauthService"
import qs from "qs"
import Config from "./config"
import axios from "axios";

Vue.config.productionTip = false;

export const ACCESS_TOKEN_KEY = "PRODUCT_ACCESS_TOKEN_KEY";
export const REFRESH_TOKEN_KEY = "PRODUCT_REFRESH_TOKEN_KEY";
export const EXPIRES_AT_KEY = "PRODUCT_EXPIRES_AT_KEY";
export const STATE_KEY = "PRODUCT_STATE_KEY";

let app = new Vue({
  router,
  render: h => h(App),
  data: {
    accessToken: '',
    refreshToken: '',
    expiresAt: '',
  },
  mounted() {
    this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || 0;
    this.refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || 0;
    this.expiresAt = localStorage.getItem(EXPIRES_AT_KEY) || 0;
    if (axios.interceptors.response.handlers.length === 0) {
      axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        console.log(error);
        if (error.response.status === 401) {
          this.logout();
        }
      });
    }
  },
  methods: {
    isAuthenticated() {
      return !!this.accessToken;
    },
    handleAuthentication(code, state) {
      return new Promise(() => {
        if (state !== localStorage.getItem(STATE_KEY)) {
          throw new Error('wrong state');
        }
        oauthService.accessToken(qs.stringify({
          code: code,
          client_id: Config.client_id(),
          client_secret: Config.client_secret(),
          grant_type: Config.grantType()
        })).then(response => {
          const { access_token, refresh_token, expires_in } = response.data;
          this.accessToken = access_token;
          localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
          this.refreshToken = refresh_token;
          localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
          this.expiresAt = expires_in;
          localStorage.setItem(EXPIRES_AT_KEY, expires_in);
          app.$router.push("products")
        })
      })
    },
    logout() {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(EXPIRES_AT_KEY);
      this.accessToken = '';
      this.refreshToken = '';
      this.expiresAt = '';
      app.$router.push("login_oauth");
    },
  }
}).$mount('#app');

export default {
  install: function (Vue) {
    Vue.prototype.$app = app
  }
}
