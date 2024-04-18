const { regClass, property } = Laya;
import OpenScene from "./OpenScene";
import BaseUI from "./BaseUI";

@regClass()
export default class OpenSceneScript extends Laya.Script { 

    private ui: OpenScene;
    constructor() { super(); }

    onEnable(): void {

        //获得OpenScene runtime对象 
        this.ui = this.owner as OpenScene;

        //可以调用OpenScene runtime对象的属性和方法
        this.ui.name1 = "我在使用OpenSceneScript";
        this.ui.getName();


    }

    onDisable(): void {
    }
}