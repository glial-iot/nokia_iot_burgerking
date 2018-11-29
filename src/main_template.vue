<template lang=html>
    <v-app id="inspire">
        <v-toolbar color="primary" dark app fixed clipped-left class="toolbar">
            <v-toolbar-items class="cursor-pointer" @click="$router.push('/')">
                <img class="align-self-center mr-3 mt-2" src="./assets/logo_burgerking.svg" height="50px" alt="BK Logo">
                <div class="d-inline align-self-center title">{{$t("message.energy_management")}}</div>
            </v-toolbar-items>
            <language-select class="language-select"></language-select>
            <v-toolbar-items class="hidden-sm-and-down" style="min-width:200px;">
                <div class="title mt-4">{{$t("message.powered_by_nokia")}}</div>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <div class="pt-0 mt-0 mb-0 pb-0 ml-0 pl-2 caption">
            2018 © Nokia IoT Laboratory. Version: {{frontend_version}}
        </div>
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
