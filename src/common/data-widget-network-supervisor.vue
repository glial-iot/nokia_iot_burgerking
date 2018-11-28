<template>
    <div>
        <v-layout row wrap>
            <v-flex d-flex md12>
                <v-card color="green lighten-3">
                    <div class="chart-background" style="z-index:0">
                        <bar-chart :data="chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                    </div>
                    <div class="widget-content">
                        <v-card-title primary class="title" >
                            <v-menu v-if="averaged === true" bottom origin="center center" transition="scale-transition">
                                <div slot="activator" class="cursor-pointer"><v-icon>fa-cog</v-icon></div>
                                <v-list>
                                    <v-list-tile v-for="(item, i) in average_method_options" :key="i" @click="">
                                        <v-list-tile-title @click="setAvgOption(i)">{{item}}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>
                            <div class="cursor-pointer" @click="showChart()"><v-icon >fa-chart-bar</v-icon></div>
                        </v-card-title>
                        <v-card-title primary class="d-block title text-center mt-0">
                            <span v-if="averaged === true">{{concat_title}}</span>
                            <span class="text-capitalize" v-else>{{title}}</span>
                        </v-card-title>
                        <v-card-text v-if="average_method == 'arithmetic_average'" class="d-block text-center">
                            <span class="display-2">20</span> <span class="display-1">{{measurement}}</span>
                        </v-card-text>
                        <v-card-text v-if="average_method == 'median'" class="d-block text-center">
                            <span class="display-2">30</span> <span class="display-1">{{measurement}}</span>
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
        props: ["type", "title", "value", "measurement", "avg_net_value", "chartData", "averaged"],
        data: () => ({
            value_type: "average",
            average_method: "arithmetic_average",
        }),
        methods: {
            showChart() {
                let chart_title = this.$props.averaged ? this.concat_title() : this.title;
                this.$refs.chartModal.show(this.title, this.chartData);
            },
            setAvgOption(option) {
                this.average_method = option;
                console.log(this.average_method)
            }
        },
        computed: {
            average_method_options() {
               return {
                   "arithmetic_average": this.$i18n.t("message.arithmetic_average"),
                   "median": this.$i18n.t("message.median")
               }
            },
            concat_title() {
                return this.average_method_options[this.average_method]+" "+this.title;
            }
        }
    }
</script>

<style scoped>

</style>