<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column>
      <v-flex d-flex md7>
        <v-layout row wrap>
          <v-flex d-flex md5>
            <v-layout row wrap>
              <v-flex d-flex md12>
                <v-card>
                  <l-map :zoom="map.zoom" style="z-index: 5" :center="map.center">
                    <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                    <template v-for="restaurant in restaurants">
                      <l-marker :lat-lng="restaurant.coordinates" @click="map_marker_click"
                                v-bind:key="restaurant.name"
                                :icon="get_marker_icon(restaurant.selected)"></l-marker>
                    </template>
                  </l-map>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md7>
            <v-layout row wrap>
              <v-flex d-flex md12>
                <v-layout column="">
                  <v-flex d-flex md12 class="table-block">
                    <restaurants-table ref="restaurantsTable" @restaurant_row_clicked="table_click"
                                       :data="restaurants"></restaurants-table>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md5>
        <v-layout row wrap>
          <v-flex d-flex md3>
            <data-widget-text :averaged="true" :id="1" parameter="RH" data_object="/ambience/AM-1/"
                              :title="$t('message.network_consumption_per_m2')"
                              :measurement="$t('message.kWh_per_meter')"></data-widget-text>
          </v-flex>
          <v-flex d-flex md3>
            <data-widget-text :averaged="true" :id="2" parameter="DP" data_object="/ambience/AM-1/"
                              :title="$t('message.network_consumption_per_client')"
                              :measurement="$t('message.kWh_per_client')"></data-widget-text>
          </v-flex>
          <v-flex d-flex md3>
            <data-widget-text :averaged="true" :id="3" parameter="WVP" data_object="/ambience/AM-1/"
                              :title="$t('message.network_consumption_per_month')"
                              :measurement="$t('message.kilowatt_per_hour')"></data-widget-text>
          </v-flex>
          <v-flex d-flex md3>
            <data-widget-text :averaged="false" :id="4" parameter="WBT" data_object="/ambience/AM-1/"
                              :title="$t('message.minimal_network_consumption_per_client')"
                              :measurement="$t('message.kWh_per_client')"></data-widget-text>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import Axios from "axios";
  import VueAxios from "vue-axios";
  import moment from "moment";
  import Vue_i18n from 'vue-i18n';
  import "moment/locale/ru";

  Vue.use(VueAxios, Axios, Vue_i18n);

  import {LMap, LTileLayer, LPopup, LMarker} from "vue2-leaflet";

  import DonutChart from "./../common/charts/DonutChart";
  import BarChart from "./../common/charts/BarChart";
  import DataWidgetText from "../common/data-widget-network-supervisor";

  import table from "./components/table.vue";

  const DATE_FORMAT = "DD MMM";

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      restaurantsTable: table,
      DonutChart,
      DataWidgetText,
      BarChart
    },
    data: () => ({
      map: {
        zoom: 13,
        center: L.latLng(55.57748493, 37.59711026),
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a  href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      restaurant: {},
      sampleChartData: [
        {title: "Период 1", value: 1},
        {title: "Период 2", value: 1},
        {title: "Период 3", value: 4},
        {title: "Период 4", value: 3},
        {title: "Период 5", value: 2}
      ],
    }),
    methods: {
      table_click(item) {
        this.restaurants.forEach(restaurant => {
          restaurant.selected = false;
        });
        item.selected = true;

        this.restaurant = item;

        this.map.center = L.latLng(
          item.coordinates.lat,
          item.coordinates.lng
        );
        this.map.zoom = 17;
      },
      get_marker_icon(selected) {
        const url = selected
          ? require("../assets/marker-active.svg")
          : require("../assets/marker.svg");

        return L.icon({
          iconUrl: url,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });
      },
      map_marker_click(event) {
        let restaurant;
        for (let index = 0; index < this.restaurants.length; index++) {
          this.restaurants[index].selected = false;
          if (
            event.latlng.lat == this.restaurants[index].coordinates.lat &&
            event.latlng.lng == this.restaurants[index].coordinates.lng
          ) {
            restaurant = this.restaurants[index];

            restaurant.selected = true;
            this.restaurant = restaurant;
            this.map.center = L.latLng(0, 0);
            this.map.center.lat = parseFloat(restaurant.coordinates.lat);
            this.map.center.lng = parseFloat(restaurant.coordinates.lng);
          }
        }
      },
    },
    mounted: function () {
      this.restaurant = this.restaurants[0];
    },
    computed: {
      restaurants() {
        return [
          {
            "coordinates": {
              "lat": "55.57748493",
              "lng": "37.59711026"
            },
            "address": "Burger King Restaurant Anino",
            "type": "restaurant",
            "energy_daily": 400,
            "energy_per_client": 1,
            "status": "open",
            "restaurant_page": "bk_anino_mkad",
            "rating": 4.8,
            "selected": false,
            "chartData": [
              {title: "Период 1", value: 3},
              {title: "Период 2", value: 1},
              {title: "Период 3", value: 3},
              {title: "Период 4", value: 6},
              {title: "Период 5", value: 2}
            ]

          },
          {
            "coordinates": {
              "lat": "55.57387818",
              "lng": "37.60957799"
            },
            "address": "Burger King Bitca",
            "type": "restaurant",
            "energy_daily": 300,
            "energy_per_client": 0.7,
            "status": "open",
            "restaurant_page": "bk_bitca_rynok",
            "rating": 3.4,
            "selected": false,
            "chartData": [
              {title: "Период 1", value: 1},
              {title: "Период 2", value: 1},
              {title: "Период 3", value: 4},
              {title: "Период 4", value: 3},
              {title: "Период 5", value: 2}
            ]
          }
        ]
      }
    }
  };
</script>
