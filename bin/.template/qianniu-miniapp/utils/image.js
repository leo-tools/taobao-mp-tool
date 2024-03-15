export const getImgSize = (str) => {
  let equalIndex = str.indexOf('=')
  let formattedStr = str
  if (str.indexOf('=') > 0) {
    formattedStr = str.substring(0, equalIndex)
  }
  let strLength = formattedStr.length
  return parseInt(strLength - (strLength / 8) * 2) / 1000
}

export  const formatImgUrl = (imgUrl) => {
  if (imgUrl.includes('http') || imgUrl.includes('data:image/jpg;base64,')) {
    return imgUrl
  }

  const parsedBase64 = JSON.parse(imgUrl)
  const key = Object.keys(parsedBase64)[0]
  return 'data:image/jpg;base64,' + parsedBase64[key]
}
