import Event = Laya.Event;

let ge;
export default class Demo extends Laya.Scene {
  static instance: Demo;

  constructor() {
    super();
    Demo.instance = this;
    this.loadScene("DemoScene.json");
  }
  onEnable(): void {
    const config = {
      accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi",
      clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
      autoTrack: {
        appLaunch: true, // 自动采集 $MPLaunch
        appShow: true, // 自动采集 $MPShow
        appHide: true, // 自动采集 $MPHide
      },
      name: "gravityEngine", // 全局变量名称
      enablePersistence: true, // 是否缓存
      debugMode: "debug", // debug or none
    };
    ge = new GravityAnalyticsAPI(config);
    ge.setupAndStart();

    this.scene.btn1.on(Event.CLICK, this, this.handleRegister);
    this.scene.btn2.on(Event.CLICK, this, this.handleEvent);
    this.scene.btn3.on(Event.CLICK, this, this.handleGetUser);

    this.scene.btn4.on(Event.CLICK, this, this.handleUserSet);
    this.scene.btn5.on(Event.CLICK, this, this.handleUserSetOnce);
    this.scene.btn6.on(Event.CLICK, this, this.handleUserAdd);
    this.scene.btn7.on(Event.CLICK, this, this.handleUserDel);
    this.scene.btn8.on(Event.CLICK, this, this.handleUserAppend);
    this.scene.btn9.on(Event.CLICK, this, this.handleUserUnset);

    this.scene.btn10.on(Event.CLICK, this, this.handleRegisterApp);
    this.scene.btn11.on(Event.CLICK, this, this.handleRegisterEvent);
    this.scene.btn12.on(Event.CLICK, this, this.handleLoginEvent);
    this.scene.btn13.on(Event.CLICK, this, this.handleLogoutEvent);
    this.scene.btn14.on(Event.CLICK, this, this.handleCustomTrack);
  }
  //单击方法
  handleRegister() {
    ge.initialize({
      name: "your_name",
      version: 123,
      wx_openid: "your_wx_openid",
      wx_unionid: "your_wx_unionid",
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
      trace_id: "test",
    });
  }
  handleGetUser() {
    ge.getUser().then((data) => {
      console.log(data);
    });
  }

  //事件上报相关demo
  // 若某key已存在则覆盖,否则将自动创建并赋值
  handleUserSet() {
    ge.userSet({
      $first_visit_time: "2000-12-11 10:42:20",
      $name: "bob",
    });
  }

  // 此事件在第一次$MPLaunch后会自动调用，若该key已存在则忽略，否则将自动创建并赋值
  handleUserSetOnce() {
    ge.userSetOnce({
      $first_visit_time: "2000-12-11 10:42:20",
    });
  }

  // 增加或减少一个用户的某个NUMBER类型的Profile值
  handleUserAdd() {
    ge.userAdd({
      friends_num: 2,
    });
  }

  // 删除一个用户的整个 Profile
  handleUserDel() {
    ge.userDel();
  }

  // 向某个用户的某个数组类型的Profile添加一个或者多个值,默认不去重
  handleUserAppend() {
    ge.userAppend({
      arr: [3, 4],
    });
  }

  // 将某个用户的某些属性值设置为空
  handleUserUnset() {
    ge.userUnset("arr");
  }

  // 设置所有事件都需要添加的属性
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

  // 自定义track
  handleCustomTrack() {
    ge.track("test", {
      $pay_type: "rmb",
    });
  }
}
