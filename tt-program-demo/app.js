// app.js
import GravityEngine from "./utils/gravityengine.tt.min.js";

const config = {
  accessToken: "z4gcI6n1O52DRibPXZfjvn8w3YVtLUqp",
  clientId: "your_client_id", // 用户唯一标识，如openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
    pageShow: true, // 自动采集 $MPViewScreen
    pageShare: true, // 自动采集 $MPShare
  },
  name: "ge", // 全局变量名称，可使用getApp().ge获取ge
  enablePersistence: true, // 是否缓存
  debugMode: "none", // debug or none
};
const ge = new GravityEngine(config);
ge.init();
App({
  onLaunch() {},
  globalData: {
    ge,
  },
});
