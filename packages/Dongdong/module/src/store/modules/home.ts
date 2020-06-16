import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({
  name: 'Home',
  namespaced: true,
  stateFactory: true
})
export default class Home extends VuexModule {
  public foo: number = 10

  get axles ():number {
    return this.foo / 2
  }

  @Action({ commit: 'MutationMeth' })
  public async ActionMeth () {
    return 8
  }

  @Mutation
  public MutationMeth ():void {
    this.foo++
  }
}
