<template lang=html>
    <v-app id="inspire">
        <v-navigation-drawer
                :clipped="true"
                :mini-variant.sync="menu_collapsed"
                fixed app disable-resize-watcher permanent touchless width=250
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-layout v-if="item.heading" :key="item.heading" row align-center>
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group
                            v-else-if="item.children"
                            :key="item.text"
                            :prepend-icon="item.model ? item.icon : item.alticon"
                            append-icon=""
                            v-bind:value="get_expanded_status(item.path)"
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                                v-for="(child, i) in item.children"
                                :key="i"
                                :to="{path: child.path}"
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon small class="ml-2">{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title class="ml-2">
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" :to="{path: item.path}">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
            <language-select class="language-select"></language-select>
        </v-navigation-drawer>

        <v-toolbar color="primary" dark app fixed clipped-left class="toolbar">
            <v-btn icon @click="toggle_menu">
                <v-icon>fa-bars</v-icon>
            </v-btn>
            <v-menu>
                <v-toolbar-title class="no-logo-margin" slot="activator">
                    <img class="mr-3 mt-2" src="./assets/logo_nokia.svg" height="25px" alt="Nokia Logo">
                    {{$t("message.smart_city_control_center")}}
                </v-toolbar-title>
            </v-menu>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <div class="title mt-4">{{$t("message.powered_by_impact")}}</div>
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
                        path: "management",
                        text: this.$i18n.t("message.restaurants"),
                        icon: "fa-map"
                    },
                    {
                        path: "restaurant",
                        text: this.$i18n.t("message.manager_ui"),
                        icon: "fa-user"
                    }
                ];
            }
        }
    };
</script>
