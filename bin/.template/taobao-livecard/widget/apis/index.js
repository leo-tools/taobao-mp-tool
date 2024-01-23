import { GlobalData } from '../stores/global'

export const envMap = {
  dev: { api: '/dev', env: 'test', host: "api.cdp-tagging-dev.lego.cn", path: "/dev/lego-gift-recommendation/gio/forward/tracking" },
  qa: { api: '/qa', env: 'test', host: "api.cdp-tagging-dev.lego.cn", path: "/qa/lego-gift-recommendation/gio/forward/tracking" },
  online: { api: '', env: 'online', host: "api.cdp-tagging.lego.cn", path: "/lego-gift-recommendation/gio/forward/tracking" },
}

export const env = envMap.online;

export const  makeRequest = async(data) => {
  try {
    const result = await $global.cloud.application.httpRequest({
      'path': env.api + data.path,
      'method': data.method,
      'headers': {
        "content-type": "application/json",
        kyid: GlobalData.kyid,
        jwt: GlobalData.jwt,
        ...data.headers
      },
      'params': data.params || "",
      'body': data.body || {},
      'exts': { "cloudAppId": data.cloudAppId || '47460', "timeout": 10000 }
    });
    console.log(result, "||||||||||||||||||||||||||", data.path, data.body);
    return result
  } catch (err) {
    console.error(`${data.path}请求失败`, err);

    return false;
  }
}
