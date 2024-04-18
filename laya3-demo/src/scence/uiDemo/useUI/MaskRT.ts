const { regClass, property } = Laya;
import { MaskRTBase } from "./MaskRT.generated";
import Event = Laya.Event;
/**
 * 当节点设置为mask类型后，不再具有节点属性，无法通过查找节点的方式找到，所以也不能被鼠标检测到，
 * 需要通过控制参照物来间接来控制，本示例中，分别通过舞台的鼠标坐标以及graphics绘制的鼠标区域来同步改变mask位置
 */
@regClass()
export default class MaskRT extends MaskRTBase {
  

    onEnable(): void {

        this._hitArea.on(Event.MOUSE_DOWN, this, () => {
            this._hitArea.off(Event.MOUSE_MOVE, this, this.bg3MaskMove);
            this._hitArea.startDrag();
            //当_hitArea节点位移的时候，同步mask位置
            this._hitArea.on(Event.MOUSE_MOVE, this, this.bg3MaskMove);
        });

        this._mask.on(Event.MOUSE_MOVE, this, this.maskMove);

    }

    bg3MaskMove(e: Event): void {
        e.stopPropagation();
        //用可控制的鼠标交互区来同步不可鼠标交互的mask位置。
        this.bg3Mask.x = this._hitArea.x;
        this.bg3Mask.y = this._hitArea.y;
    }

    maskMove(): void {
        /** 场景上的鼠标点，考虑到场景被引用，场景位置就不等于stage位置，需要转换坐标 */
        let _point = this.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY)),
            maskX = _point.x - (this._mask.width / this.bg2.scaleX / 2),
            maskY = _point.y - (this._mask.height / this.bg2.scaleY / 2);

        if (maskX > 80 && maskY > 80) {
            //要还原缩放的偏移影响来同步mask位置
            this._mask.x = _point.x - (this._mask.width / this.bg2.scaleX / 2);
            this._mask.y = _point.y - (this._mask.height / this.bg2.scaleY / 2);

            //放大的背景需要考虑缩放偏移的影响
            this.bg2.x = (-_point.x - this._mask.width / 2) * (this.bg2.scaleX - 1);
            this.bg2.y = (-_point.y - this._mask.height / 2) * (this.bg2.scaleY - 1);
        }
    }
}