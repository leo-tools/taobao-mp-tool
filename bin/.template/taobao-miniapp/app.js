import { Cloud } from '@tbmp/mp-cloud-sdk';
import { env } from './apis'
import { GlobalData } from './stores/global'
const cloud = new Cloud();

cloud.init({
  env: env.env,
});
$global.cloud = cloud

App({
  globalData: GlobalData,
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  cloud,
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
