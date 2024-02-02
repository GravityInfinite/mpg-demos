//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
let ge;
class Main extends eui.UILayer {
  public constructor() {
    super();
    const config = {
      accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
      clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
      autoTrack: {
        appLaunch: true, // 自动采集 $MPLaunch
        appShow: true, // 自动采集 $MPShow
        appHide: true, // 自动采集 $MPHide
      },
      name: "ge", // 全局变量名称，可使用getApp().ge获取ge
      enablePersistence: true, // 是否缓存
      debugMode: "debug", // debug or none
    };
    ge = new GravityAnalyticsAPI(config);
    ge.setupAndStart();
  }

  protected createChildren(): void {
    super.createChildren();

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    };

    //inject the custom material parser
    //注入自定义的素材解析器
    let assetAdapter = new AssetAdapter();
    egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
    egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

    this.runGame().catch((e) => {
      console.log(e);
    });
  }

  private async runGame() {
    await this.loadResource();
    this.createGameScene();
    const result = await RES.getResAsync("description_json");
    this.startAnimation(result);
    await platform.login();
    const userInfo = await platform.getUserInfo();
    console.log(userInfo);
  }

  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      this.stage.addChild(loadingView);
      await RES.loadConfig("resource/default.res.json", "resource/");
      await this.loadTheme();
      await RES.loadGroup("preload", 0, loadingView);
      this.stage.removeChild(loadingView);
    } catch (e) {
      console.error(e);
    }
  }

  private loadTheme() {
    return new Promise((resolve, reject) => {
      // load skin theme configuration file, you can manually modify the file. And replace the default skin.
      //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
      let theme = new eui.Theme("resource/default.thm.json", this.stage);
      theme.addEventListener(
        eui.UIEvent.COMPLETE,
        () => {
          resolve("");
        },
        this
      );
    });
  }

  private textfield: egret.TextField;
  /**
   * 创建场景界面
   * Create scene interface
   */
  protected getButton(label: string, x: number, y: number): eui.Button {
    let button = new eui.Button();
    button.label = label;
    button.x = x;
    button.y = y;
    button.width = 260;
    button.height = 50;
    // button.horizontalCenter = x;
    // button.verticalCenter = y;
    this.addChild(button);
    this.addChild(button);
    return button;
  }
  protected createGameScene(): void {
    let sky = this.createBitmapByName("bg_jpg");
    this.addChild(sky);
    let stageW = this.stage.stageWidth;
    let stageH = this.stage.stageHeight;
    sky.width = stageW;
    sky.height = stageH;

    let topMask = new egret.Shape();
    topMask.graphics.beginFill(0x000000, 0.5);
    topMask.graphics.drawRect(0, 0, stageW, 172);
    topMask.graphics.endFill();
    topMask.y = 33;
    this.addChild(topMask);

    let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
    this.addChild(icon);
    icon.x = 26;
    icon.y = 33;

    let line = new egret.Shape();
    line.graphics.lineStyle(2, 0xffffff);
    line.graphics.moveTo(0, 0);
    line.graphics.lineTo(0, 117);
    line.graphics.endFill();
    line.x = 172;
    line.y = 61;
    this.addChild(line);

    let colorLabel = new egret.TextField();
    colorLabel.textColor = 0xffffff;
    colorLabel.width = stageW - 172;
    colorLabel.textAlign = "center";
    colorLabel.text = "Hello Egret";
    colorLabel.size = 24;
    colorLabel.x = 172;
    colorLabel.y = 80;
    this.addChild(colorLabel);

    let textfield = new egret.TextField();
    this.addChild(textfield);
    textfield.alpha = 0;
    textfield.width = stageW - 172;
    textfield.textAlign = egret.HorizontalAlign.CENTER;
    textfield.size = 24;
    textfield.textColor = 0xffffff;
    textfield.x = 172;
    textfield.y = 135;
    this.textfield = textfield;
    const eventList = [
      "handleRegister",
      "handleEvent",
      "handleGetUser",

      "handleUserSet",
      "handleUserSetOnce",
      "handleUserAdd",
      "handleUserDel",
      "handleUserAppend",
      "handleUserUnset",

      "handleRegisterApp",
      "handleRegisterEvent",
      "handleLoginEvent",
      "handleLogoutEvent",

      "handleCustomTrack",
    ];
    for (let i = 1; i <= 14; i++) {
      const label = eventList[i - 1];
      const j = i % 2 === 0 ? i - 1 : i;
      const width = i % 2 === 0 ? 350 : 30;
      const btn = this.getButton(label, width, 50 * j);
      btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this[label], this);
    }
  }
  /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
  private createBitmapByName(name: string): egret.Bitmap {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }
  /**
   * 描述文件加载成功，开始播放动画
   * Description file loading is successful, start to play the animation
   */
  private startAnimation(result: Array<any>): void {
    let parser = new egret.HtmlTextParser();

    let textflowArr = result.map((text) => parser.parse(text));
    let textfield = this.textfield;
    let count = -1;
    let change = () => {
      count++;
      if (count >= textflowArr.length) {
        count = 0;
      }
      let textFlow = textflowArr[count];

      // 切换描述内容
      // Switch to described content
      textfield.textFlow = textFlow;
      let tw = egret.Tween.get(textfield);
      tw.to({ alpha: 1 }, 200);
      tw.wait(2000);
      tw.to({ alpha: 0 }, 200);
      tw.call(change, this);
    };

    change();
  }

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
