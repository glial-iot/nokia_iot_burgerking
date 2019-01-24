<template>
  <div class="sunburst-info" v-if="percentage">
    <span>{{percentage}}</span><br/> {{description}}
  </div>
</template>
<script>

  export default {
    name: "sunburstInfo",
    props: {
      root: {
        required: false,
        type: Object
      },
      current: {
        required: false,
        type: Object
      }
    },
    computed: {
      percentage() {
        if (this.current == null || this.root == null) {
          return null;
        }

        const percentage = (100 * this.current.value) / this.root.value;
        return `${percentage.toPrecision(3)} %`;
      },
      description () {
          return this.current.data.name;
      }
    }
  };
</script>
<style scoped>
  .sunburst-info {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    background: none;
    margin-top:-2em;
    margin-left:-3.5em;
  }
  .sunburst-info span {
    background: none;
    font-size: 1.5em;
  }
</style>
