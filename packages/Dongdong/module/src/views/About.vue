<template>
  <div class="about">
    <h1>This is an about page</h1>
    <async-t :str="fileName" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    'asyncT': () => import('@/components/asyncT.vue')
  }
})
export default class about extends Vue {
  readonly title: string = 'This is an about page'
  private fileName: string = 'xxx.app'
}
</script>
