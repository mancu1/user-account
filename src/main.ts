import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import vuetify from "./plugins/vuetify";
import Axios from "axios";

import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

Vue.directive("click-outside", {
  bind: function (el: any, binding, vnode: any) {
    el.clickOutsideEvent = function (event: any) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function (el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

if (process.env.NODE_ENV === "development")
  Axios.defaults.baseURL = "http://localhost:3001";
Vue.config.productionTip = false;
// Vue.config.errorHandler = function(err, vm, info) {
//   alert(`Error: ${err.toString()}\nInfo: ${info}`);
// };
new Vue({
  router,
  store,
  // vuetify,
  render: (h) => h(App),
}).$mount("#app");
