<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column wrap>
      <v-flex d-flex md8 class="sunburst-manager-card relative_block">
        <h2 class="absolute_heading">{{$t('message.sunburst_chart_heading')}}</h2>
        <sunburst-chart-manager :config="chart_data.config" :data_feeds="chart_data.data_feeds"></sunburst-chart-manager>
      </v-flex>
      <v-flex d-flex md4 class="restaurant-manager-card relative_block">
        <h2 class="absolute_heading">{{$t('message.bar_chart_heading')}}</h2>
         <bar-chart-manager :config="chart_data.config" :data_feeds="chart_data.data_feeds"></bar-chart-manager>
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

  import BarChartManager from "../common/horizontal-bar-chart-restaurant-manager";
  import SunburstChartManager from "../common/sunburst-chart";

  Vue.use(VueAxios, Axios, Vue_i18n);

  const DATE_FORMAT = "DD MMM";

  export default {
    components: {
      BarChartManager,
      SunburstChartManager
    },
    data: () => ({}),
    methods: {},
    mounted: function () {
    },
    computed: {
      chart_data() {
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
      },
    }
  };
</script>
