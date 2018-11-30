<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout row wrap>
         <template v-for="card in cards_data">
            <v-flex d-flex md3 class="restaurant-manager-card">
               <data-widget-manager :type="card.type" :data_feeds="card.data_feeds" :title="card.title"></data-widget-manager>
            </v-flex>
         </template>
      </v-layout>
   </v-container>
</template>

<script>
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import Vue_i18n from "vue-i18n";
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
  mounted: function() {},
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
              parameter: "in",
              object: "/users/1/",
              object_net_avg: "/users/1/",
              parameter_net_avg: "in",
              math_net_avg_multiplier: "1.1", // +10%
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "sum", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "sum",
              latest_value_calc_avg_period: "time > now() - 24h",
              latest_value_calc_group_period: "24h",
              latest_value_data_function: "sum"
            },
            {
              measurement: {
                name: "clients_per_month",
                literal: this.$i18n.t("message.per_month"),
                short: this.$i18n.t("message.clients_short")
              },
              parameter: "in",
              object: "/users/1/",
              object_net_avg: "/users/1/",
              parameter_net_avg: "in",
              math_net_avg_multiplier: "1.1", // +10%
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "clients_per_day_per_meter",
                literal: this.$i18n.t("message.per_day_per_meter"),
                short: this.$i18n.t("message.clients_short")
              },
              parameter: "in",
              object: "/users/1/",
              object_net_avg: "/users/1/",
              parameter_net_avg: "in",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "clients_per_month_per_meter",
                literal: this.$i18n.t("message.per_month_per_meter"),
                short: this.$i18n.t("message.clients_short")
              },
              parameter: "in",
              object: "/users/1/",
              object_net_avg: "/users/1/",
              parameter_net_avg: "in",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
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
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "I",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh",
                literal: this.$i18n.t("message.per_month_kWh"),
                short: this.$i18n.t("message.kilowatt_per_hour")
              },
              parameter: "P",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "P",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_day_roubles",
                literal: this.$i18n.t("message.per_day_roubles"),
                short: this.$i18n.t("message.roubles_short")
              },
              parameter: "PF",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "PF",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles",
                literal: this.$i18n.t("message.per_month_roubles"),
                short: this.$i18n.t("message.roubles_short")
              },
              parameter: "Q",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "Q",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
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
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "I",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh_per_meter",
                literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "P",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "P",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_client",
                literal: this.$i18n.t("message.per_month_roubles_per_client"),
                short: this.$i18n.t("message.roubles_per_client")
              },
              parameter: "PF",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "PF",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_meter",
                literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "Q",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "Q",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            }
          ]
        },
        {
          type: "consumption_per_area",
          title: this.$i18n.t(
            "message.restaurant_consumption_not_working_hours"
          ),
          data_feeds: [
            {
              measurement: {
                name: "per_day_kWh_per_meter",
                literal: this.$i18n.t("message.per_day_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "I",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "I",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh_per_meter",
                literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "P",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "P",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_day_roubles_per_meter",
                literal: this.$i18n.t("message.per_day_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "PF",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "PF",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_meter",
                literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "Q",
              object: "/power/QF20/",
              object_net_avg: "/power/QF20/",
              parameter_net_avg: "Q",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
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
              parameter: "W",
              object: "/metrics/powergroups/main/Light/",
              object_net_avg: "/metrics/powergroups/main/Light/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh_per_meter",
                literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Light/",
              object_net_avg: "/metrics/powergroups/main/Light/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles",
                literal: this.$i18n.t("message.per_month_roubles"),
                short: this.$i18n.t("message.roubles_short")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Light/",
              object_net_avg: "/metrics/powergroups/main/Light/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_meter",
                literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Light/",
              object_net_avg: "/metrics/powergroups/main/Light/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
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
              parameter: "W",
              object: "/metrics/powergroups/main/Kitchen/",
              object_net_avg: "/metrics/powergroups/main/Kitchen/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh_per_meter",
                literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Kitchen/",
              object_net_avg: "/metrics/powergroups/main/Kitchen/",
              parameter_net_avg: "in",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles",
                literal: this.$i18n.t("message.per_month_roubles"),
                short: this.$i18n.t("message.roubles_short")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Kitchen/",
              object_net_avg: "/metrics/powergroups/main/Kitchen/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_meter",
                literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Kitchen/",
              object_net_avg: "/metrics/powergroups/main/Kitchen/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
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
              parameter: "W",
              object: "/metrics/powergroups/main/Climate/",
              object_net_avg: "/metrics/powergroups/main/Climate/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh_per_meter",
                literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Climate/",
              object_net_avg: "/metrics/powergroups/main/Climate/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles",
                literal: this.$i18n.t("message.per_month_roubles"),
                short: this.$i18n.t("message.roubles_short")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Climate/",
              object_net_avg: "/metrics/powergroups/main/Climate/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_meter",
                literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Climate/",
              object_net_avg: "/metrics/powergroups/main/Climate/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
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
              parameter: "W",
              object: "/metrics/powergroups/main/Other/",
              object_net_avg: "/metrics/powergroups/main/Other/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_kWh_per_meter",
                literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                short: this.$i18n.t("message.kWh_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Other/",
              object_net_avg: "/metrics/powergroups/main/Other/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles",
                literal: this.$i18n.t("message.per_month_roubles"),
                short: this.$i18n.t("message.roubles_short")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Other/",
              object_net_avg: "/metrics/powergroups/main/Other/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            },
            {
              measurement: {
                name: "per_month_roubles_per_meter",
                literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                short: this.$i18n.t("message.roubles_per_meter")
              },
              parameter: "W",
              object: "/metrics/powergroups/main/Other/",
              object_net_avg: "/metrics/powergroups/main/Other/",
              parameter_net_avg: "W",
              math_net_avg_multiplier: "1.1",
              small_chart_group_period: "1d",
              small_chart_time_interval: "time > now() - 5d",
              small_chart_data_function: "mean", //median, sum
              full_chart_group_period: "5m",
              full_chart_time_interval: "time > now() - 24h",
              full_chart_data_function: "mean",
              latest_value_calc_avg_period: "time > now() - 5h AND time < now() - 3h",
              latest_value_calc_group_period: "2h",
              latest_value_data_function: "mean"
            }
          ]
        }
      ];
    }
  }
};
</script>
