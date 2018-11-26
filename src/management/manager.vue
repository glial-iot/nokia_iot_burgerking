<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column>
         <v-flex d-flex md6>
            <v-flex d-flex md3>
               <data-widget-manager :chartData="sampleChartData" :type="'clients_per_period'"
                                 :title="'Количество клиентов²'"></data-widget-manager>
            </v-flex>
            <v-flex d-flex md3>
               <data-widget-manager :chartData="sampleChartData" :type="'consumption_per_period'"
                                 :title="'Потребление ресторана'"></data-widget-manager>
            </v-flex>
            <v-flex d-flex md3>
               <data-widget-manager :chartData="sampleChartData" :type="'consumption_per_client_and_area'"
                                 :title="'Потребление ресторана'"></data-widget-manager>
            </v-flex>
            <v-flex d-flex md3>
               <data-widget-manager :chartData="sampleChartData" :type="'consumption_per_area'"
                                 :title="'Потребление ресторана в нерабочие часы'"></data-widget-manager>
            </v-flex>
         </v-flex>
         <v-flex d-flex md6>
            <v-layout row wrap>
               <v-flex d-flex md3>
                  <data-widget-manager :chartData="sampleChartData" :type="'specific_consumption_per_area'"
                                    :title="'Потребление освещением'"></data-widget-manager>
               </v-flex>
               <v-flex d-flex md3>
                  <data-widget-manager :chartData="sampleChartData" :type="'specific_consumption_per_area'"
                                    :title="'Потребление кухней'"></data-widget-manager>
               </v-flex>
               <v-flex d-flex md3>
                  <data-widget-manager :chartData="sampleChartData" :type="'specific_consumption_per_area'"
                                    :title="'Потребление подготовкой воздуха'"></data-widget-manager>
               </v-flex>
               <v-flex d-flex md3>
                  <data-widget-manager :chartData="sampleChartData" :type="'specific_consumption_per_area'"
                                    :title="'Потребление остальным'"></data-widget-manager>
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
    import Vue_i18n from 'vue-i18n';
    import "moment/locale/ru";

    import DataWidgetManager from "../common/data-widget-restaurant-manager";

    Vue.use(VueAxios, Axios, Vue_i18n);

    const DATE_FORMAT = "DD MMM";

    export default {
        components: {
            DataWidgetManager
        },
        data: () => ({
            sampleChartData: [
                { title: "Период 1", value: 1 },
                { title: "Период 2", value: 1 },
                { title: "Период 3", value: 4 },
                { title: "Период 4", value: 3 },
                { title: "Период 5", value: 2}
            ]
        }),
        methods: {

        },
        mounted: function () {

        },
        computed: {

        }
    };
</script>
