Component({
  data: {
    isShowColorPicker: false,
  },
  props: {
    dataKey: '',
    color: '#fff',
    onColorChange: () => {},
  },
  onInit() { },
  didMount() { },
  methods: {
    handleShowColorPicker () {
      this.setData({
        isShowColorPicker: true,
      })
    },
    handleColorChange (e) {
      this.props.onColorChange && this.props.onColorChange(this.props.dataKey, e.detail.value.hex)
    },
    handleCloseColorPicker () {
      this.setData({
        isShowColorPicker: false,
      })
    }
  }
})
