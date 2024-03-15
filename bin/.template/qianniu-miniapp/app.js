import { Cloud } from '@tbmp/mp-cloud-sdk'
import { env } from './apis'
const cloud = new Cloud();

// 云应用初始化
cloud.init({
  env: env.env,
})

$global.cloud = cloud

App({
  globalData: {},
  onLaunch(options) {
    // 第一次打开
    console.info('App onLaunch')
  },
  onShow(options) {},
})

