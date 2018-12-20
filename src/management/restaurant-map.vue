<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout row wrap>
      <v-flex d-flex md12 class="restaurant-manager-card">
        <map-restaurant-manager :text="text" :config="map_data.config" :data_feeds="map_data.data_feeds"></map-restaurant-manager>
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

  import MapRestaurantManager from "../common/map-restaurant-manager";

  Vue.use(VueAxios, Axios, Vue_i18n);

  const DATE_FORMAT = "DD MMM";

  export default {
    components: {
      MapRestaurantManager
    },
    data: () => ({}),
    methods: {},
    mounted: function () {
    },
    computed: {
      text() {
        return [
          {
            svg_id: "roomBlueName",
            value: this.$i18n.t("message.staff_room")
          },
          {
            svg_id: "roomRedName",
            value: this.$i18n.t("message.kitchen")
          },
          {
            svg_id: "roomMagentaName",
            value: this.$i18n.t("message.service")
          },
          {
            svg_id: "roomGreenName",
            value: this.$i18n.t("message.hall")
          },
          {
            svg_id: "roomPurpleName",
            value: this.$i18n.t("message.freezer")
          }
        ]
      },
      map_data() {
        return {
          config: {
            group_period: "24h",
            time_interval: "time > now() - 24h",
          },
          data_feeds: [
            {
              data_function: "mean",
              data_type: "temperature",
              measurement_unit: "℃",
              sensor_svg_id: "outsideTemp",
              data_object: "/raw/climate/AM-1/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              measurement_unit: "℃",
              sensor_svg_id: "kitchenTemp1",
              data_object: "/raw/climate/AM-2/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              measurement_unit: "℃",
              sensor_svg_id: "kitchenTemp2",
              data_object: "/raw/climate/AM-3/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              measurement_unit: "℃",
              sensor_svg_id: "hallCentralTemp",
              data_object: "/raw/climate/AM-5/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              measurement_unit: "℃",
              sensor_svg_id: "hallNearWallTemp",
              data_object: "/raw/climate/AM-4/",
              data_parameter: "T"
            },
            {
              data_function: "max",
              data_type: "humidity",
              measurement_unit: "%",
              sensor_svg_id: "hallAir",
              data_object: "/raw/climate/AM-5/",
              data_parameter: "RH"
            },
            {
              data_function: "max",
              data_type: "humidity",
              measurement_unit: "%",
              sensor_svg_id: "kitchenAir",
              data_object: "/raw/climate/AM-3/",
              data_parameter: "RH"
            },
            {
              data_function: "sum",
              data_type: "clients",
              measurement_unit: this.$i18n.t("message.clients_short"),
              sensor_svg_id: "hallClients",
              data_object: "/raw/clients/",
              data_parameter: "in"
            },
            {
              data_function: "mean",
              data_type: "energy",
              measurement_unit: this.$i18n.t("message.kilowatt_per_hour"),
              sensor_svg_id: "hallLamp",
              data_object: "/raw/climate/I-1/",
              data_parameter: "Light"
            },
            {
              data_function: "mean",
              data_type: "energy",
              measurement_unit: this.$i18n.t("message.kilowatt_per_hour"),
              sensor_svg_id: "kitchenLamp",
              data_object: "/raw/climate/I-2/",
              data_parameter: "Light"
            },
          ]
        }
      }
    }
  };
</script>
