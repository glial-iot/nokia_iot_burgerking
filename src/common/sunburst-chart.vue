<template>
  <sunburst :data="tree" :min-angle-displayed="0">

    <template slot-scope="{ nodes, actions }">
      <highlightOnHover :nodes="nodes" :actions="actions" />
      <zoomOnClick :nodes="nodes" :actions="actions" />
    </template>

    <nodeInfoDisplayer slot="top" slot-scope="{ nodes }" :current="nodes.mouseOver" :root="nodes.root" description="% energy" />
    <breadcrumbTrail slot="legend" slot-scope="{ nodes, colorGetter, width }" :current="nodes.mouseOver" :root="nodes.root" :colorGetter="colorGetter" :from="nodes.clicked" :width="width" />

  </sunburst>
</template>

<script>
  import Vue from "vue";
  import Vuex from "vuex";
  import Vue_i18n from 'vue-i18n';

  Vue.use(Vuex, Vue_i18n);

  import sunburst from "./chart_components/sunburst"
  import breadcrumbTrail from "./chart_components/breadcrumbTrail"
  import nodeInfoDisplayer from "./chart_components/sunburstInfo"
  import highlightOnHover from "./chart_components/highlightOnHover"
  import zoomOnClick from "./chart_components/zoomOnClick"

  export default {
    name: "sunburst-chart",
    components: {
      breadcrumbTrail,
      highlightOnHover,
      nodeInfoDisplayer,
      sunburst,
      zoomOnClick
    },
    data() {
      return {

      }
    },
    computed: {
      tree () {
        return {
          "name": this.$i18n.t("message.all_consumers"),
          "children": [
            {
              "name": this.$i18n.t("message.kitchen"),
              "children": [
                {
                  "name": this.$i18n.t("message.drinks"),
                  "size": 400,
                },
                {
                  "name": this.$i18n.t("message.ovens"),
                  "size": 400,
                },
                {
                  "name": this.$i18n.t("message.freezers"),
                  "size": 400,
                }
              ]
            },
            {
              "name": this.$i18n.t("message.light"),
              "children": [
                {
                  "name": this.$i18n.t("message.lights"),
                  "size": 200,
                },
                {
                  "name": this.$i18n.t("message.adv_lights"),
                  "size": 400,
                }
              ]
            },
            {
              "name": this.$i18n.t("message.climate"),
              "children": [
                {
                  "name": this.$i18n.t("message.ventilation"),
                  "size": 300,
                },
                {
                  "name": this.$i18n.t("message.air_conditioning"),
                  "size": 100,
                },
                {
                  "name": this.$i18n.t("message.heating"),
                  "size": 400,
                },
              ]
            },
            {
              "name": this.$i18n.t("message.other"),
              "children": [
                {
                  "name": this.$i18n.t("message.cashbox"),
                  "size": 200,
                },
                {
                  "name": this.$i18n.t("message.household"),
                  "size": 400,
                },
                {
                  "name": this.$i18n.t("message.infrastructure"),
                  "size": 400,
                },
                {
                  "name": this.$i18n.t("message.sockets"),
                  "size": 400,
                }
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .graph {
    -ms-flex-flow: column wrap;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-flow: column wrap;
    height: 100%;
    width: 100%
  }

  .viewport {
    -ms-flex: 1 1 auto;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    width: 100%
  }
</style>