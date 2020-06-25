module.exports = {
  vueTSTemplate: compoenntName => {
    return `<template>
  <div class="${compoenntName}"></div>
</template>
<script lang="ts">
import { Prop, Component, Emit, Vue } from 'vue-property-decorator'
@Component
export default class ${compoenntName} extends Vue {

}
</script>
<style lang="scss" scoped>
.${compoenntName}{
  
}
</style>
`

  }
}