import { View, Button } from "@tarojs/components";
import { useLoad, getApp } from "@tarojs/taro";
import "./index.scss";

const { ge } = getApp();
export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  function handleClick() {
    ge.initialize({
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
  }

  return (
    <View>
      <Button onClick={handleClick}>注册</Button>
    </View>
  );
}
