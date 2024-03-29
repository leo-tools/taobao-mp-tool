import { getSession } from '../../apis/login'

Page({
  data: {
    accessToken: '',
    day: null, // 有效天数
    dayState: false,
    t: null
  },
  onLoad(query) {
    this.init()
  },
  onShow() {
  },

  init() {
    // my.qn.cleanToken();
    console.log(my.getSystemInfoSync())
    my.getSystemInfo({
      success: (res) => {
        console.log(res)
        if (res.brand === 'windows') {
          console.log('windows')
          my.authorize({
            scopes: '*', //'scope.userInfo',
            success: async (res) => {
              // 获取session到期时间
              await this.getSessionTime()
            },
            fail: (err) => {
              console.log(err)
            }
          })
        } else {
          console.log('非windows')
          my.authorize({
            scopes: 'scope.userInfo', //'scope.userInfo',
            success: async (res) => {
              // 获取session到期时间
              await this.getSessionTime()
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }
      }
    })
  },
  onHide() {
    let { t, t_2 } = this.data
    clearInterval(t)
    clearInterval(t_2)
  },

  async getSessionTime() {
    let res = await getSession()
    console.log(res,'ssssssssssss')

    // 计算得出session的有效时间

    let day = this.effectiveDay(res.data.editDate)
    console.log(day,'22222222222222222')
    this.setData({
      day
    })

    if (!day) {
      my.showToast({
        type: 'fild',
        content: '已过期， 请用主账号重新登陆授权',
        duration: 3000,
        success: () => {
        },
      })
    } else  {
      this.countDown()
    }


  },


  /**
   * @effectiveDay 有效期
   */
  effectiveDay(startTime) {
    let day = 86400000
    let totalTime = day * 30 // 30天总的毫秒数
    let end_s = new Date(startTime).getTime() + totalTime
    let endTime = end_s
    let today = new Date().getTime()
    // console.log(endTime, today)

    if (today <= endTime) {
      // 计算当前时间 - 结束时间
      let time = Math.abs(new Date().getTime() - parseInt(endTime))
      // 转为秒数
      time /= 1000
      // console.log(time)

      // 获取时
      let h = parseInt((time % 86400) / 3600)
      // 获取天
      let d = parseInt(time / 86400)
      // console.log(s, m, h, d)
      h = h < 10 ? '0' + h : h
      return d
    } else {
      return 0
    }
  },


  /**
   * @countDown 倒计时
   */
  countDown() {
    let time = 5
    this.data.t = setInterval(() => {
      --time
      console.log(time)
      this.setData({
        time
      })
      if (time <= 0) {
        clearInterval(this.data.t)
        this.data.t = null
        this.toIndex()
      }
    }, 1000)
  },

  /**
   * @toIndex 前往首页
   */
  toIndex() {
    my.reLaunch({ url: '/pages/index/index' })
    this.data.t && clearInterval(this.data.t)
    this.data.t = null
  }
})
