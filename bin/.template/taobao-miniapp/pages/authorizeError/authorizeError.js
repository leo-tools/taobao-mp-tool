import { GlobalData as globalData } from '../../stores/global'
import { getAuthorize } from '../../utils/member-plugin'

Page({
  data: {},
  onLoad() {},
  onShow() {
    // 如果跳入过设置授权页面，进行判断之后回跳
    my.showLoading({
      content: '权限检测中...',
      delay: 0,
      mask: true,
    })
    setTimeout(() => {
      my.getSetting({
        complete: async (res) => {
          console.log(res, 'ares-1')
          // my.alert({
          //   content: "ares-1" + JSON.stringify(res)
          // })
          globalData.authorizationNum = 1
          my.hideLoading()
          if (res && res.authSetting && res.authSetting.userInfo) {
            let authorize_res = await getAuthorize()
            // my.alert({
            //   content: "ares-2" + JSON.stringify(authorize_res)
            // })
            console.log(authorize_res, 'ares-2')
            if (authorize_res.isOK === 1) {
              globalData.userInfo = authorize_res.userInfo
            }
            if (globalData.routerData) {
              globalData.jwt = ''
              // 判断判断已经授权
              if (globalData.routerData.url) {
                my.reLaunch({
                  url: '/' + globalData.routerData.url,
                })
              } else {
                my.navigateBack()
              }
            } else {
              // 判断判断已经授权
              my.reLaunch({
                url: '/pages/index/index',
              })
            }
          } else {
            // eslint-disable-next-line no-empty
          }
        },
      })
    }, 500)
  },
  openAuthoriza() {
    my.openSetting({
      success: (res) => {},
    })
  },
  exit() {
    // my.showToast({
    //   content: '即将退出小程序！',
    //   duration: 3000,
    //   success: () => {
    //     my.exit();
    //   },
    // });
    my.navigateBack()
  },
})
