import { OpenSceneBase } from "./OpenScene.generated";

const { regClass, property } = Laya;

@regClass()
export default class OpenScene extends OpenSceneBase {


    public name1: string = "我是OpenSceneRuntime";
    constructor() { super(); }

    onEnable(): void {
        
        console.log("OpenScene onEnable：" + this.name1);

        //只对window做事件监听，可以拖拽window窗口
        this.window.on(Laya.Event.MOUSE_DOWN, this, () => { this.window.startDrag(); });    

        //关闭按钮
        this.closeBtn.on(Laya.Event.MOUSE_DOWN, this, () => { 
            console.log("close");
            this.removeSelf() });
    }

    getName(): void
    {
        console.log(this.name1);
    }

    onDisable(): void {
    }
}