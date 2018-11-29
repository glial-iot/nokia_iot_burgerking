<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout row wrap>
         <template v-for="card in cards_data">
            <v-flex d-flex md3 class="restaurant-manager-card">
               <data-widget-manager :type="card.type" :data_feeds="card.data_feeds"
                                    :title="card.title"></data-widget-manager>
            </v-flex>
         </template>
      </v-layout>
   </v-container>
</template>

<script>
    import Vue from "vue";
    import Axios from "axios";
    import VueAxios from "vue-axios";
    import Vue_i18n from 'vue-i18n';
    import "moment/locale/ru";

    import DataWidgetManager from "../common/data-widget-restaurant-manager";

    Vue.use(VueAxios, Axios, Vue_i18n);

    const DATE_FORMAT = "DD MMM";

    export default {
        components: {
            DataWidgetManager
        },
        data: () => ({}),
        methods: {},
        mounted: function () {

        },
        computed: {
            cards_data() {
                return [
                    {
                        type: "clients_per_period",
                        title: this.$i18n.t("message.qty_of_customers"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "clients_per_day",
                                    literal: this.$i18n.t("message.per_day"),
                                    short: this.$i18n.t("message.clients_short")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "clients_per_month",
                                    literal: this.$i18n.t("message.per_month"),
                                    short: this.$i18n.t("message.clients_short")

                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "clients_per_day_per_meter",
                                    literal: this.$i18n.t("message.per_day_per_meter"),
                                    short: this.$i18n.t("message.clients_short")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "clients_per_month_per_meter",
                                    literal: this.$i18n.t("message.per_month_per_meter"),
                                    short: this.$i18n.t("message.clients_short")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "consumption_per_period",
                        title: this.$i18n.t("message.restaurant_consumption"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_day_kWh",
                                    literal: this.$i18n.t("message.per_day_kWh"),
                                    short: this.$i18n.t("message.kilowatt_per_hour")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh",
                                    literal: this.$i18n.t("message.per_month_kWh"),
                                    short: this.$i18n.t("message.kilowatt_per_hour")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_day_roubles",
                                    literal: this.$i18n.t("message.per_day_roubles"),
                                    short: this.$i18n.t("message.roubles_short")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles",
                                    literal: this.$i18n.t("message.per_month_roubles"),
                                    short: this.$i18n.t("message.roubles_short")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "consumption_per_client_and_area",
                        title: this.$i18n.t("message.restaurant_consumption"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_month_kWh_per_client",
                                    literal: this.$i18n.t("message.per_month_kWh_per_client"),
                                    short: this.$i18n.t("message.kWh_per_client")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_client",
                                    literal: this.$i18n.t("message.per_month_roubles_per_client"),
                                    short: this.$i18n.t("message.roubles_per_client")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "consumption_per_area",
                        title: this.$i18n.t("message.restaurant_consumption_not_working_hours"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_day_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_day_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "I",
                                object : "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_day_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_day_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "specific_consumption_per_area",
                        title: this.$i18n.t("message.lighting_consumption"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_month_kWh",
                                    literal: this.$i18n.t("message.per_month_kWh"),
                                    short: this.$i18n.t("message.kilowatt_per_hour")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles",
                                    literal: this.$i18n.t("message.per_month_roubles"),
                                    short: this.$i18n.t("message.roubles_short")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "specific_consumption_per_area",
                        title: this.$i18n.t("message.kitchen_consumption"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_month_kWh",
                                    literal: this.$i18n.t("message.per_month_kWh"),
                                    short: this.$i18n.t("message.kilowatt_per_hour")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles",
                                    literal: this.$i18n.t("message.per_month_roubles"),
                                    short: this.$i18n.t("message.roubles_short")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "specific_consumption_per_area",
                        title: this.$i18n.t("message.air_equipment_consumption"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_month_kWh",
                                    literal: this.$i18n.t("message.per_month_kWh"),
                                    short: this.$i18n.t("message.kilowatt_per_hour")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles",
                                    literal: this.$i18n.t("message.per_month_roubles"),
                                    short: this.$i18n.t("message.roubles_short")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    },
                    {
                        type: "specific_consumption_per_area",
                        title: this.$i18n.t("message.other_equipment_consumption"),
                        data_feeds: [
                            {
                                measurement: {
                                    name: "per_month_kWh",
                                    literal: this.$i18n.t("message.per_month_kWh"),
                                    short: this.$i18n.t("message.kilowatt_per_hour")
                                },
                                parameter: "I",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_kWh_per_meter",
                                    literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                                    short: this.$i18n.t("message.kWh_per_meter")
                                },
                                parameter: "P",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles",
                                    literal: this.$i18n.t("message.per_month_roubles"),
                                    short: this.$i18n.t("message.roubles_short")
                                },
                                parameter: "PF",
                                object: "/power/QF20/"
                            },
                            {
                                measurement: {
                                    name: "per_month_roubles_per_meter",
                                    literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                                    short: this.$i18n.t("message.roubles_per_meter")
                                },
                                parameter: "Q",
                                object: "/power/QF20/"
                            }
                        ]
                    }
                ]
            }
        }
    };
</script>
