<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ str }}</p>
    <p>this is vuex {{ foo }}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Action, Mutation, Getter, namespace } from 'vuex-class'
import { getModule } from 'vuex-module-decorators'
import store from '../store'
import Home from '../store/modules/home'

const someModule = namespace('Home')
// const vuexLogin = namespace('Login')
const home = getModule(Home, store)

@Component
export default class asyncT extends Vue {
  @Prop({ default: 'xxx' }) readonly str!: string
  readonly title:string = '这是一个异步组件'

  // @State private foo!: number; // 同名
  // @State('foo') private stateFoo!: number; // 重命名

  @someModule.State private foo!: number
  @someModule.Getter private axles!: number

  // @someModule.Action('ActionMeth') ActionMeth:any

  // @namespace('Home').Action('ActionMeth')
  // private ActionMeth!: () => void

  @namespace('Home').Mutation('MutationMeth')
  private MutationMeth!: () => void

  mounted () {
    this.MutationMeth()
    // home.ActionMeth().then(v => {
    //   console.log(v)
    // })
    // this.ActionMeth()
    // setTimeout(() => {
    //   // this.ActionMeth()
    //   this.$store.dispatch('Home/ActionMeth')
    // }, 1000)
    setTimeout(() => {
      home.ActionMeth().then(v => {
        console.log(v)
      })
    }, 1000)
  }
}
</script>
