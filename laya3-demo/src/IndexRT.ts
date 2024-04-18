import { IndexRTBase } from "./IndexRT.generated";

import GravityAnalyticsAPI from "../bin/gravityengine.mg.layats";

const { regClass, property } = Laya;

@regClass()
export default class IndexRT extends IndexRTBase {
  constructor() {
    super();
  }

  private ge: GravityAnalyticsAPI;

  onEnable(): void {
    console.log("IndexRT onEnable");

    let openId = "4bdfdec2-81df-4cce-b22a-824cd88d8635";
    const config = {
      accessToken: "F7sJDouIAtky4KZWMNqCjUl0Yfhwxczv", // 项目通行证，在：网站后台-->设置-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
      clientId: openId, // 用户唯一标识，如产品为小游戏，则必须填用户openid（注意，不是小游戏的APPID！！！）
      autoTrack: {
        appLaunch: true, // 自动采集 $MPLaunch
        appShow: true, // 自动采集 $MPShow
        appHide: true, // 自动采集 $MPHided
        //     pageShow: true, // 自动采集 $MPViewScreen
        //     pageShare: true, // 自动采集 $MPShare
      },
      name: "ge", // 全局变量名称
      // debugMode: "debug", // 是否开启测试模式，开启测试模式后，可以在 网站后台--设置--元数据--事件流中查看实时数据上报结果。（测试时使用，上线之后一定要关掉，改成none或者删除）
    };
    console.log(Laya.Browser.onAlipayMiniGame,112)
    try {
      this.ge = new GravityAnalyticsAPI(config);
    } catch (e) {
      console.log("new GravityAnalyticsAPI error: " + e);
    }
    this.ge.setupAndStart();
    setTimeout(() => {
      this.ge
        .initialize({
          name: "your_name",
          version: 123,
          openid: "your_openid",
          enable_sync_attribution: false,
        })
        .then((res) => {
          console.log("initialize success " + res);
        })
        .catch((err) => {
          console.log("initialize failed, error is " + err);
        });
    }, 2000);

    //侦听ui按钮点击事件
    this.uiBtn.on(Laya.Event.CLICK, this, () => {
      //点击后，打开UI场景示例
      console.log("uiBtn");
      Laya.Scene.open("scenes/UiMain.ls"); //不要使用Laya.Scene.open("./Scenes/PhysicsGameMain.ls");
    });

    //侦听物理按钮点击事件
    this.phyBtn.on(Laya.Event.CLICK, this, () => {
      //点击后，打开物理游戏示例
      console.log("phyBtn");
      Laya.Scene.open("scenes/PhysicsGameMain.ls"); //不要使用Laya.Scene.open("./Scenes/PhysicsGameMain.ls");
    });

    //侦听3D混合按钮点击事件
    this.d3Btn.on(Laya.Event.CLICK, this, () => {
      //点击后，打开3D混合场景示例
      console.log("d3Btn");
      Laya.Scene.open("scenes/D3Main.ls"); //不要使用Laya.Scene.open("./Scenes/D3Main.ls");
    });
  }

  onDestroy(): void {
    // if( this.uiBtn.hasListener( Laya.Event.CLICK ) )
    //     console.log("uiBtn有点击事件监听");
  }
}
