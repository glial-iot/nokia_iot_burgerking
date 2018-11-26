<template>
    <div>
        <v-layout row wrap>
            <v-flex d-flex md12>
                <v-card color="green lighten-3">
                    <div class="chart-background" style="z-index:0">
                        <bar-chart :data="chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                    </div>
                    <div class="widget-content">
                        <v-card-title primary class="title">
                            <v-menu bottom origin="center center" transition="scale-transition">
                                <div slot="activator" class="cursor-pointer"><v-icon>fa-cog</v-icon></div>
                                <v-list>
                                    <v-list-tile v-for="(item, i) in period_options" :key="i" @click="">
                                        <v-list-tile-title @click="setPeriod(i)">{{item}}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>
                            <div class="cursor-pointer" @click="showChart()"><v-icon >fa-chart-bar</v-icon></div>
                        </v-card-title>
                        <v-card-title primary class="d-block title text-center mt-0">
                            <span>{{title}} {{computed_period.toLowerCase()}}</span>
                        </v-card-title>
                        <v-card-text class="d-block text-center">
                            <span class="display-2">30</span><span class="display-1"> {{computed_measurement}}</span>
                        </v-card-text>
                        <v-card-title primary class="d-block title text-center mt-0">В среднем по сети: </v-card-title>
                        <v-card-text class="d-block text-center">
                            <span class="display-2">125</span><span class="display-1"> {{computed_measurement}}</span>
                        </v-card-text>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        <data-widget-chart-modal ref="chartModal"></data-widget-chart-modal>
    </div>
</template>

<script>
    import Vue from "vue";
    import Vue_i18n from 'vue-i18n';
    Vue.use(Vue_i18n);

    import BarChart from "./charts/BarChart"
    import DataWidgetChartModal from "./data-widget-chart-modal"

    export default {
        components: {
            BarChart,
            DataWidgetChartModal
        },
        name: "data-widget-text",
        props: ["type", "title", "value", "avg_net_value", "chartData", "averaged"],
        data: () => ({
            value_type: "average",
            average_method: "arithmetic_average",
            period: ""
        }),
        methods: {
            showChart() {
                this.$refs.chartModal.show(this.title, this.chartData);
            },
            setPeriod(option) {
                this.period = option;
            },
            setDefaultPeriod() {
                    if (this.type === "clients_per_period") {
                        this.period = "clients_per_day"
                    }
                    else if (this.type === "consumption_per_period") {
                        this.period = "per_day_kWh"
                    }
                    else if (this.type=== "consumption_per_client_and_area") {
                        this.period = "per_month_kWh_per_client"
                    }
                    else if (this.type === "consumption_per_area") {
                        this.period = "per_day_kWh_per_meter"
                    }
                    else if (this.type === "specific_consumption_per_area") {
                        this.period = "per_month_kWh"
                    }
            }
        },
        mounted: function () {
            this.setDefaultPeriod()
        },
        computed: {
            period_options() {
               if (this.$props.type === "clients_per_period") {
                   return {
                       "clients_per_day": this.$i18n.t("message.per_day"),
                       "clients_per_month": this.$i18n.t("message.per_month"),
                       "clients_per_day_per_meter": this.$i18n.t("message.per_day_per_meter"),
                       "clients_per_month_per_meter": this.$i18n.t("message.per_month_per_meter"),
                   }
               }
               else if (this.$props.type === "consumption_per_period") {
                   return {
                       "per_day_kWh": this.$i18n.t("message.per_day_kWh"),
                       "per_month_kWh": this.$i18n.t("message.per_month_kWh"),
                       "per_day_roubles": this.$i18n.t("message.per_day_roubles"),
                       "per_month_roubles": this.$i18n.t("message.per_month_roubles")
                   }
               }
               else if (this.$props.type === "consumption_per_client_and_area") {
                   return {
                       "per_month_kWh_per_client": this.$i18n.t("message.per_month_kWh_per_client"),
                       "per_month_kWh_per_meter": this.$i18n.t("message.per_month_kWh_per_meter"),
                       "per_month_roubles_per_client": this.$i18n.t("message.per_month_roubles_per_client"),
                       "per_month_roubles_per_meter": this.$i18n.t("message.per_month_roubles_per_meter")
                   }
               }
               else if (this.$props.type === "consumption_per_area") {
                   return {
                       "per_day_kWh_per_meter": this.$i18n.t("message.per_day_kWh_per_meter"),
                       "per_month_kWh_per_meter": this.$i18n.t("message.per_month_kWh_per_meter"),
                       "per_day_roubles_per_meter": this.$i18n.t("message.per_day_roubles_per_meter"),
                       "per_month_roubles_per_meter": this.$i18n.t("message.per_month_roubles_per_meter")
                   }
               }
               else if (this.$props.type === "specific_consumption_per_area") {
                   return {
                       "per_month_kWh": this.$i18n.t("message.per_month_kWh"),
                       "per_month_kWh_per_meter": this.$i18n.t("message.per_month_kWh_per_meter"),
                       "per_month_roubles": this.$i18n.t("message.per_month_roubles"),
                       "per_month_roubles_per_meter": this.$i18n.t("message.per_month_roubles_per_meter")
                   }
               }
            },
            measurement() {
                return {
                    "clients_per_day": this.$i18n.t("message.clients_short"),
                    "clients_per_month": this.$i18n.t("message.clients_short"),
                    "clients_per_day_per_meter": this.$i18n.t("message.clients_short"),
                    "clients_per_month_per_meter": this.$i18n.t("message.clients_short"),
                    "per_day_kWh": this.$i18n.t("message.kilowatt_per_hour"),
                    "per_month_kWh": this.$i18n.t("message.kilowatt_per_hour"),
                    "per_day_roubles": this.$i18n.t("message.roubles_short"),
                    "per_month_roubles": this.$i18n.t("message.roubles_short"),
                    "per_month_kWh_per_client": this.$i18n.t("message.kWh_per_client"),
                    "per_month_kWh_per_meter": this.$i18n.t("message.kWh_per_meter"),
                    "per_month_roubles_per_client": this.$i18n.t("message.roubles_per_client"),
                    "per_month_roubles_per_meter": this.$i18n.t("message.roubles_per_meter"),
                    "per_day_kWh_per_meter": this.$i18n.t("message.kWh_per_meter"),
                    "per_day_roubles_per_meter": this.$i18n.t("message.roubles_per_meter"),
                }
            },
            computed_measurement(){
                return this.measurement[this.period]
            },
            computed_period() {
                return this.period_options[this.period];
            }
        }
    }
</script>

<style scoped>

</style>