module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
    <div class="${compoenntName}">
      ${compoenntName}组件
    </div>
  </template>
  <script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: '${compoenntName}',
	components: {
	
	},
    // 数据
    props: {
      testprops: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0
        }
      }
    },
	computed: {
	  ...mapState('user', {
	    access_token: state => state.access_token
	  }),
	  testComputed: {
	    get: () => {
	      return this.a + 1
	    },
	    set: (v) => {
	      this.a = v - 1
	    }
	  }
	},
    data () {
      return {
        test: {}
      }
    },
    methods: {
      ...mapMutations([
        'edit/testname'
      ]),
      ...mapActions([
        'edit/testname',
      ])
    },
    watch: {
      test: {
        handler: function (val, oldVal) { /* ... */ },
        deep: true
      }
    },
    // 生命周期
    beforeCreate () {
      // 初始化界面前
      // 这是new Vue() 之后触发的第一个钩子，在当前阶段中data、methods、computed以及watch上的数据和方法均不能被访问
    },
    created () {
      // 初始化界面后
      // 当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数
      // 可以做一些初始数据的获取，注意请求数据不易过多，会造成白屏时间过长。在当前阶段无法与Dom进行交互，如果你非要想，可以通过vm.$nextTick来访问Dom
    },
    beforeMount () {
      // 渲染dom前 
      // 当前阶段虚拟Dom已经创建完成，即将开始渲染
      // 在此时也可以对数据进行更改，不会触发updated
    },
    mounted () {
      // 渲染dom后
      // 当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$ref属性对Dom进行操作。也可以向后台发送请求，拿到返回数据
      this.$nextTick( () => {
        // const dom = document.querySelector('#fixTree .ant-select-selection--single')
        // dom.style.display = 'none'
      })
    },
    beforeUpdate () {
      // 更新数据前
      // 发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发
      // 可以在当前阶段进行更改数据，不会造成重渲染
    },
    updated () {
      // 更新数据后
      // 发生在更新完成之后，当前阶段组件Dom已完成更新
      // 要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新
    },
    beforeDestroy () {
      // 卸载组件前
      // 当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器
    },
    destroyed () {
      // 卸载组件后
      // 这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁
    }
  }
  </script>
  <style lang="scss" scoped>
  .${compoenntName} {
  
  }
  </style>`
  },
  entryTemplate: `import Main from './main.vue'
  export default Main`
}
