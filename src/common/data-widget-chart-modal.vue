<template>
  <div>
    <v-dialog v-model="visible" persistent max-width="800px" overlay-hide style="z-index: 1">
      <v-card>
        <v-card-title>
          <div class="title text-xs-center">{{title | capitalize}}</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div ref="chartdiv" class="amChart"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="blue darken-1" @click="visible = false">{{$t("message.close")}}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    name: "data-widget-chart-modal",
    data: () => ({
      visible: false,
      title: "",
      chart: false
    }),
    props: ["chart_data"],
    methods: {
      show(title, data) {
        this.visible = true;
        this.title = title;
        this.chartData = data;
        this.drawChart();
      },
      drawChart() {

        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

        chart.paddingRight = 20;

        chart.data = this.chart_data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

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
    },
    watch: {
      visible: function (newValue) {
        if (newValue === false) {
          this.chart && this.chart.dispose()
        }
      },
    }
  }
</script>
