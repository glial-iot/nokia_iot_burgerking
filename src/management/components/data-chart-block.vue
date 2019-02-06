<template>
  <v-flex d-flex md4 class="block_content_row">
    <v-layout row wrap>

      <v-flex d-flex md8 class="block_content_left">
        <v-card color="yellow lighten-3">
        <v-layout row wrap class="block_content_left_row">
          <v-flex md6 class="data_meta_info">
            <p>{{block.text}}</p>
          </v-flex>
          <v-flex md6 class="data_value">
            <p>{{block.value}} {{block.value_metering}}</p>
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
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    name: "data-widget-chart-modal",
    data: () => ({
      title: "",
      chart: false
    }),
    props: ["block", "chart_data"],
    mounted () {
        this.drawChart();
    },
    methods: {
      drawChart() {

        let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

        chart.data = this.chart_data;
        chart.paddingLeft = -20;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

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