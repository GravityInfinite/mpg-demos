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
