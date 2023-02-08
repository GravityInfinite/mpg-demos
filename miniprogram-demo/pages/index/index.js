// index.js
const {
  ge
} = getApp()
Page({
  onLoad(e) {},
  data: {},
  handleRegister() {
    ge
      .register({
        name: "your_name",
        channel: "your_channel",
        version: 123,
        click_id: "your_click_id",
        wx_openid: "your_wx_openid",
        wx_unionid: "your_wx_unionid",
      })
  },
  handleEvent() {
    ge
      .handleEvent({
        event_type: "pay",
        properties: {
          amount: 100,
          real_amount: 200,
        },
        timestamp: Date.now(),
        use_client_time: true,
        trace_id: "test",
      })
  },
  handleQueryUser() {
    ge.queryUser().then((data) => {
      console.log(data);
    });
  },

  //事件上报相关demo

  // 若某key已存在则覆盖,否则将自动创建并赋值
  handleUserSet() {
    ge.userSet({
      $first_visit_time: "2000-12-11 10:42:20",
      $name: "bob",
    });
  },

  // 此事件在第一次$MPLaunch后会自动调用，若该key已存在则忽略，否则将自动创建并赋值
  handleUserSetOnce() {
    ge.userSetOnce({
      $first_visit_time: "2000-12-11 10:42:20",
    });
  },

  // 增加或减少一个用户的某个NUMBER类型的Profile值
  handleUserAdd() {
    ge.userAdd({
      friends_num: 2,
    });
  },

  // 删除一个用户的整个 Profile
  handleUserDel() {
    ge.userDel();
  },

  // 向某个用户的某个数组类型的Profile添加一个或者多个值,默认不去重
  handleUserAppend() {
    ge.userAppend({
      arr: [3, 4],
    });
  },

  // 将某个用户的某些属性值设置为空
  handleUserUnset() {
    ge.userUnset("arr");
  },

  // 设置所有事件都需要添加的属性
  handleRegisterApp() {
    ge.registerApp({
      test_register_app_key: "test_register_app_value",
    });
  },

  handleRegisterEvent() {
    ge.registerEvent();
  },
  handleLoginEvent() {
    ge.loginEvent();
  },
  handleLogoutEvent() {
    ge.logoutEvent();
  },

  // 自定义track
  handleCustomTrack() {
    ge.track("test", {
      $pay_type: "rmb",
    });
  },
});