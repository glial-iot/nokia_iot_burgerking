<template>
  <div>
    <div v-if="!data_loaded" class="data-is-loading">
      <div class="spinner">
        <v-icon>fa fa-spinner fa-spin fa-3x</v-icon>
      </div>
    </div>
    <v-layout row wrap>
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
          let influxql_query = "SELECT " + query_parameter + " FROM \"bk\".\"autogen\".\"/burgerking" + feed.data_object + "\" WHERE "+this.config.time_interval+" GROUP BY time("+this.config.group_period+") FILL(none) LIMIT 1";
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
          });
          this.small_chart_data = this.energy_consumption_data;
          this.loadChart();
        });
      },
      loadChart() {
        if (this.chart){
          new Promise((resolve, reject) => {
            setTimeout(function() {
              resolve('disposed');
            }, 100);
            this.chart.dispose();
          }).then(()=>{
            this.drawPieChart()
          });
        }
        else {
          this.drawPieChart()
        }
      },
      drawPieChart() {
          this.chart = am4core.create("chartdiv", am4charts.PieChart);

          let pieSeries = this.chart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = "energy_consumption";
          pieSeries.dataFields.category = "equipment_category";

          pieSeries.radius = 105;

          pieSeries.ticks.template.disabled = true;
          pieSeries.alignLabels = false;
          pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
          pieSeries.labels.template.radius = am4core.percent(-50);
          pieSeries.labels.template.fill = am4core.color("white");

          this.chart.innerRadius = am4core.percent(20);

          pieSeries.slices.template.stroke = am4core.color("#fff");
          pieSeries.slices.template.strokeWidth = 2;
          pieSeries.slices.template.strokeOpacity = 1;
          pieSeries.slices.template.cursorOverStyle = [
            {
              "property": "cursor",
              "value": "pointer"
            }
          ];

          let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
          shadow.opacity = 0;

          let hoverState = pieSeries.slices.template.states.getKey("hover");

          let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
          hoverShadow.opacity = 0.7;
          hoverShadow.blur = 5;

          this.chart.legend = new am4charts.Legend();
          this.chart.legend.position = "top";
          this.chart.legend.fontSize = "12px";
          this.chart.legend.markers.template.disabled = false;
          this.chart.legend.markers.template.width = 10;
          this.chart.legend.markers.template.height = 10;

          this.chart.legend.itemContainers.template.paddingTop = 10;
          this.chart.legend.itemContainers.template.paddingBottom = 5;

          this.chart.data = this.small_chart_data;
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