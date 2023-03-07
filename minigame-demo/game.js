import "./js/libs/weapp-adapter";
import "./js/libs/symbol";
import Main from "./js/main";

import GravityEngine from "./js/utils/gravityengine.mg.wx.min";

const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi",
  clientId: "your_client_id", // 项目的 APP ID
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
  },
  name: "ge", // 全局变量名称
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
new GravityEngine(config);

ge.init();

const ctx = canvas.getContext("2d");
const buttonLocation = [];
const eventList = [
  "handleRegister",
  "handleEvent",
  "handleQueryUser",

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
const buttonWidth = window.innerWidth / 2 - 20;
const buttonHeight = 30;

function initDraw() {
  const screenWidth = window.innerWidth,
    screenHeight = window.innerHeight,
    marginTop = 10;
  const leftStartLeftTop = (screenWidth / 2 - buttonWidth) / 2;
  const rightStartLeftTop =
    (screenWidth / 2 - buttonWidth) / 2 + screenWidth / 2;

  ctx.lineWidth = 1;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, screenWidth, screenHeight);
  ctx.fillStyle = "#67c23a";

  function getTextLeftStart(textWidth, position) {
    return position === "left"
      ? buttonWidth / 2 - textWidth / 2 + 10
      : buttonWidth / 2 - textWidth / 2 + 10 + screenWidth / 2;
  }

  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = "#67c23a";
    ctx.fillRect(
      leftStartLeftTop,
      90 + (buttonHeight + marginTop) * i,
      buttonWidth,
      buttonHeight
    );
    ctx.fillRect(
      rightStartLeftTop,
      90 + (buttonHeight + marginTop) * i,
      buttonWidth,
      buttonHeight
    );
    buttonLocation.push(
      ...[
        [leftStartLeftTop, 90 + (buttonHeight + marginTop) * i],
        [rightStartLeftTop, 90 + (buttonHeight + marginTop) * i],
      ]
    );
    ctx.fillStyle = "#fff";
    ctx.font = "13px Arial";
    const leftWidth = ctx.measureText(eventList[i * 2]).width;
    const rightWidth = ctx.measureText(eventList[i * 2 + 1]).width;
    ctx.fillText(
      eventList[i * 2],
      getTextLeftStart(leftWidth, "left"),
      110 + (buttonHeight + marginTop) * i
    );
    ctx.fillText(
      eventList[i * 2 + 1],
      getTextLeftStart(rightWidth, "right"),
      110 + (buttonHeight + marginTop) * i
    );
  }
}
initDraw();

const main = new Main();
canvas.addEventListener("touchstart", (e) => {
  const eventIndex = buttonLocation.findIndex((item) => {
    const x = e.touches[0].clientX,
      y = e.touches[0].clientY,
      width = item[0],
      height = item[1];
    return (
      width + buttonWidth > x &&
      height + buttonHeight > y &&
      height < y &&
      width < x
    );
  });
  if (eventIndex === -1) {
    return;
  }
  for (let i = 0; i < eventList.length; i++) {
    if (eventIndex === i) {
      main[eventList[i]]();
      break;
    }
  }
});
