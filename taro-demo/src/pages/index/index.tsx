import { View, Button } from "@tarojs/components";
import { useLoad, getApp } from "@tarojs/taro";
import "./index.scss";

const { ge } = getApp();
export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  function handleClick() {
    ge.userSetOnce({ user_name: "TestUser" });
  }

  return (
    <View>
      <Button onClick={handleClick}>button</Button>
    </View>
  );
}
