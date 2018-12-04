<template>
  <div>
    <div v-if="!data_loaded" class="data-is-loading">
      <div class="spinner">
        <v-icon>fa fa-spinner fa-spin fa-3x</v-icon>
      </div>
    </div>
    <v-layout row wrap>
      <v-flex d-flex md12>
        <v-card v-if="data_loaded" :color="card_color" class="restaurant-card">
          <div class="chart-background" style="z-index:0">
            <bar-chart :data="small_chart_data" :hideAxis="true" :isDashboard="true"></bar-chart>
          </div>
          <div class="widget-content">
            <v-card-title primary class="d-block title text-center mt-0">
              <span>{{title}} {{current_feed.measurement.literal | decapitalize}}</span>
            </v-card-title>
            <v-card-text class="d-block text-center">
              <span class="display-2">{{current_value}}</span><span
              class="headline"> {{current_feed.measurement.short}}</span>
            </v-card-text>
            <v-card-title primary class="d-block title text-center mt-0">{{$t("message.network_average")}}:
            </v-card-title>
            <v-card-text class="d-block text-center">
              <span class="display-2">{{average_network_value}}</span><span class="headline"> {{current_feed.measurement.short}}</span>
            </v-card-text>
          </div>
          <v-card-actions class="widget-actions">
            <v-menu bottom origin="center center" transition="scale-transition">
              <div slot="activator" class="cursor-pointer">
                <v-icon>fa-bars</v-icon>
              </div>
              <v-list>
                <v-list-tile v-for="(feed, index) in data_feeds" :key="feed.id">
                  <v-list-tile-title class="cursor-pointer" @click="setCurrentFeed(feed, index)">{{feed.measurement.literal}}
                  </v-list-tile-title>
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
  import Vuex from "vuex";
  import Vue_i18n from 'vue-i18n';

  Vue.use(Vuex, Vue_i18n);

  import BarChart from "./charts/BarChart"
  import DataWidgetChartModal from "./data-widget-chart-modal"

  export default {
    components: {
      BarChart,
      DataWidgetChartModal
    },
    name: "data-widget-text",
    props: ["id", "type", "title", "data_feeds"],
    data: () => ({
      small_chart_data: [],
      full_chart_data: [],
      current_value: "",
      average_network_value: "",
      average_method: "arithmetic_average",
      current_feed: {
        measurement: {}
      },
      current_feed_index: 0,
      data_loaded: false
    }),
    methods: {
      showChart() {
        let chart_title = this.title + " " + this.$options.filters.decapitalize(this.current_feed.measurement.literal);
        this.$refs.chartModal.show(chart_title, this.small_chart_data);
      },
      setDefaultFeed() {
        if (localStorage.getItem('widget_' + this.id)) {
          this.current_feed_index = localStorage.getItem('widget_' + this.id);
          if (this.data_feeds[this.current_feed_index]) {
            this.current_feed = this.data_feeds[this.current_feed_index];
          }
          else {
            this.current_feed = this.data_feeds[0];
          }
        }
        else {
          this.current_feed = this.data_feeds[0];
        }
      },
      setCurrentFeed(feed, index) {
        this.current_feed = feed;
        this.current_feed_index = index;
        localStorage.setItem('widget_' + this.id, this.current_feed_index.toString());
      },
      reloadFeedMeta() {
        this.current_feed.measurement = this.data_feeds[this.current_feed_index].measurement;
        console.log("locale changed")
      },
      getFullChartData() {
        let data_series = [];
        let fill = "none"; //fill the gap between "now" and last data received
        let time_interval = this.current_feed.full_chart_time_interval;
        let group_by = this.current_feed.full_chart_group_period;
        let fun = this.current_feed.full_chart_data_function;
        let query_parameter = fun + "(\"" + this.current_feed.parameter + "\") as \"" + fun + "_" + this.current_feed.parameter + "\"";

        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.current_feed.object + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ")";
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
                    name: this.current_feed.parameter,
                    value: value[1]
                  }
                )
              })
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
        let fill = "none";
        let limit = 5;
        let time_interval = this.current_feed.small_chart_time_interval;
        let group_by = this.current_feed.small_chart_group_period;
        let fun = this.current_feed.small_chart_data_function;
        let query_parameter = fun + "(\"" + this.current_feed.parameter + "\") as \"" + fun + "_" + this.current_feed.parameter + "\"";

        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.current_feed.object + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ") LIMIT " + limit;
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
            this.small_chart_data = data_series;
          })
          .catch(error => {
            console.log(error)
          });
      },
      getLatestValue() {
        let fill = "none"; //fill the gap between "now" and last data received
        let limit = 1; // only 1 value
        let time_interval = this.current_feed.latest_value_calc_avg_period;
        let group_by = this.current_feed.latest_value_calc_group_period;
        let fun = this.current_feed.latest_value_data_function;
        let query_parameter = fun + "(\"" + this.current_feed.parameter + "\") as \"" + fun + "_" + this.current_feed.parameter + "\"";

        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.current_feed.object + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ") LIMIT " + limit;
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
          })
          .catch(error => {
            console.log(error)
          });
      },
      getNetAvgValue() {
        let fill = "none"; //fill the gap between "now" and last data received
        let limit = 1; // only 1 value
        let time_interval = this.current_feed.latest_value_calc_avg_period;
        let group_by = this.current_feed.latest_value_calc_group_period;
        let fun = this.current_feed.latest_value_data_function;
        let query_parameter = fun + "(\"" + this.current_feed.parameter_net_avg + "\") as \"" + fun + "_" + this.current_feed.parameter_net_avg + "\"";

        let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + this.current_feed.object_net_avg + "\" WHERE " + time_interval + " GROUP BY time(" + group_by + ") FILL(" + fill + ") LIMIT " + limit;
        Vue.axios
          .get(this.$store.getters.getInfluxServerAddress + "/query", {
            params: {
              epoch: "ms",
              q: influxql_query
            }
          })
          .then(response => {
            if (response.data.results[0].series) {
              let avg_multiplier = parseFloat(this.current_feed.math_net_avg_multiplier);
              this.average_network_value = (avg_multiplier * response.data.results[0].series[0].values[0][1]).toFixed(2);
            }
          })
          .catch(error => {
            console.log(error)
          });
      },
      refreshData() {
        this.getLatestValue();
        this.getNetAvgValue();
        this.getSmallChartData();
        this.getFullChartData();
      }
    },
    mounted: function () {
      this.setDefaultFeed();
    },
    computed: {
      card_color() {
        let fl_cv = parseFloat(this.current_value);
        let fl_anv = parseFloat(this.average_network_value);
        let color = "white";

        if ((fl_cv - 1.1 * fl_anv) * (fl_cv - 0.9 * fl_anv) <= 0) {
          color = "blue lighten-3"
        }
        if (fl_cv < 0.9 * fl_anv) {
          color = "green lighten-3"
        }
        if (fl_cv > 1.1 * fl_anv) {
          color = "yellow lighten-3"
        }
        if (fl_cv > 1.3 * fl_anv) {
          color = "red lighten-3"
        }
        return color;
      },
      current_locale() {
        return this.$store.getters.getLocale;
      }
    },
    filters: {
      decapitalize(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toLowerCase() + value.slice(1)
      }
    },
    watch: {
      current_locale: 'reloadFeedMeta',
      current_feed: 'refreshData'
    }
  }
</script>
