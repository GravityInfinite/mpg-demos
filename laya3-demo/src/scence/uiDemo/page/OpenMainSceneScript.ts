const { regClass, property } = Laya;
import OpenMainScene from "./OpenMainScene";
import BaseUI from "./BaseUI";

@regClass()
export default class OpenMainSceneScript extends BaseUI {


    private ui: OpenMainScene
    constructor() { super(); }

    onEnable(): void {
        
        //获得OpenMainScene runtime对象        
        this.ui = this.owner as OpenMainScene;

        //调用BaseUI基类，做通用处理
        this.baseUI(this.ui);
    }

    onDisable(): void {
    }
}