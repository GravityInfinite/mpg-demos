import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi",
  clientId: "your_client_id", // 项目的 APP ID
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
  },
  name: "gravityEngine", // 全局变量名称
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
let ge;

@ccclass("Demo")
export class Demo extends Component {
  start() {
    // TA SDK 配置对象
    ge = new GravityAnalyticsAPI(config);
    ge.init();
  }

  update(deltaTime: number) {}

  handleRegister() {
    ge.register({
      name: "your_name",
      channel: "your_channel",
      version: 123,
      wx_openid: "your_wx_openid",
      wx_unionid: "your_wx_unionid",
    }).then((res) => {
      console.log(res);
    });
  }

  handleEvent() {
    ge.handleEvent({
      event_type: "pay",
      properties: {
        amount: 100,
        real_amount: 200,
      },
      timestamp: Date.now(),
      use_client_time: true,
      trace_id: "your_trace_id",
    }).then((res) => {
      console.log(res);
    });
  }

  handleQueryUser() {
    ge.queryUser().then((res) => {
      console.log(res);
    });
  }

  handleProfileSet() {
    ge.userSet({
      $first_visit_time: "2022-09-10 11:12:13",
      friends_num: 1,
      arr: [1, 2],
      $name: "bob",
      $gender: "female",
      $signup_time: "2022-09-10 11:12:13",
    });
  }

  handleProfileSetOnce() {
    ge.userSetOnce({
      $first_visit_time: "2022-09-10 11:12:13",
    });
  }

  handleProfileIncrement() {
    ge.userAdd({
      friends_num: 2,
    });
  }

  handleProfileDelete() {
    ge.userDel();
  }

  handleProfileAppend() {
    ge.userAppend({
      arr: [3, 4],
    });
  }

  handleProfileUnset() {
    ge.userUnset("arr");
  }

  handleRegisterApp() {
    ge.registerApp({
      test_register_app_key: "test_register_app_value",
    });
  }

  handleRegisterEvent() {
    ge.registerEvent();
  }

  handleLoginEvent() {
    ge.loginEvent();
  }

  handleLogoutEvent() {
    ge.logoutEvent();
  }

  handleCustomTrack() {
    ge.track("test", {
      $pay_type: "rmb",
    });
  }
}
