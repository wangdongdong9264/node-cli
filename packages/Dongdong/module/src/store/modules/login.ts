import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'Login',
  namespaced: true,
  stateFactory: true
})
export default class Login extends VuexModule {
  public count = 12

  get getCount () {
    return this.count
  }

  @Action({ commit: 'decrement' })
  public async decr () {
    return 3
  }

  @Mutation
  private decrement (delta: number) {
    this.count -= delta
  }
}
