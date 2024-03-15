let envMap = {
  dev: {api:'/dev', env: 'test'},
  qa: {api: '/qa', env: 'test' },
  online: {api:'', env: 'online'}
}

export const env= envMap.online

export const makeRequest = async (data, state = false) => {
  console.log('参数----------', data)

  try {
    const result = await $global.cloud.application.httpRequest({
      'path': env.api+ data.path,
      'method': data.method,
      'headers': {
        'content-type': 'application/json',
      },
      'params': data.params || '',
      'body': data.body || {},
      //对于一个小程序关联多个云应用的场景，调用非默认云应用，需要指定对应的云应用Id,超时时间单位ms
      'exts': { 'cloudAppId': data.cloudAppId || '47460', 'timeout': 10000 }
    })
    console.log(state, '1111111111111111111111111111111111111请求成功', result)
    if (state) {
      if (result.success === false) {
        my.showToast({
          type: 'fail',
          content: result.errorMsg,
          duration: 2000,
          success: () => {
          },
        })
      } else {
        my.showToast({
          type: 'success',
          content: result.msg ,
          duration: 1000,
          success: () => {
          },
        })
      }

    }
    return result
  } catch (err) {
    console.log(' eeeeeeeeeeeeeeeee', err)
    my.alert({
      title: '提示',
      content: '网络异常，请重试'
    })
  }
}
