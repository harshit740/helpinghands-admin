import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {axiosApi} from "./middilwares/interceptors";
import {store} from "./store/store"
import router from './router'
import {host} from './config'

Vue.prototype.$host = host;
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$axios = axiosApi;

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')


