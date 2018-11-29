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
                                    <v-list-tile v-for="feed in data_feeds" @click="">
                                        <v-list-tile-title @click="setCurrentFeed(feed)">{{feed.measurement.literal}}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>
                            <div class="cursor-pointer" @click="showChart()"><v-icon >fa-chart-bar</v-icon></div>
                        </v-card-title>
                        <v-card-title primary class="d-block title text-center mt-0">
                            <span>{{title}} {{current_feed.measurement.literal | decapitalize}}</span>
                        </v-card-title>
                        <v-card-text class="d-block text-center">
                            <span class="display-2">{{current_value}}</span><span class="display-1"> {{current_feed.measurement.short}}</span>
                        </v-card-text>
                        <v-card-title primary class="d-block title text-center mt-0">{{$t("message.network_average")}}: </v-card-title>
                        <v-card-text class="d-block text-center">
                            <span class="display-2">{{average_network_value}}</span><span class="display-1"> {{current_feed.measurement.short}}</span>
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
        props: ["type", "title", "data_feeds"],
        data: () => ({
            small_chart_data: [],
            full_chart_data: [],
            current_value: "",
            average_network_value: "",
            average_method: "arithmetic_average",
            current_feed: {
                measurement: {}
            }
        }),
        methods: {
            showChart() {
                let chart_title = this.title + " " + this.$options.filters.decapitalize(this.current_feed.measurement.literal);
                this.$refs.chartModal.show(chart_title, this.small_chart_data);
            },
            setDefaultFeed() {
                this.current_feed = this.data_feeds[0];
            },
            setCurrentFeed(feed) {
                this.current_feed = feed;
            },
            getFullChartData() {
                let data_series = [];
                let fill = "none"; //fill the gap between "now" and last data received
                let time_interval = "time > now() - 24h";
                let group_by = "1h"; // group by 1 hour
                let query_parameter = this.current_feed.parameter;
                if (this.average_method === "arithmetic_average"){
                    query_parameter = "mean(\""+this.current_feed.parameter+"\") as \"Mean_"+this.current_feed.parameter+"\"";
                }
                if (this.average_method === "median"){
                    query_parameter = "median(\""+this.current_feed.parameter+"\")";
                }
                let influxql_query = "SELECT "+query_parameter+" FROM \"bk\".\"autogen\".\"/burgerking"+this.current_feed.object+"\" WHERE "+time_interval+" GROUP BY time("+group_by+") FILL("+fill+")";
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
                                        name: this.current_feed.parameter,
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
                let query_parameter = this.current_feed.parameter;
                if (this.average_method === "arithmetic_average"){
                    query_parameter = "mean(\""+this.current_feed.parameter+"\") as \"Mean_"+this.current_feed.parameter+"\"";
                }
                if (this.average_method === "median"){
                    query_parameter = "median(\""+this.current_feed.parameter+"\")";
                }
                let influxql_query = "SELECT "+query_parameter+" FROM \"bk\".\"autogen\".\"/burgerking"+this.current_feed.object+"\" WHERE "+time_interval+" GROUP BY time("+group_by+") FILL("+fill+") LIMIT "+limit;
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
                let query_parameter = this.current_feed.parameter;
                if (this.average_method === "arithmetic_average"){
                    query_parameter = "mean(\""+this.current_feed.parameter+"\") as \"Mean_"+this.current_feed.parameter+"\"";
                }
                if (this.average_method === "median"){
                    query_parameter = "median(\""+this.current_feed.parameter+"\") as \"Median"+this.current_feed.parameter+"\"";
                }
                let influxql_query = "SELECT "+query_parameter+" FROM \"bk\".\"autogen\".\"/burgerking"+this.current_feed.object+"\" WHERE "+time_interval+" GROUP BY time("+group_by+") FILL("+fill+") LIMIT "+limit;
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
            this.setDefaultFeed();
            this.refreshData();
        },
        computed: {
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
            current_feed: 'refreshData'
        }
    }
</script>