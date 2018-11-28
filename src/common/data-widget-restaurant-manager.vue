<template>
    <div>
        <v-layout row wrap>
            <v-flex d-flex md12>
                <v-card :color="card_color">
                    <div class="chart-background" style="z-index:0">
                        <bar-chart :data="small_chart_data" :hideAxis="true" :isDashboard="true"></bar-chart>
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
                            <span>{{title}} {{computed_period | decapitalize}}</span>
                        </v-card-title>
                        <v-card-text class="d-block text-center">
                            <span class="display-2">{{current_value}}</span><span class="display-1"> {{computed_measurement}}</span>
                        </v-card-text>
                        <v-card-title primary class="d-block title text-center mt-0">{{$t("message.network_average")}}: </v-card-title>
                        <v-card-text class="d-block text-center">
                            <span class="display-2">{{average_network_value}}</span><span class="display-1"> {{computed_measurement}}</span>
                        </v-card-text>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        <data-widget-chart-modal ref="chartModal" :chart_data="full_chart_data"></data-widget-chart-modal>
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
        props: ["type", "title", "parameter", "data_object", "value", "avg_net_value", "chartData", "averaged"],
        data: () => ({
            small_chart_data: [],
            full_chart_data: [],
            current_value: "",
            average_network_value: "",
            average_method: "arithmetic_average",
            period: ""
        }),
        methods: {
            showChart() {
                let chart_title = this.title + " " + this.$options.filters.decapitalize(this.computed_period);
                this.$refs.chartModal.show(chart_title, this.chartData);
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
            },
            getFullChartData() {
                let data_series = [];
                let fill = "none"; //fill the gap between "now" and last data received
                let time_interval = "time > now() - 24h";
                let group_by = "1h"; // group by 1 hour
                let query_parameter = this.parameter;
                if (this.average_method === "arithmetic_average"){
                    query_parameter = "mean(\""+this.parameter+"\") as \"Mean_"+this.parameter+"\"";
                }
                if (this.average_method === "median"){
                    query_parameter = "median(\""+this.parameter+"\")";
                }
                let influxql_query = "SELECT "+query_parameter+" FROM \"bk\".\"autogen\".\"/burgerking"+this.data_object+"\" WHERE "+time_interval+" GROUP BY time("+group_by+") FILL("+fill+")";
                Vue.axios
                    .get(this.$store.getters.getInfluxServerAddress + "/query", {
                        params: {
                            epoch: "ms",
                            q: influxql_query
                        }
                    })
                    .then(response => {
                        if (response.data.results[0].series) {
                            response.data.results[0].series[0].values.map((value) => {
                                data_series.push(
                                    {
                                        date: new Date(value[0]),
                                        name: this.parameter,
                                        value: value[1]
                                    }
                                )
                            })
                        }
                        this.full_chart_data = data_series;
                    })
                    .catch(error => {console.log(error)});
            },
            getSmallChartData() {
                let data_series = [];
                let fill = "none"; //fill the gap between "now" and last data received
                let limit = 5; // only 5 values
                let time_interval = "time > now() - "+limit+"d"; //last 5 days
                let group_by = "1d"; // group by 1 day
                let query_parameter = this.parameter;
                if (this.average_method === "arithmetic_average"){
                    query_parameter = "mean(\""+this.parameter+"\") as \"Mean_"+this.parameter+"\"";
                }
                if (this.average_method === "median"){
                    query_parameter = "median(\""+this.parameter+"\")";
                }
                let influxql_query = "SELECT "+query_parameter+" FROM \"bk\".\"autogen\".\"/burgerking"+this.data_object+"\" WHERE "+time_interval+" GROUP BY time("+group_by+") FILL("+fill+") LIMIT "+limit;
                Vue.axios
                    .get(this.$store.getters.getInfluxServerAddress + "/query", {
                        params: {
                            epoch: "ms",
                            q: influxql_query
                        }
                    })
                    .then(response => {
                        if (response.data.results[0].series) {
                            response.data.results[0].series[0].values.map((value) => {
                                data_series.push(
                                    {
                                        title: new Date(value[0]),
                                        value: value[1]
                                    }
                                )
                            })
                        }
                        this.small_chart_data = data_series;
                    })
                    .catch(error => {console.log(error)});
            },
            getLatestValue() {
                let fill = "none"; //fill the gap between "now" and last data received
                let limit = 1; // only 1 value
                let time_interval = "time > now() - 5h AND time < now() - 3h"; //last 5 days
                let group_by = "2h"; // group by 2 hours
                let query_parameter = this.parameter;
                if (this.average_method === "arithmetic_average"){
                    query_parameter = "mean(\""+this.parameter+"\") as \"Mean_"+this.parameter+"\"";
                }
                if (this.average_method === "median"){
                    query_parameter = "median(\""+this.parameter+"\") as \"Median"+this.parameter+"\"";
                }
                let influxql_query = "SELECT "+query_parameter+" FROM \"bk\".\"autogen\".\"/burgerking"+this.data_object+"\" WHERE "+time_interval+" GROUP BY time("+group_by+") FILL("+fill+") LIMIT "+limit;
                Vue.axios
                    .get(this.$store.getters.getInfluxServerAddress + "/query", {
                        params: {
                            epoch: "ms",
                            q: influxql_query
                        }
                    })
                    .then(response => {
                        if (response.data.results[0].series) {
                            this.current_value = response.data.results[0].series[0].values[0][1].toFixed(2);
                            this.average_network_value = Math.random() >= 0.5 ?
                                (parseFloat(this.current_value) + (this.current_value * (Math.random() * 0.4))).toFixed(2) :
                                (parseFloat(this.current_value) - (this.current_value * (Math.random() * 0.4))).toFixed(2)
                        }
                    })
                    .catch(error => {console.log(error)});
            },
            refreshData() {
                this.getLatestValue();
                this.getSmallChartData();
                this.getFullChartData();
            }
        },
        mounted: function () {
            this.setDefaultPeriod();
            this.refreshData();
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
            },
            card_color() {
                let fl_cv = parseFloat(this.current_value);
                let fl_anv = parseFloat(this.average_network_value);
                let color = "white";

                if ((fl_cv - 1.1*fl_anv )*(fl_cv - 0.9*fl_anv ) <= 0){
                    color = "blue lighten-3"
                }
                if (fl_cv < 0.9*fl_anv){
                    console.log(0.9);
                    color = "green lighten-3"
                }
                if (fl_cv > 1.1*fl_anv){
                    console.log(1.1);
                    color = "yellow lighten-3"
                }
                if (fl_cv > 1.3*fl_anv){
                    console.log(1.3);
                    color = "red lighten-3"
                }
                return color;
            }
        },
        filters: {
            decapitalize (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toLowerCase() + value.slice(1)
            }
        },
        watch: {
            period: 'refreshData'
        }
    }
</script>

<style scoped>

</style>