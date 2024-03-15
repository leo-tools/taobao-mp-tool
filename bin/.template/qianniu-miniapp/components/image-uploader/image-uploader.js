import { getImgSize, formatImgUrl } from '../../utils/image'


Component({
  data: {
    isShowLoadImage: false,
    opacityImgUrl: '',
    base64Obj: '',
    formattedImgUrl: '',
  },
  props: {
    style: '',
    name: '',
    maxSize: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    onUpload: () => { },
    imgUrl: '',
  },
  onInit() { },
  didMount() {
    this.setData({
      formattedImgUrl: formatImgUrl(this.props.imgUrl)
    })
  },
  didUpdate() {
    this.setData({
      formattedImgUrl: formatImgUrl(this.props.imgUrl)
    })
  },
  methods: {
    handleGetImg(e) {
      this.setData({
        opacityImgUrl: '',
        isShowLoadImage: false
      })
      my.qn.chooseFileAndGetContent({
        count: 1,
        type: 0x01,
        success: (res) => {
          try {
            let obj = res.fileContentMap;
            let key = Object.keys(obj);
            if (new RegExp("[\u4E00-\u9FA5]+").test( key[0])) {
              my.alert({
                title: '提示',
                content: '图片名称不能为中文'
              })
              return
            }
            if (this.props.maxSize) {
              let size = getImgSize(obj[key]);
              if (size > this.props.maxSize) {
                my.alert({
                  title: '提示',
                  content: `图片资源不可超过${this.props.maxSize}kb`
                })
                return
              }
            }
            this.setData({
              base64Obj: obj,
              opacityImgUrl: obj[key],
              isShowLoadImage: true
            })
          } catch (err) {
            my.alert({
              content: err
            })
          }
        },
      })
    },
    async imageLoad(e) {
      const { base64Obj } = this.data
      const { detail } = e
      if (this.props.maxWidth && this.props.maxHeight) {
        let w = this.props.maxWidth, h = this.props.maxHeight;
        if (detail.width < w || detail.height < h || Math.abs(detail.width / detail.height - w / h) > 0) {
          my.alert({
            title: "提示",
            content: `建议图片尺寸为${w}*${h}`
          })
          this.setData({
            opacityImgUrl: '',
            isShowLoadImage: false
          })
          return
        }
      }

      this.props.onUpload(JSON.stringify(base64Obj), this.props.name)
      this.setData({
        isShowLoadImage: false
      })
    },
  }
})
