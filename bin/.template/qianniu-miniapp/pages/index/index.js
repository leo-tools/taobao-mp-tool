import routerInit from 'miniapp-router'

const basePath = '/demo'

const routerConfig = {
  routes: [
    { path: '/demo', component: 'demo' },
  ],
  option: {
    initPath: basePath,
  }
}


Page({
  data: {
    activeKey: '',
    defaultActiveKey: basePath,
    /* info用于配置左侧菜单的商家应用基础信息 */
    info: {
      company: '',
      miniappName: '千牛后台',
      logo: ''
    },
    /* menu用于配置左侧菜单信息 */
    menu: [
      {
        name: 'demo',
        key: 'demo',
        title: 'demo'
      },
    ]
  },
  onLoad() {
    routerInit.call(this, routerConfig)
  },
  pathChange({ detail: { value } }) {
    this.$router.push(value)
    this.setData({ activeKey: value })
    console.log(value)
  },
  onActiveKeyChange(event) {
    const { path } = event.target.dataset
    this.setData({ activeKey: path })
  }
})
