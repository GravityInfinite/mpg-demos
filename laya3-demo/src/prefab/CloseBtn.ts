
const { regClass, property } = Laya;

@regClass()
export default class CloseBtn extends Laya.Script {

    constructor() { super(); }

    onEnable(): void {

        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
    }

    onClick(e: Laya.Event): void {
        //重置舞台的初始宽高
        Laya.stage.width = 1334;
        Laya.stage.height = 750;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        //当点击按钮时，返回到主场景
        Laya.Scene.open("scenes/Index.ls");


    }

    onDisable(): void {
        this.owner.off(Laya.Event.MOUSE_DOWN, this);
    }
}