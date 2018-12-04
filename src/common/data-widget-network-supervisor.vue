<template>
  <div>
    <div v-if="!data_loaded" class="data-is-loading">
      <div class="spinner">
        <v-icon>fa fa-spinner fa-spin fa-3x</v-icon>
      </div>
    </div>
    <v-layout row wrap>
      <v-flex d-flex md12>
        <v-card v-if="data_loaded" color="green lighten-3">
          <div class="chart-background" style="z-index:0">
            <bar-chart :data="small_chart_data" :hideAxis="true" :isDashboard="true"></bar-chart>
          </div>
          <div class="widget-content">
            <v-card-title primary class="d-block title text-center mt-0">
              <span v-if="averaged === true">{{concat_title}}</span>
              <span v-else>{{title}}</span>
            </v-card-title>
            <v-card-text v-if="average_method == 'arithmetic_average'" class="d-block text-center">
              <span class="display-2">{{current_value}}</span> <span class="headline">{{measurement}}</span>
            </v-card-text>
            <v-card-text v-if="average_method == 'median'" class="d-block text-center">
              <span class="display-2">{{current_value}}</span> <span class="headline">{{measurement}}</span>
            </v-card-text>
          </div>
          <v-card-actions class="widget-actions">
            <v-menu v-if="averaged === true" bottom origin="center center" transition="scale-transition">
              <div slot="activator" class="cursor-pointer">
                <v-icon>fa-bars</v-icon>
              </div>
              <v-list>
                <v-list-tile v-for="(item, i) in average_method_options" :key="i">
                  <v-list-tile-title @click="setAvgOption(i)">{{item}}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <div class="cursor-pointer" @click="showChart()">
              <v-icon>fa-chart-bar</v-icon>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <data-widget-chart-modal ref="chartModal" :chart_data="full_chart_data"></data-widget-chart-modal>
  </div>
</template>

<script>
  import Vue from "vue";
  import Vue_i18n from 'vue-i18n';
  import Axios from "axios";
  import VueAxios from "vue-axios";

  Vue.use(Vue_i18n, VueAxios, Axios);

  import BarChart from "./charts/BarChart"
  import DataWidgetChartModal from "./data-widget-chart-modal"

  export default {
    components: {
      BarChart,
      DataWidgetChartModal
    },
    name: "data-widget-text",
    props: ["type", "parameter", "title", "data_object", "value", "measurement", "avg_net_value", "id", "averaged"],
    data: () => ({
      average_method: "arithmetic_average",
      small_chart_data: [],
      full_chart_data: [],
      current_value: "",
      data_loaded: false
    }),
    methods: {
      showChart() {
        let chart_title = this.$props.averaged ? this.concat_title : this.title;
        this.$refs.chartModal.show(chart_title, this.full_chart_data);
      },
      setAvgOption(option) {
        this.average_method = option;
        localStorage.setItem('avg_method_w' + this.id, option);
      },
      getFullChartData() {
        let data_series = [];
        let fill = "none"; //fill the gap between "now" and last data received
        let time_interval = "time > now() - 24h";
        let group_by = "5m"; // group by 1 hour
        let query_parameter = this.parameter;
        if (this.average_method === "arithmetic_average") {
          query_parameter = "mean(\"" + this.parameter + "\") as \"Mean_" + this.parameter + "\"";
        }
        if (this.average_method === "median") {
          query_parameter = "median(\"" + this.parameter + "\")";
        }
        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.data_object + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ")";
        Vue.axios
          .get(this.$store.getters.getInfluxServerAddress + "/query", {
            params: {
              epoch: "ms",
              q: influxql_query
            }
          })
          .then(response => {
            if (response.data.results[0].series) {
              response.data.results[0].series[0].values.map((value) => {
                data_series.push(
                  {
                    date: new Date(value[0]),
                    name: this.parameter,
                    value: value[1]
                  }
                )
              })
            }
            else {
              console.log("No data form influx. Query: "+ influxql_query)
            }
            this.full_chart_data = data_series;
            this.data_loaded = true;
          })
          .catch(error => {
            console.log(error)
          });
      },
      getSmallChartData() {
        let data_series = [];
        let fill = "none"; //fill the gap between "now" and last data received
        let limit = 5; // only 5 values
        let time_interval = "time > now() - " + limit + "d"; //last 5 days
        let group_by = "1d"; // group by 1 day
        let query_parameter = this.parameter;
        if (this.average_method === "arithmetic_average") {
          query_parameter = "mean(\"" + this.parameter + "\") as \"Mean_" + this.parameter + "\"";
        }
        if (this.average_method === "median") {
          query_parameter = "median(\"" + this.parameter + "\")";
        }
        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.data_object + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ") LIMIT " + limit;
        Vue.axios
          .get(this.$store.getters.getInfluxServerAddress + "/query", {
            params: {
              epoch: "ms",
              q: influxql_query
            }
          })
          .then(response => {
            if (response.data.results[0].series) {
              response.data.results[0].series[0].values.map((value) => {
                data_series.push(
                  {
                    title: new Date(value[0]),
                    value: value[1]
                  }
                )
              })
            }
            else {
              console.log("No data form influx. Query: "+ influxql_query)
            }
            this.small_chart_data = data_series;
          })
          .catch(error => {
            console.log(error)
          });
      },
      getLatestValue() {
        let fill = "none"; //fill the gap between "now" and last data received
        let limit = 1; // only 1 value
        let time_interval = "time > now() - 5h AND time < now() - 3h"; //last 5 days
        let group_by = "2h"; // group by 2 hours
        let query_parameter = this.parameter;
        if (this.average_method === "arithmetic_average") {
          query_parameter = "mean(\"" + this.parameter + "\") as \"Mean_" + this.parameter + "\"";
        }
        if (this.average_method === "median") {
          query_parameter = "median(\"" + this.parameter + "\") as \"Median" + this.parameter + "\"";
        }
        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.data_object + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ") LIMIT " + limit;
        Vue.axios
          .get(this.$store.getters.getInfluxServerAddress + "/query", {
            params: {
              epoch: "ms",
              q: influxql_query
            }
          })
          .then(response => {
            if (response.data.results[0].series) {
              this.current_value = response.data.results[0].series[0].values[0][1].toFixed(2);
            }
            else {
              console.log("No data form influx. Query: "+ influxql_query)
            }
          })
          .catch(error => {
            console.log(error)
          });
      },
      refreshData() {
        this.getLatestValue();
        this.getSmallChartData();
        this.getFullChartData();
      }
    },
    computed: {
      average_method_options() {
        return {
          "arithmetic_average": this.$i18n.t("message.arithmetic_average"),
          "median": this.$i18n.t("message.median")
        }
      },
      concat_title() {
        return this.average_method_options[this.average_method] + " " + this.title;
      }

    },
    mounted: function () {
      this.average_method = localStorage.getItem('avg_method_w' + this.id) ?
        localStorage.getItem('avg_method_w' + this.id) : "arithmetic_average";
      this.refreshData();
    },
    watch: {
      average_method: 'refreshData'
    }
  }
</script>

<style scoped>

</style>
