export default class LoopImg extends Laya.Script {
    constructor() { super(); }

    onEnable(): void {
    }

    onUpdate(): void {
        //超出盒子的显示宽高时，移除。 这里考虑了图片设置轴心点后的坐标偏移
        // if ((<Laya.Image>this.owner).x < -128 || (<Laya.Image>this.owner).x > 1016) {
        //     console.log("removeSelf", (<Laya.Image>this.owner).x, (<Laya.Image>this.owner).y);
        //     // this.owner.removeSelf();
        // }
    }

    onDisable(): void {
        //Img被移除时，回收到对象池，方便下次复用，减少对象创建开销。
        // Laya.Pool.recover("loopImg", this.owner);
    }
}