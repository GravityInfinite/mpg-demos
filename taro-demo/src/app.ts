import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.scss";
import GravityEngine from "./gravityengine.taro";

const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->设置-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如产品为小游戏，则必须填用户openid（注意，不是小游戏的APPID！！！）
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
  },
  name: "ge", // 全局变量名称, 默认为 gravityengine
  debugMode: "none", // 是否开启测试模式，开启测试模式后，可以在 网站后台--设置--元数据--事件流中查看实时数据上报结果。（测试时使用，上线之后一定要关掉，改成none或者删除）
};
const ge = new GravityEngine(config);
ge.setupAndStart();

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
