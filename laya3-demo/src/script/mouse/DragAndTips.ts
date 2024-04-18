const { regClass, property } = Laya;
import ShapeDetectionRT from "../../scence/uiDemo/interactive/ShapeDetectionRT";
@regClass()
export default class DragAndTips extends Laya.Script {
    /** @prop {name:tipsText,tips:"移入点击区的提示文本，为空则不显示",type:string} */
    @property({type:"string"})
    private tipsText: string = '';
    /** 是否已按下 */
    private isDown: boolean = false;

    onEnable(): void {
        this.tipsText.replace(/(^\s*)|(\s*$)/g, '');
    }

    onMouseDown(): void {
        (this.owner as Laya.Sprite).startDrag();
        this.isDown = true;
    }

    onMouseUp(): void {
        this.isDown = false;
    }

    onMouseMove(): void {
        this.isDown && ShapeDetectionRT.i.collisionWith(this.owner as Laya.Sprite);            
    }

    onMouseOver(): void {
        Laya.Mouse.cursor = "move";
        this.tipsText !== "" && Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": this.tipsText });
    }

    onMouseOut(): void {
        Laya.Mouse.cursor = "auto";
    }
}