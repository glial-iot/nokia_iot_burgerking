<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column wrap>
      <v-flex d-flex md11 class="restaurant-manager-card">
        <map-restaurant-manager :text="text" :config="map_data.config" :data_feeds="map_data.data_feeds"></map-restaurant-manager>
      </v-flex>
      <v-flex d-flex md1 class="footer-internal">
        <div class="caption text-center align-self-center">
          2018-2019 © Nokia IoT Laboratory, Moscow.   Powered by Nokia Glial™ and IMPACT™.   Version: {{frontend_version}}
        </div>
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
    data: () => ({
      frontend_version: VERSION,
    }),
    methods: {},
    mounted: function () {
    },
    computed: {
      text() {
        return [
          {
            svg_class: "roomBlueName",
            value: this.$i18n.t("message.staff_room")
          },
          {
            svg_class: "roomRedName",
            value: this.$i18n.t("message.kitchen_hall")
          },
          {
            svg_class: "roomMagentaName",
            value: this.$i18n.t("message.service")
          },
          {
            svg_class: "roomGreenName",
            value: this.$i18n.t("message.hall")
          },
          {
            svg_class: "roomPurpleName",
            value: this.$i18n.t("message.freezer")
          },
          {
            svg_class: "luminosityText",
            value: this.$i18n.t("message.luminosity")
          },
          {
            svg_class: "temperatureText",
            value: this.$i18n.t("message.temperature")
          },
          {
            svg_class: "humidityText",
            value: this.$i18n.t("message.humidity")
          },
          {
            svg_class: "CO2Text",
            value: this.$i18n.t("message.co2level")
          },
          {
            svg_class: "clientsText",
            value: this.$i18n.t("message.visitors")
          }
        ]
      },
      map_data() {
        return {
          config: {
            group_period: "1h",
            time_interval: "time > now() - 1h",
          },
          data_feeds: [
            {
              data_function: "mean",
              data_type: "temperature",
              data_description: this.$i18n.t("message.temperature"),
              measurement_unit: "°C",
              sensor_svg_id: "outsideTemp",
              data_object: "/raw/climate/AM-1/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "humidity",
              data_description: this.$i18n.t("message.humidity"),
              measurement_unit: "%",
              sensor_svg_id: "outsideHumidity",
              data_object: "/raw/climate/AM-1/",
              data_parameter: "RH"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              data_description: this.$i18n.t("message.temperature"),
              measurement_unit: "°C",
              sensor_svg_id: "kitchenTemp1",
              data_object: "/raw/climate/AM-2/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "humidity",
              data_description: this.$i18n.t("message.humidity"),
              measurement_unit: "%",
              sensor_svg_id: "kitchenHumidity1",
              data_object: "/raw/climate/AM-2/",
              data_parameter: "RH"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              data_description: this.$i18n.t("message.temperature"),
              measurement_unit: "°C",
              sensor_svg_id: "kitchenTemp2",
              data_object: "/raw/climate/AM-3/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "humidity",
              data_description: this.$i18n.t("message.humidity"),
              measurement_unit: "%",
              sensor_svg_id: "kitchenHumidity2",
              data_object: "/raw/climate/AM-3/",
              data_parameter: "RH"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              data_description: this.$i18n.t("message.temperature"),
              measurement_unit: "°C",
              sensor_svg_id: "hallCentralTemp",
              data_object: "/raw/climate/AM-4/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "humidity",
              data_description: this.$i18n.t("message.humidity"),
              measurement_unit: "%",
              sensor_svg_id: "hallCentralHumidity",
              data_object: "/raw/climate/AM-4/",
              data_parameter: "RH"
            },
            {
              data_function: "mean",
              data_type: "temperature",
              data_description: this.$i18n.t("message.temperature"),
              measurement_unit: "°C",
              sensor_svg_id: "hallNearWallTemp",
              data_object: "/raw/climate/AM-5/",
              data_parameter: "T"
            },
            {
              data_function: "mean",
              data_type: "humidity",
              data_description: this.$i18n.t("message.humidity"),
              measurement_unit: "%",
              sensor_svg_id: "hallNearWallHumidity",
              data_object: "/raw/climate/AM-5/",
              data_parameter: "RH"
            },
            {
              data_function: "max",
              data_type: "CO2",
              data_description: this.$i18n.t("message.co2level"),
              measurement_unit: "ppm",
              sensor_svg_id: "hallCO2",
              data_object: "/raw/climate/Air-2/",
              data_parameter: "CO2"
            },
            {
              data_function: "max",
              data_type: "CO2",
              data_description: this.$i18n.t("message.co2level"),
              measurement_unit: "ppm",
              sensor_svg_id: "kitchenCO2",
              data_object: "/raw/climate/Air-2/",
              data_parameter: "CO2"
            },
            {
              data_function: "sum",
              data_type: "clients",
              data_description: this.$i18n.t("message.visitors"),
              measurement_unit: this.$i18n.t("message.clients_short"),
              sensor_svg_id: "hallClients",
              data_object: "/raw/clients/",
              data_parameter: "in"
            },
            {
              data_function: "mean",
              data_type: "light",
              data_description: this.$i18n.t("message.luminosity"),
              measurement_unit: this.$i18n.t("message.lux"),
              sensor_svg_id: "hallLamp",
              data_object: "/raw/climate/I-1/",
              data_parameter: "Light"
            },
            {
              data_function: "mean",
              data_type: "light",
              data_description: this.$i18n.t("message.luminosity"),
              measurement_unit: this.$i18n.t("message.lux"),
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
