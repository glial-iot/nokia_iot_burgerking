<template>
  <div style="display: none;">
    <template v-for="(circle, index) in data.data">
      <l-circle :lat-lng="circle" :fillColor="'url(#gradient-' + index + ')'" :stroke="false" :fillOpacity="1" :radius="circle.radius" v-bind:key="circle.index"></l-circle>
    </template>
  </div>
</template>

<script>
import L from 'leaflet'
import {LCircle } from "vue2-leaflet";

import { findRealParent, propsBinder } from 'vue2-leaflet'

const props = {
  data: {
    type: [Array, Object],
  },
};

export default {
  components: {
    LCircle
  },
  name: 'colored-heatmap',
  props: props,
  mounted() {
    this.parentContainer = findRealParent(this.$parent);
    this.data.data.forEach((element, index) => {
      this.removeGradient(index)
      this.addGradient(element, index)
    });
  },
  beforeUpdate() {
    this.data.data.forEach((element, index) => {
      this.removeGradient(index)
    });
  },
  updated() {
    this.data.data.forEach((element, index) => {
      this.addGradient(element, index)
    });
  },
  methods: {
    addGradient(element, index) {
      var map = this.parentContainer.mapObject;

      var svg = map.getPanes().overlayPane.firstChild;
      var doc = document.implementation.createDocument(null, null, null);
      var svgDef = doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
      var svgGradient = doc.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
      var svgStart = doc.createElementNS('http://www.w3.org/2000/svg', 'stop');
      var svgStop = doc.createElementNS('http://www.w3.org/2000/svg', 'stop');

      svgGradient.setAttribute('id', 'gradient-' + index);

      svgStart.setAttribute('offset', '0%');
      svgStart.setAttribute('stop-opacity', '0.7');
      svgStart.setAttribute('stop-color', element.color);

      svgStop.setAttribute('offset', '100%');
      svgStop.setAttribute('stop-opacity', '0');
      svgStop.setAttribute('stop-color', element.color);

      svgGradient.appendChild(svgStart);
      svgGradient.appendChild(svgStop);
      svgDef.appendChild(svgGradient);
      svg.appendChild(svgDef);
    },
    removeGradient(index) {
      var map = this.parentContainer.mapObject
      var svg = map.getPanes().overlayPane.firstChild;

      if (svg) {
        var gradient = svg.querySelector('#gradient-' + index)

        if (gradient) {
          gradient.remove()
        }
      }
    }
  }
};
</script>