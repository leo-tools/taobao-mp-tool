Component({
  data: {
    isShowLoadImage: false,
    opacityImgUrl: '',
    base64Obj: '',
    formattedImgUrl: '',
  },
  props: {
    exit: undefined,
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
      formattedImgUrl: this.props.imgUrl
    })
  },
  didUpdate() {
    this.setData({
      formattedImgUrl: this.props.imgUrl
    })
  },
  methods: {
    getImgSize(str) {
      let equalIndex = str.indexOf('=');
      if (str.indexOf('=') > 0) {
        str = str.substring(0, equalIndex);
      }
      let strLength = str.length;
      return parseInt(strLength - (strLength / 8) * 2) / 1000
    },
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
            if (this.props.exit && !key[0].toLocaleLowerCase().includes(`.${this.props.exit}`)) {
              my.alert({
                title: '提示',
                content: `图片不是${this.props.exit}`
              })
              return
            }
            if (this.props.maxSize) {
              let size = this.getImgSize(obj[key]);
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
            content: `建议图片尺寸至少为${w}*${h}`
          })
          this.setData({
            opacityImgUrl: '',
            isShowLoadImage: false
          })
          return
        }
      }

      try {
        my.alert({
          title: "提示",
          content: Object.keys(base64Obj)[0] + 'PPPP' + base64Obj[Object.keys(base64Obj)[0]]
        })
        this.props.onUpload({
          fileName: Object.keys(base64Obj)[0],
          base64: base64Obj[Object.keys(base64Obj)[0]]
        })
        my.showToast({
          type: 'success',
          content: '上传成功',
          duration: 1000,
        });
        this.setData({
          isShowLoadImage: false,
        })
      } catch (e) {
        my.showToast({
          type: 'fail',
          content: JSON.stringify(e),
          duration: 1000,
        });
        this.setData({
          isShowLoadImage: false
        })
      }
    },
  }
})
