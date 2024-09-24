import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;
import GravityAnalytics from "./gravityengine.mg.cocoscreator.min.js";
import { type GravityAnalyticsAPI } from "./libs/GravityAnalyticsSDK.d";

const config = {
  accessToken: "0MZpWze5gqxsvUburkalYfqdLhF3mS27",
  clientId: "client0912-6", // 用户唯一标识，如微信小程序的openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: false, // 自动采集 $MPShow
    appHide: false, // 自动采集 $MPHide
  },
  name: "gravityEngine", // 全局变量名称
  enablePersistence: true, // 是否缓存
  debugMode: "none", // debug or none
  enable_sync_attribution: true, // 是否开启渠道归因
};

let ge: GravityAnalyticsAPI;

setTimeout(() => {
  ge = new GravityAnalytics(config);
  console.log("setupAndStart start");
  ge.setupAndStart();
  console.log("setupAndStart end");
}, 3000);

setTimeout(() => {
  ge.initialize({
    name: "your_name",
    version: 123,
    wx_openid: "your_wx_openid",
    wx_unionid: "your_wx_unionid",
  })
    .then((res) => {
      console.log(res, "initialize success");
    })
    .catch((err) => {
      console.log(err, "initialize error");
    });
}, 6000);

@ccclass("NewComponent")
export class NewComponent extends Component {
  start() {}

  update(deltaTime: number) {}
}
