const memberPlugin = requirePlugin('cemMember')
export const checkMember = () =>
  new Promise((resolve, reject) => {
    memberPlugin.checkMember({
      //sellerId为可选参数，不填则为当前小程序Owner用户ID
      sellerId: '',
      success: async (v) => {
        resolve(v)
        console.log(v, 'asdasdasdsadasd')
      },
      fail(v) {
        reject(v)
      },
    })
  })

export const getAuthorize = async () =>
  new Promise(function (resolve, reject) {
    my.authorize({
      scopes: 'scope.userInfo',
      success: (res) => {
        my.getAuthUserInfo({
          success: async (userInfo) => {
            resolve({
              isOK: 1,
              userInfo,
            })
          },
        })
      },
      fail: async (error) => {
        resolve({
          isOK: 0,
          error,
        })
      },
    })
  })
