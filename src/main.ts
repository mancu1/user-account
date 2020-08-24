import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

if (process.env.NODE_ENV === "development")
  Axios.defaults.baseURL = "http://localhost:3001";
Vue.config.productionTip = false;
// Vue.config.errorHandler = function(err, vm, info) {
//   alert(`Error: ${err.toString()}\nInfo: ${info}`);
// };
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
