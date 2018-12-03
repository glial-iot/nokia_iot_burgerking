<template>
  <svg></svg>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    props: ['data'],
    methods: {
      renderChart() {
        throw new Error('Please implement renderChart method in subclass of BaseChart.')
      }
    },
    mounted() {
      this.renderChart()
    },
    watch: {
      data: {
        handler: 'renderChart',
        deep: true
      }
    }
  })
</script>