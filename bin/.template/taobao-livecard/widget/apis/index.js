import { GlobalData } from '../stores/global'

export const envMap = {
  dev: { api: '/dev', env: 'test', host: 'a', path: '/dev/a' },
  qa: { api: '/qa', env: 'test', host: 'b', path: '/qa/b' },
  online: { api: '', env: 'online', host: 'c', path: 'c' },
}

export const env = envMap.online

export const  makeRequest = async(data) => {
  try {
    const result = await $global.cloud.application.httpRequest({
      'path': env.api + data.path,
      'method': data.method,
      'headers': {
        'content-type': 'application/json',
        kyid: GlobalData.kyid,
        jwt: GlobalData.jwt,
        ...data.headers
      },
      'params': data.params || '',
      'body': data.body || {},
      'exts': { 'cloudAppId': data.cloudAppId || '47460', 'timeout': 10000 }
    })
    console.log(result, '||||||||||||||||||||||||||', data.path, data.body)
    return result
  } catch (err) {
    console.error(`${data.path}请求失败`, err)

    return false
  }
}
