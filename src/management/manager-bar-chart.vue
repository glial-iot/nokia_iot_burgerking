<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout row wrap>
      <v-flex d-flex md12 class="restaurant-manager-card">
        <bar-chart-manager :config="bar_chart_data.config" :data_feeds="bar_chart_data.data_feeds"></bar-chart-manager>
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

  Vue.use(VueAxios, Axios, Vue_i18n);

  const DATE_FORMAT = "DD MMM";

  export default {
    components: {
      BarChartManager
    },
    data: () => ({}),
    methods: {},
    mounted: function () {
    },
    computed: {
      bar_chart_data() {
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
