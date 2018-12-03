<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import HeatmapOverlay from '../../node_modules/heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap.js'

  import {findRealParent, propsBinder} from 'vue2-leaflet'

  const props = {
    data: {
      type: [Array, Object],
    },
    options: {
      type: [Array, Object]
    }
  };

  export default {
    name: 'Heatmap',
    props: props,
    data() {
      return {
        ready: false,
      }
    },
    mounted() {
      this.mapObject = new HeatmapOverlay(this.options);
      this.mapObject.setData(this.data);
      L.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, props);
      this.ready = true;
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, false);
    },
    beforeDestroy() {
      this.parentContainer.removeLayer(this);
    },
  };
</script>