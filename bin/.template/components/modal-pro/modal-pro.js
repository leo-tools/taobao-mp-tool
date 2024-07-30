Component({
  data: {},
  props: {
    title: "",
    visible: false,
    showBtn: false,
    onConfirm: () => {},
    onCancel: () => {},
  },
  onInit() { },
  didMount() { },
  methods: {
    handleConfirm() {
      this.props.onConfirm()
    },
    handleCancel() {
      this.props.onCancel()
    }
  }
})
