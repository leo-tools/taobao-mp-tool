import gdp from 'gio-miniprogram-sdk-cdp/gio-taobao';
import { env } from '../apis'

export const initGIOTracking = () => {
  gdp('init', 'af0933540dd85550', 'b555291b5e576991', '3000000090645442', {
    host: env.host,
    version: '1.0.0',
    debug: true,
    forceLogin: true,
    enableIdMapping: true,
    tbConfig: {
      cloudAppId: "47460",
      path: env.path
    }
  });
}

export const setGIOTrackingUser = (kyid, isMembers) => {
  gdp('identify', kyid)
  gdp("setUserId", kyid, "TMALL_kyid")
  gdp('setUserAttributes', { tmall_member_id: '-', tamll_kyid: kyid, tmall_ifmember_ppl: isMembers ? "是" : "否" })
}
export const gdpPageOnTime = (item) => {
  const data = {
    'widgetType_var': '礼品推荐',
    'widgetName_var': "挑选礼物",
    "pageOnTime": item
  }
  console.log("-------------------------", data)
  gdp('track', 'LP_PageOnTime', data);
  return null
}

export const gdpClickTrack = (payload) => {
  console.log("-------------------------", payload);
  const data = {
    'pageUrl_var': '/widget/component/mini-card',
    'pageType_var': '乐高官方旗舰店',
    'pageName_var': '首页',
    'widgetType_var': payload.type || '礼品推荐',
    'widgetName_var': payload.widgetName || '-',
    'widgetButton_var': payload.btnName || '-',
    'wigetPosition_var': payload.wigetPosition || '-',
  }
  console.log("-------------------------", data)
  gdp('track', 'LP_WidgetClick', data);
  return null
}

export const gdpViewTrack = (payload) => {
  console.log("--------payloadpayload------", payload)
  const data = {
    'pageUrl_var': '/widget/component/mini-card',
    'pageType_var': '乐高官方旗舰店',
    'pageName_var': '首页',
    'widgetType_var': payload.type || '礼品推荐',
    'widgetName_var': payload.widgetName || '-',
  }
  console.log("-------------------------", data)
  gdp('track', 'LP_WidgetView', data);
  return null
}
