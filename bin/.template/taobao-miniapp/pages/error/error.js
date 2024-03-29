import { err, networkerr } from './base64'
Page({
  async onLoad(query) {
    this.setData({
      code: query.code,
    })
    my.hideLoading()
    my.hideShareMenu()
  },
  data: {
    code: 1001,
    err: networkerr,
  },
  events: {
    onBack() {
      my.reLaunch({
        url: '/pages/member/member-home/member-home',
      })
    },
  },
})
