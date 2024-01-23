import { Cloud } from '@tbmp/mp-cloud-sdk';
const cloud = new Cloud();
import { env } from '../../apis'
import { gdpPageOnTime, gdpViewTrack, initGIOTracking, setGIOTrackingUser } from '../../gio'

// 云应用初始化
cloud.init({
  env: env.env,
});
$global.cloud = cloud
initGIOTracking()

Component({
  data: {},
  onInit() {},
  didMount() {},
  methods: {},
})
