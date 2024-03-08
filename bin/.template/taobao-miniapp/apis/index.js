let envMap = {
  dev: { api: '/dev', cloud: 'test' },
  qa: { api: '/qa', cloud: 'test' },
  online: { api: '', cloud: 'online' },
}
export const env = envMap.online

export const  makeRequest = async(data) => {
  const { path, method, headers= {}, params = '', body = {}, cloudAppId = '31406', exts = {} } = data
  try {
    const result = await $global.cloud.application.httpRequest({
      path: `${env.api}${path}`,
      method,
      headers: {
        "content-type": "application/json",
        ...headers
      },
      params,
      body,
      exts: { cloudAppId, "timeout": 10000, ...exts }
    });
    console.log(`${path}请求成功,body:${body}`, result)
    return result
  } catch (err) {
    console.error(`${path}请求失败,body:${body}`, err)
    return false;
  }
}
