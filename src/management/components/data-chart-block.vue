<template>
  <v-flex d-flex md4 class="block_content_row">
    <v-layout row wrap>

      <v-flex d-flex md8 class="block_content_left">
        <v-card color="yellow lighten-3">
        <v-layout  row wrap class="block_content_left_row">
          <v-flex v-if="data_loaded" md6 class="data_meta_info">
            <p>{{block.text}}</p>
          </v-flex>
          <v-flex v-if="data_loaded" md6 class="data_value">
            <p>{{current_value}} {{block.value_metering}}</p>
          </v-flex>
        </v-layout>
        </v-card>
      </v-flex>

      <v-flex d-flex md4 class="block_content_right">
        <v-card class="amChart_container" color="yellow lighten-3">
        <div ref="chartdiv" class="small_amChart"></div>
        </v-card>
      </v-flex>

    </v-layout>
  </v-flex>
</template>

<script>
  import Vue from "vue";
  import Vue_i18n from 'vue-i18n';
  import Axios from "axios";
  import VueAxios from "vue-axios";

  Vue.use(Vue_i18n, VueAxios, Axios);

  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    name: "data-widget-chart-modal",
    data: () => ({
      title: "",
      data_loaded: false,
      chart: false,
      small_chart_data: [],
      current_value: 0
    }),
    props: ["block", "chart_data", "current_feed"],
    mounted () {
      this.getLatestValue();
      this.getSmallChartData();
    },
    methods: {
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
                    date: new Date(value[0]),
                    value: value[1]
                  }
                )
              })
            }
            else {
              console.log("No data form influx. Query: "+ influxql_query)
            }
            this.small_chart_data = data_series;
            this.drawChart();
            this.data_loaded = true;
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
              let initial_value = response.data.results[0].series[0].values[0][1]
              this.current_value = this.current_feed.round_to_whole ? Math.round(initial_value) : initial_value.toFixed(2);
            }
            else {
              console.log("No data form influx. Query: "+ influxql_query)
            }
          })
          .catch(error => {
            console.log(error)
          });
      },
      drawChart() {

        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

        chart.data = this.small_chart_data;
        chart.paddingLeft = -20;
        chart.paddingBottom = 50;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.ticks.template.disabled = true;
        dateAxis.renderer.labels.template.disabled = true;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.fillOpacity = 0;
        series.strokeWidth = 4;

        series.tooltipText = "{valueY.value}";

        this.chart = chart;

      }
    },
    beforeDestroy() {
      this.chart && this.chart.dispose()
    },
    filters: {
      capitalize(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>