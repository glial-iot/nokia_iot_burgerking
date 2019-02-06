<template>
  <v-container grid-list-md fluid fill-height>
    <v-layout column>
      <v-flex d-flex md11 class="wrapper_fix">
        <v-layout column>
          <v-flex d-flex md6 class="top_container">
            <v-layout row>
              <v-flex d-flex md6 class="column_container">
                <v-layout column wrap>
                  <v-flex d-flex md1 class="block_title">
                    <h3 class="text-md-center">Климатические параметры</h3>
                  </v-flex>
                  <v-flex d-flex md11 class="block_content">
                    <template v-for="card in small_cards_data">
                      <v-flex d-flex md4 :key="card.id">
                        <data-widget-manager-small :id="card.id" :type="card.type" :data_feeds="card.data_feeds"
                                                   :title="card.title"></data-widget-manager-small>
                      </v-flex>
                    </template>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d-flex md6 class="column_container">
                <v-layout column wrap>
                  <v-flex d-flex md1 class="block_title">
                    <h3 class="text-md-center">Энергия</h3>
                  </v-flex>
                  <v-flex d-flex md11 class="block_content">
                    <template v-for="card in cards_data">
                      <v-flex d-flex md6 :key="card.id">
                        <data-widget-manager :id="card.id" :type="card.type" :data_feeds="card.data_feeds"
                                             :title="card.title"></data-widget-manager>
                      </v-flex>
                    </template>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md6 class="bottom_container">
            <v-layout row>
              <v-flex d-flex md6 class="column_container block_content_container ml-1">
                <v-layout column class="block_content_container_column">
                  <template v-for="block in data_chart_blocks">
                    <data-chart-block :block="block" :chart_data="block.graph_data"></data-chart-block>
                  </template>
                </v-layout>
              </v-flex>
              <v-flex d-flex md6 class="column_container table_container mt-1 ml-3 pr-3">
                <v-layout column wrap>
                  <v-flex d-flex md12 class="block_content">
                    <events-table :data="events"></events-table>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md1 class="footer-internal">
        <div class="caption text-center align-self-center">
          2018-2019 © Nokia IoT Laboratory, Moscow.   Powered by Nokia Glial™ and IMPACT™.   Version: {{frontend_version}}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import Axios from "axios";
  import VueAxios from "vue-axios";
  import Vue_i18n from "vue-i18n";
  import "moment/locale/ru";

  import DataWidgetManager from "../common/data-widget-restaurant-manager-short";
  import DataWidgetManagerSmall from "../common/data-widget-restaurant-manager-small";
  import PieChartManager from "../common/pie-chart-restaurant-manager-widget";
  import EventsTable from "./components/events-table";
  import DataChartBlock from "./components/data-chart-block";

  Vue.use(VueAxios, Axios, Vue_i18n);

  const DATE_FORMAT = "DD MMM";

  export default {
    components: {
      EventsTable,
      DataWidgetManager,
      PieChartManager,
      DataChartBlock,
      DataWidgetManagerSmall
    },
    data: () => ({
      frontend_version: VERSION,
    }),
    methods: {},
    mounted: function () {
    },
    computed: {
      data_chart_blocks () {
        return [
          {
            text: "За последние сутки:",
            value: 430,
            value_metering: "клиентов",
            graph_data: [
              {
                date: new Date('2019-01-29T03:24:00'),
                name: 'graph_data',
                value: 1
              },
              {
                date: new Date('2019-01-30T03:24:00'),
                name: 'graph_data',
                value: 2
              },
              {
                date: new Date('2019-02-01T03:24:00'),
                name: 'graph_data',
                value: 1
              },
              {
                date: new Date('2019-02-02T03:24:00'),
                name: 'graph_data',
                value: 3
              },
              {
                date: new Date('2019-02-03T03:24:00'),
                name: 'graph_data',
                value: 5
              }
            ]
          },
          {
            text: "За последний месяц:",
            value: "12 000",
            value_metering: "клиентов",
            graph_data: [
              {
                date: new Date('2018-09-29T03:24:00'),
                name: 'graph_data',
                value: 1
              },
              {
                date: new Date('2018-10-29T03:24:00'),
                name: 'graph_data',
                value: 2
              },
              {
                date: new Date('2018-11-29T03:24:00'),
                name: 'graph_data',
                value: 1
              },
              {
                date: new Date('2018-12-29T03:24:00'),
                name: 'graph_data',
                value: 3
              },
              {
                date: new Date('2019-01-03T03:24:00'),
                name: 'graph_data',
                value: 5
              }
            ]
          },
          {
            text: "На квадратный метр:",
            value: 20,
            value_metering: "кл/м²",
            graph_data: [
              {
                date: new Date('2019-01-29T03:24:00'),
                name: 'graph_data',
                value: 1
              },
              {
                date: new Date('2019-01-30T03:24:00'),
                name: 'graph_data',
                value: 2
              },
              {
                date: new Date('2019-02-01T03:24:00'),
                name: 'graph_data',
                value: 1
              },
              {
                date: new Date('2019-02-02T03:24:00'),
                name: 'graph_data',
                value: 3
              },
              {
                date: new Date('2019-02-03T03:24:00'),
                name: 'graph_data',
                value: 5
              }
            ]
          }
        ]
      },
      events () {
        return [
          "21 декабря, 17:40     -   Освещение не выключено ночью",
          "25 декабря, 2:40     -   Не выключена плита",
          "28 декабря, 4:43     -   Отключение питания холодильника",
          "30 декабря, 2:15     -   Перетоп. Температура в зале +28",
        ]
      },
      small_cards_data () {
        return [
          {
            id: 1,
            type: "clients_per_period",
            title: "Температура",
            data_feeds: [
              {
                id: 11,
                measurement: {
                  name: "clients_per_day",
                  literal: "",
                  short: "℃",
                  explicit_value: "20"
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
            ]
          },
          {
            id: 1,
            type: "clients_per_period",
            title: "Влажность",
            data_feeds: [
              {
                id: 11,
                measurement: {
                  name: "clients_per_day",
                  literal: "",
                  short: "%",
                  explicit_value: "17"
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
            ]
          },
          {
            id: 1,
            type: "clients_per_period",
            title: "CO₂",
            data_feeds: [
              {
                id: 11,
                measurement: {
                  name: "clients_per_day",
                  literal: "",
                  short: "ppm",
                  explicit_value: "45"
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
            ]
          }
        ]
      },
      cards_data() {
        return [
          {
            id: 1,
            type: "consumption_per_period",
            title: this.$i18n.t("message.restaurant_consumption"),
            data_feeds: [
              {
                id: 11,
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
                id: 12,
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
              }
            ]
          },
          {
            id: 2,
            type: "consumption_per_client_and_area",
            title: this.$i18n.t("message.restaurant_consumption"),
            data_feeds: [
              {
                id: 21,
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
                id: 22,
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
                id: 23,
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
                id: 24,
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
