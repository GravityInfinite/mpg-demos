// app.js
// import turbo from "./utils/turbo.min.js"
import GravityEngine from "./utils/gravityengine.wx.js";

const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi",
  clientId: "your_client_id", // 项目的 APP ID
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
    pageShow: true, // 自动采集 $MPViewScreen
    pageShare: true, // 自动采集 $MPShare
  },
  name: "ge", // 全局变量名称，可使用getApp().ge获取ge
  enableLog: false, // 是否开启日志打印
  enablePersistence: true, // 是否缓存
  debugMode: "none", // debug or none
};
const ge = new GravityEngine(config);
ge.init();
App({
  onLaunch() {
    // turbo.setPara({
    //   show_log: false
    // })
    // turbo.init('gZGljPsq7I4wc3BMvkAUsevQznx1jahi', "your_client_id");
  },
  globalData: {
    ge,
  },
});
