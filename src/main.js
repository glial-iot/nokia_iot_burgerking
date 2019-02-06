import Vue from 'vue'
import main_template from './main_template.vue'

import management_map from './management/map.vue'
import manager_ui from './management/manager.vue'
import manager_ui_new from './management/manager_new.vue'
import manager_sunburst_bar_chart from './management/manager-sunburst-bar-chart.vue'
import restaurant_map from './management/restaurant-map.vue'
import economy from './management/economy'
import welcome_page from './index/index.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

let theme_nokia = require('./assets/nokia_colors');
Vue.use(Vuetify, {
  theme: theme_nokia
});

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(solid.faDatabase)
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/sites-management',
    name: 'sites-management',
    component: management_map
  },
    {
      path: '/restaurant-management/:restaurant_id',
      name: 'manager-main-new',
      component: manager_ui_new
    },
    {
      path: '/restaurant-management-old/:restaurant_id',
      name: 'manager-main',
      component: manager_ui
    },
    {
      path: '/manager-sunburst-bar-chart/:restaurant_id',
      name: 'manager-sunburst-bar-chart',
      component: manager_sunburst_bar_chart
    },
    {
      path: '/restaurant-map/:restaurant_id',
      name: 'restaurant-map',
      component: restaurant_map
    },
    {
      path: '/economy',
      name: 'economy',
      component: economy
    },
    /*{
      path: '/',
      name: 'welcome',
      component: welcome_page
    },*/
    {
      path: '*',
      redirect: '/sites-management'
    }]
});

import Axios from "axios";
import VueAxios from "vue-axios";
import Vuex from 'vuex';
import Vue_i18n from 'vue-i18n';

Vue.use(Vuex, VueAxios, Axios, Vue_i18n);

const store = new Vuex.Store({
  state: {
    locale: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'ru',
    influxdb_server: "http://192.168.1.45:8086",
  },
  mutations: {
    updateLocale(state, locale) {
      this.state.locale = locale;
      localStorage.setItem('locale', locale);
    }
  },
  getters: {
    getLocale: state => {
      return state.locale;
    },
    getInfluxServerAddress: state => {
      return state.influxdb_server;
    }
  },
  actions: {
    changeLocale: ({commit}, locale) => {
      commit("updateLocale", locale)
    }
  }
});

import L from 'leaflet'
import "../node_modules/leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png')
})

const messages = require('./assets/translation.json');
const i18n = new Vue_i18n({
  locale: store.state.locale,
  messages,
})

import "../src/assets/global.css";

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(main_template)
})
