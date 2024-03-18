import gdp from 'gio-miniprogram-sdk-cdp/gio-taobao'
import { env } from '../apis'

export const initGIOTracking = () => {
  gdp('init', '', '', '', {
    host: env.host,
    version: '1.0.0',
    debug: true,
    forceLogin: true,
    enableIdMapping: true,
    tbConfig: {
      cloudAppId: '47460',
      path: env.path
    }
  })
}

export const setGIOTrackingUser = (kyid, isMembers) => {
  gdp('identify', kyid)
  gdp('setUserId', kyid, 'TMALL_kyid')
  gdp('setUserAttributes', { tmall_member_id: '-', tamll_kyid: kyid, tmall_ifmember_ppl: isMembers ? '是' : '否' })
}
export const gdpPageOnTime = (item) => {
  const data = {
    'widgetType_var': '',
    'widgetName_var': '',
    'pageOnTime': item
  }
  console.log('-------------------------', data)
  gdp('track', 'LP_PageOnTime', data)
  return null
}

export const gdpClickTrack = (payload) => {
  console.log('-------------------------', payload)
  const data = {
    'pageUrl_var': '/pages/component/mini-card',
    'pageType_var': '',
    'pageName_var': '',
    'widgetType_var': payload.type || '',
    'widgetName_var': payload.widgetName || '-',
    'widgetButton_var': payload.btnName || '-',
    'wigetPosition_var': payload.wigetPosition || '-',
  }
  console.log('-------------------------', data)
  gdp('track', 'LP_WidgetClick', data)
  return null
}

export const gdpViewTrack = (payload) => {
  console.log('--------payloadpayload------', payload)
  const data = {
    'pageUrl_var': '/pages/component/mini-card',
    'pageType_var': '',
    'pageName_var': '',
    'widgetType_var': payload.type || '',
    'widgetName_var': payload.widgetName || '-',
  }
  console.log('-------------------------', data)
  gdp('track', 'LP_WidgetView', data)
  return null
}
