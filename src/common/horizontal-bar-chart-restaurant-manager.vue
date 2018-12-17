<template>
  <div>
    <div v-if="!data_loaded" class="data-is-loading">
      <div class="spinner">
        <v-icon>fa fa-spinner fa-spin fa-3x</v-icon>
      </div>
    </div>
    <v-layout row fill-height>
      <v-flex d-flex md12>
        <v-card v-if="data_loaded" class="restaurant-card piechart-card">
          <div class="chart-background">
            <div id="chartdiv"></div>
          </div>
          <div class="widget-content">
            <v-card-title primary class="d-block title text-center mt-0">
              <span></span>
            </v-card-title>
          </div>
          <v-card-actions v-if="false" class="widget-actions">
            <v-spacer></v-spacer>
            <div class="cursor-pointer" @click="showChart()">
              <v-icon>fa-chart-bar</v-icon>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Vue from "vue";
  import Vuex from "vuex";
  import Vue_i18n from 'vue-i18n';

  Vue.use(Vuex, Vue_i18n);

  import BarChart from "./charts/BarChart"
  import DataWidgetChartModal from "./data-widget-chart-modal"

  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    components: {
      BarChart,
      DataWidgetChartModal
    },
    name: "data-widget-text",
    props: ["type", "title", "config", "data_feeds"],
    data: () => ({
      energy_consumption_data: [],
      full_chart_data: [],
      small_chart_data: [],
      total_value: 0,
      average_method: "arithmetic_average",
      current_feed: {
        measurement: {}
      },
      current_feed_index: 0,
      data_loaded: true,
    }),
    methods: {
      getLatestValues() {
        this.energy_consumption_data = [];
        let fun = this.config.data_function;
        let axios_requests = [];
        this.data_feeds.forEach((feed) => {
          let query_parameter = fun + "(\"" + feed.data_parameter + "\") as \"" + fun + "_" + feed.data_parameter + "\"";
          let influxql_query = "SELECT " + query_parameter + " FROM \"bk_metrics\".\"autogen\".\"/burgerking" + feed.data_object + "\" WHERE " + this.config.time_interval + " GROUP BY time(" + this.config.group_period + ") FILL(none) LIMIT 1";
          console.log(influxql_query);
          axios_requests.push(Vue.axios
            .get(this.$store.getters.getInfluxServerAddress + "/query", {
              params: {
                epoch: "ms",
                q: influxql_query
              }
            }));
        });
        Vue.axios.all(axios_requests).then((results) => {
          results.forEach((response) => {
            if (response.data.results[0].series) {
              let value = response.data.results[0].series[0].values[0][1].toFixed(2);
              let data_object = response.data.results[0].series[0].name;
              this.data_feeds.forEach((feed) => {
                if (data_object.indexOf(feed.data_object) !== -1) {
                  if (data_object.indexOf("All") === -1) {
                    this.energy_consumption_data.push({
                      "equipment_category": feed.equipment_name,
                      "energy_consumption": value
                    });
                  }
                  else {
                    this.total_value = value;
                  }
                }
              })
            }
            else {
              console.log("No data form influx. Data object: "+ response.data.results[0].series[0].name)
            }
          });
          this.small_chart_data = this.energy_consumption_data;
          this.loadChart();
        });
      },
      loadChart() {
        if (this.chart) {
          new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve('disposed');
            }, 100);
            this.chart.dispose();
          }).then(() => {
            this.drawPieChart()
          });
        }
        else {
          this.drawPieChart()
        }
      },
      drawPieChart() {

        am4core.useTheme(am4themes_animated);

        this.chart = am4core.create("chartdiv", am4charts.XYChart);
        let chart = this.chart;

        chart.hiddenState.properties.opacity = 0;

        //Convert data to this dataSeries requirements
        let temp_data = [{}];
        this.small_chart_data.forEach((element, index) => {
          temp_data[0]["value" + index] = element.energy_consumption;
        });
        chart.data = temp_data;

        chart.colors.step = 2;
        chart.height = 500;
        chart.padding(30, 30, 10, 30);
        chart.legend = new am4charts.Legend();

        chart.legend.marginTop = 150;

        chart.legend.markers.template.width = 30;
        chart.legend.markers.template.height = 30;
        chart.legend.markers.template.marginRight = 20;

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        valueAxis.calculateTotals = true;
        valueAxis.renderer.minWidth = 50;

        //Remove all grid and axes
        categoryAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.labels.template.disabled = true;
        categoryAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;
        categoryAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.baseGrid.disabled = true;

        //For each equipment data we create ColumnSeries object, taking name from original data and value from adapted data array.
        this.small_chart_data.forEach((element, index) => {
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.columns.template.tooltipText =
            "{name}: {valueX.totalPercent.formatNumber('#.00')}%";
          series.name = element.equipment_category;
          series.dataFields.categoryY = "category";
          series.dataFields.valueX = "value" + index;
          series.dataFields.valueXShow = "totalPercent";
          series.stacked = true;
          series.tooltip.pointerOrientation = "horizontal";

          let bullet = series.bullets.push(new am4charts.LabelBullet());
          bullet.label.text = "{valueX.totalPercent.formatNumber('#.00')}%";
          bullet.label.fill = am4core.color("#ffffff");
          bullet.locationX = 0.5;
        });

      }
    },
    mounted: function () {
      this.getLatestValues();
    }
    ,
    computed: {
      current_locale() {
        return this.$store.getters.getLocale;
      }
    },
    filters: {
      decapitalize(value) {
        if (!value) return '';
        value = value.toString()
        return value.charAt(0).toLowerCase() + value.slice(1)
      }
    },
    watch: {
      current_locale: 'getLatestValues',
    }
  }
</script>
pie-chart-restaurant-manager.vue