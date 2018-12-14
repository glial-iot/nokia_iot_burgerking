<template>
  <v-container grid-list-md fill-height fluid>
    БАР
    <v-layout row wrap>
      <template v-for="card in cards_data.slice(0,3)">
        <v-flex d-flex md3 class="restaurant-manager-card" :key="card.id">
          <data-widget-manager :id="card.id" :type="card.type" :data_feeds="card.data_feeds"
                               :title="card.title"></data-widget-manager>
        </v-flex>
      </template>
      <v-flex d-flex md3 class="restaurant-manager-card">
        <pie-chart-manager :config="pie_chart_data.config" :data_feeds="pie_chart_data.data_feeds"></pie-chart-manager>
      </v-flex>
      <template v-for="card in cards_data.slice(3,8)">
        <v-flex d-flex md3 class="restaurant-manager-card" :key="card.id">
          <data-widget-manager :id="card.id" :type="card.type" :data_feeds="card.data_feeds"
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
  import Vue_i18n from "vue-i18n";
  import "moment/locale/ru";

  import DataWidgetManager from "../common/data-widget-restaurant-manager";
  import PieChartManager from "../common/pie-chart-restaurant-manager";

  Vue.use(VueAxios, Axios, Vue_i18n);

  const DATE_FORMAT = "DD MMM";

  export default {
    components: {
      DataWidgetManager,
      PieChartManager
    },
    data: () => ({}),
    methods: {},
    mounted: function () {
    },
    computed: {
      cards_data() {
        return [
          {
            id: 1,
            type: "clients_per_period",
            title: this.$i18n.t("message.qty_of_customers"),
            data_feeds: [
              {
                id: 11,
                measurement: {
                  name: "clients_per_day",
                  literal: this.$i18n.t("message.per_day"),
                  short: this.$i18n.t("message.clients_short")
                },
                parameter: "last_24h",
                object: "/metrics/summary/clients/",
                object_net_avg: "/metrics/summary/clients/",
                parameter_net_avg: "last_24h",
                math_net_avg_multiplier: "0.9",
                small_chart_group_period: "1h",
                small_chart_time_interval: "time > now() - 2d",
                small_chart_data_function: "median",
                full_chart_group_period: "2m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              {
                id: 12,
                measurement: {
                  name: "clients_per_month",
                  literal: this.$i18n.t("message.per_month"),
                  short: this.$i18n.t("message.clients_short")
                },
                parameter: "last_30d",
                object: "/metrics/summary/clients/",
                object_net_avg: "/metrics/summary/clients/",
                parameter_net_avg: "last_30d",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "5d",
                small_chart_time_interval: "time > now() - 90d",
                small_chart_data_function: "median",
                full_chart_group_period: "1h",
                full_chart_time_interval: "time > now() - 90h",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
               {
                id: 14,
                measurement: {
                  name: "clients_per_month_per_meter",
                  literal: this.$i18n.t("message.per_month_per_meter"),
                  short: this.$i18n.t("message.clients_short")
                },
                parameter: "last_month_per_area",
                object: "/metrics/relative/clients/",
                object_net_avg: "/metrics/relative/clients/",
                parameter_net_avg: "last_month_per_area",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "5d",
                small_chart_time_interval: "time > now() - 90d",
                small_chart_data_function: "median",
                full_chart_group_period: "1h",
                full_chart_time_interval: "time > now() - 90h",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              }
            ]
          },
          {
            id: 2,
            type: "consumption_per_period",
            title: this.$i18n.t("message.restaurant_consumption"),
            data_feeds: [
              {
                id: 21,
                measurement: {
                  name: "per_day_kWh",
                  literal: this.$i18n.t("message.per_day_kWh"),
                  short: this.$i18n.t("message.kilowatt_per_hour")
                },
                parameter: "last_24h",
                object: "/metrics/summary/energy/all/",
                object_net_avg: "/metrics/summary/energy/all/",
                parameter_net_avg: "last_24h",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              {
                id: 22,
                measurement: {
                  name: "per_month_kWh",
                  literal: this.$i18n.t("message.per_month_kWh"),
                  short: this.$i18n.t("message.kilowatt_per_hour")
                },
                parameter: "last_30d",
                object: "/metrics/summary/energy/all/",
                object_net_avg: "/metrics/summary/energy/all/",
                parameter_net_avg: "last_30d",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 10h",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              }/* ,
              {
                id: 23,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 24,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              } */
            ]
          },
          {
            id: 3,
            type: "consumption_per_client_and_area",
            title: this.$i18n.t("message.restaurant_consumption"),
            data_feeds: [
              {
                id: 31,
                measurement: {
                  name: "per_month_kWh_per_client",
                  literal: this.$i18n.t("message.per_month_kWh_per_client"),
                  short: this.$i18n.t("message.kWh_per_client")
                },
                parameter: "last_month_per_client",
                object: "/metrics/relative/energy/",
                object_net_avg: "/metrics/relative/energy/",
                parameter_net_avg: "last_month_per_client",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              {
                id: 32,
                measurement: {
                  name: "per_month_kWh_per_meter",
                  literal: this.$i18n.t("message.per_month_kWh_per_meter"),
                  short: this.$i18n.t("message.kWh_per_meter")
                },
                parameter: "last_month_per_area",
                object: "/metrics/relative/energy/",
                object_net_avg: "/metrics/relative/energy/",
                parameter_net_avg: "last_month_per_area",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
               {
                id: 33,
                measurement: {
                  name: "per_month_roubles_per_client",
                  literal: this.$i18n.t("message.per_month_roubles_per_client"),
                  short: this.$i18n.t("message.roubles_per_client")
                },
                parameter: "last_month_per_client",
                object: "/metrics/relative/money/",
                object_net_avg: "/metrics/relative/money/",
                parameter_net_avg: "last_month_per_client",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              {
                id: 34,
                measurement: {
                  name: "per_month_roubles_per_meter",
                  literal: this.$i18n.t("message.per_month_roubles_per_meter"),
                  short: this.$i18n.t("message.roubles_per_meter")
                },
                parameter: "last_month_per_area",
                object: "/metrics/relative/money/",
                object_net_avg: "/metrics/relative/money/",
                parameter_net_avg: "last_month_per_area",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              }
            ]
          },
          {
            id: 5,
            type: "specific_consumption_per_area",
            title: this.$i18n.t("message.lighting_consumption"),
            data_feeds: [
              {
                id: 51,
                measurement: {
                  name: "per_month_kWh",
                  literal: this.$i18n.t("message.per_month_kWh"),
                  short: this.$i18n.t("message.kilowatt_per_hour")
                },
                parameter: "last_30d",
                object: "/metrics/summary/energy/light/",
                object_net_avg: "/metrics/summary/energy/light/",
                parameter_net_avg: "last_30d",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              /* {
                id: 52,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 53,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 54,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              } */
            ]
          },
          {
            id: 6,
            type: "specific_consumption_per_area",
            title: this.$i18n.t("message.kitchen_consumption"),
            data_feeds: [
              {
                id: 61,
                measurement: {
                  name: "per_month_kWh",
                  literal: this.$i18n.t("message.per_month_kWh"),
                  short: this.$i18n.t("message.kilowatt_per_hour")
                },
                parameter: "last_30d",
                object: "/metrics/summary/energy/kitchen/",
                object_net_avg: "/metrics/summary/energy/kitchen/",
                parameter_net_avg: "last_30d",
                math_net_avg_multiplier: "1.1",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              /* {
                id: 62,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 63,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 64,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              } */
            ]
          },
          {
            id: 7,
            type: "specific_consumption_per_area",
            title: this.$i18n.t("message.air_equipment_consumption"),
            data_feeds: [
              {
                id: 71,
                measurement: {
                  name: "per_month_kWh",
                  literal: this.$i18n.t("message.per_month_kWh"),
                  short: this.$i18n.t("message.kilowatt_per_hour")
                },
                parameter: "last_30d",
                object: "/metrics/summary/energy/climate/",
                object_net_avg: "/metrics/summary/energy/climate/",
                parameter_net_avg: "last_30d",
                math_net_avg_multiplier: "0.9",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
              /* {
                id: 72,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 73,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 74,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              } */
            ]
          },
          {
            id: 8,
            type: "specific_consumption_per_area",
            title: this.$i18n.t("message.other_equipment_consumption"),
            data_feeds: [
              {
                id: 81,
                measurement: {
                  name: "per_month_kWh",
                  literal: this.$i18n.t("message.per_month_kWh"),
                  short: this.$i18n.t("message.kilowatt_per_hour")
                },
                parameter: "last_30d",
                object: "/metrics/summary/energy/other/",
                object_net_avg: "/metrics/summary/energy/other/",
                parameter_net_avg: "last_30d",
                math_net_avg_multiplier: "0.7",
                small_chart_group_period: "1d",
                small_chart_time_interval: "time > now() - 5d",
                small_chart_data_function: "median",
                full_chart_group_period: "10m",
                full_chart_time_interval: "time > now() - 10d",
                full_chart_data_function: "median",
                latest_value_calc_avg_period: "time > now() - 5m",
                latest_value_calc_group_period: "5m",
                latest_value_data_function: "max"
              },
/*               {
                id: 82,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 83,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              },
              {
                id: 84,
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
                small_chart_data_function: "mean",
                full_chart_group_period: "5m",
                full_chart_time_interval: "time > now() - 24h",
                full_chart_data_function: "mean",
                latest_value_calc_avg_period:
                  "time > now() - 5h AND time < now() - 3h",
                latest_value_calc_group_period: "2h",
                latest_value_data_function: "mean"
              } */
            ]
          }
        ];
      },
      pie_chart_data() {
        return {
          config: {
            data_function: "max",
            group_period: "96h",
            time_interval: "time > now() - 96h",
          },
          data_feeds: [
            {
              equipment_type: "kitchen",
              equipment_name: this.$i18n.t("message.kitchen"),
              data_object: "/metrics/powergroups/main/kitchen/",
              data_parameter: "W"
            },
            {
              equipment_type: "light",
              equipment_name: this.$i18n.t("message.light"),
              data_object: "/metrics/powergroups/main/light/",
              data_parameter: "W"
            },
            {
              equipment_type: "climate",
              equipment_name: this.$i18n.t("message.climate"),
              data_object: "/metrics/powergroups/main/climate/",
              data_parameter: "W"
            },
            {
              equipment_type: "other",
              equipment_name: this.$i18n.t("message.other"),
              data_object: "/metrics/powergroups/main/other/",
              data_parameter: "W"
            }
          ]
        }
      }
    }
  };
</script>
