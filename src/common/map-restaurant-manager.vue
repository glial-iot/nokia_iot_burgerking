<template>
  <div>
    <div v-if="!data_loaded" class="data-is-loading">
      <div class="spinner">
        <v-icon>fa fa-spinner fa-spin fa-3x</v-icon>
      </div>
    </div>
    <v-layout row fill-height>
      <v-flex d-flex md12>
        <v-card v-if="data_loaded" class="restaurant-card piechart-card">
          <object data="/src/assets/bk_plan_ids.svg" type="image/svg+xml" id="svgMap" width="100%" height="100%"></object>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Vue from "vue";
  import Vuex from "vuex";
  import Vue_i18n from 'vue-i18n';

  Vue.use(Vuex, Vue_i18n);

  export default {
    name: "restaurant-map",
    props: ["type", "title", "config", "data_feeds", "text"],
    data: () => ({
      svg_data: [],
      average_method: "arithmetic_average",
      data_loaded: true,
    }),
    methods: {
      getLatestValues() {
        this.svg_data = [];
        let axios_requests = [];

        let svgDiv = document.getElementById("svgMap");
        let svgData= svgDiv.getSVGDocument();

        let fill_svg_with_data = () => {
          this.text.forEach((el) => {
            let containers = svgDiv.getSVGDocument().getElementsByClassName(el.svg_class);
            Array.from(containers).forEach((container) => {
              let textNode = container.childNodes[0];
              textNode.nodeValue = el.value;
            });
          });
          this.svg_data.forEach((el) => {
            let container = svgDiv.getSVGDocument().getElementById(el.sensor_svg_id);
            console.log(el.sensor_svg_id);
            let textNode = container.childNodes[0];
            textNode.nodeValue = el.data_description+": "+el.value + " " +  el.measurement_unit;
          });
        };

        this.data_feeds.forEach((feed) => {
          let fun = feed.data_function;
          let query_parameter = fun + "(\"" + feed.data_parameter + "\") as \"" + fun + "_" + feed.data_parameter + "\"";
          let influxql_query = "SELECT " + query_parameter + " FROM \"bk_raw\".\"autogen\".\"/burgerking" + feed.data_object + "\" WHERE " + this.config.time_interval + " GROUP BY time(" + this.config.group_period + ") FILL(none) LIMIT 1";
          axios_requests.push(Vue.axios
            .get(this.$store.getters.getInfluxServerAddress + "/query", {
              params: {
                epoch: "ms",
                q: influxql_query
              }
            }));
        });

        Vue.axios.all(axios_requests).then((results) => {
          results.forEach((response) => {
            if (response.data.results[0].series) {
              let value = response.data.results[0].series[0].values[0][1].toFixed(2);
              let data_object = response.data.results[0].series[0].name;
              let data_parameter = response.data.results[0].series[0].columns[1];
                this.data_feeds.forEach((feed) => {
                if (data_object.indexOf(feed.data_object) !== -1 && data_parameter === feed.data_function +"_" +feed.data_parameter) {
                  this.svg_data.push({
                      "data_type": feed.data_type,
                      "data_description": feed.data_description,
                      "measurement_unit": feed.measurement_unit,
                      "sensor_svg_id": feed.sensor_svg_id,
                      "value": feed.data_type === "clients" ? Math.round(value) : value
                    });
                }
              })
            }
            else {
              console.log("No data form influx.")
              console.log(response);
            }
          });
          if (svgData == null) {
            svgDiv.onload = () => {
              fill_svg_with_data()
            }
          } else {
            fill_svg_with_data()
          }
        });
      },
    },
    mounted: function () {
      this.getLatestValues();
    },
    computed: {
      current_locale() {
        return this.$store.getters.getLocale;
      }
    },
    watch: {
      current_locale: 'getLatestValues',
    }
  }
</script>
