(function () {
  'use strict';

  var Event = Laya.Event;
  let ge;
  class Demo extends Laya.Scene {
      constructor() {
          super();
          Demo.instance = this;
          this.loadScene("DemoScene.json");
      }
      onEnable() {
          const config = {
              accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi",
              clientId: "your_client_id",
              autoTrack: {
                  appLaunch: true,
                  appShow: true,
                  appHide: true,
              },
              name: "gravityEngine",
          };
          ge = new GravityAnalyticsAPI(config);
          ge.init();
          this.scene.btn1.on(Event.CLICK, this, this.handleRegister);
          this.scene.btn2.on(Event.CLICK, this, this.handleEvent);
          this.scene.btn3.on(Event.CLICK, this, this.handleQueryUser);
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
      handleRegister() {
          ge.register({
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
      handleQueryUser() {
          ge.queryUser().then((data) => {
              console.log(data);
          });
      }
      handleUserSet() {
          ge.userSet({
              $first_visit_time: "2000-12-11 10:42:20",
              $name: "bob",
          });
      }
      handleUserSetOnce() {
          ge.userSetOnce({
              $first_visit_time: "2000-12-11 10:42:20",
          });
      }
      handleUserAdd() {
          ge.userAdd({
              friends_num: 2,
          });
      }
      handleUserDel() {
          ge.userDel();
      }
      handleUserAppend() {
          ge.userAppend({
              arr: [3, 4],
          });
      }
      handleUserUnset() {
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

  class GameConfig {
      constructor() { }
      static init() {
          var reg = Laya.ClassUtils.regClass;
          reg("script/Demo.ts", Demo);
      }
  }
  GameConfig.width = 640;
  GameConfig.height = 1136;
  GameConfig.scaleMode = "fixedwidth";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "DemoScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  class Main {
      constructor() {
          if (window["Laya3D"])
              Laya3D.init(GameConfig.width, GameConfig.height);
          else
              Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
          Laya["Physics"] && Laya["Physics"].enable();
          Laya["DebugPanel"] && Laya["DebugPanel"].enable();
          Laya.stage.scaleMode = GameConfig.scaleMode;
          Laya.stage.screenMode = GameConfig.screenMode;
          Laya.stage.alignV = GameConfig.alignV;
          Laya.stage.alignH = GameConfig.alignH;
          Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
          if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
              Laya.enableDebugPanel();
          if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
              Laya["PhysicsDebugDraw"].enable();
          if (GameConfig.stat)
              Laya.Stat.show();
          Laya.alertGlobalError(true);
          Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
      }
      onVersionLoaded() {
          Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
      }
      onConfigLoaded() {
          GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
      }
  }
  new Main();

}());
