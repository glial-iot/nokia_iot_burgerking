<template lang=html>
  <v-app id="inspire">
    <v-navigation-drawer v-if="!['welcome', 'sites-management'].includes($route.name)"
      :clipped="true" disable-route-watcher
      mini-variant
      fixed app disable-resize-watcher
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-tile :key="item.text" :to="{path: item.path}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <language-select class="language-select"></language-select>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark app fixed clipped-left class="toolbar">
      <v-toolbar-items class="cursor-pointer" @click="$router.push('/sites-management')">
        <img class="align-self-center logo_bk mr-3" src="./assets/logo_burgerking_white.png" alt="BK Logo">
        <div class="d-inline align-self-center title main-title">{{$t("message.energy_management")}}</div>
      </v-toolbar-items>
      <language-select class="language-select"></language-select>
      <v-toolbar-items class="hidden-sm-and-down">
        <div class="title mt-4 main-title">{{$t("message.working_on_glial_impact")}}</div>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from "vue";
  import Vue_i18n from "vue-i18n";
  import Vuex from "vuex";

  Vue.use(Vue_i18n, Vuex);

  import languageSelect from "./common/language-select.vue";

  export default {
    components: {
      languageSelect
    },
    data: () => ({
      frontend_version: VERSION,
      menu_collapsed: true
    }),
    methods: {
      get_expanded_status(path) {
        if (window.location.href.includes(path)) {
          return true;
        }
        return false;
      },
      toggle_menu() {
        this.menu_collapsed = !this.menu_collapsed;
      }
    },
    computed: {
      items() {
        return [
          {
            number: 1,
            icon: "fa-project-diagram",
            path: "/restaurant-management/1",
          },
          /*{
            number: 2,
            icon: "fa-project-diagram",
            path: "/restaurant-management-old/1",
          },*/
          {
            number: 3,
            icon: "fa-chart-pie",
            path: "/manager-sunburst-bar-chart/1",
          },
          {
            number: 4,
            icon: "fa-map",
            path: "/restaurant-map/1",
          },
          {
            number: 5,
            icon: "fa-percent",
            path: "/economy",
          }
        ];
      }
    }
  };
</script>
