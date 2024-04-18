/**
 * 工具条收缩效果脚本
 */
 const { regClass, property } = Laya;

 @regClass()
 export default class Folded extends Laya.Script {
    /** 工具条是否打开 */
    private isOpen: boolean = true;
    /** 定义工具条背景的引用 */
    private toolbarBG: Laya.Image;
    /** 定义折叠按钮的引用 */
    private _owner: Laya.Sprite;
    /** 定义菜单组的引用 */
    private menu: Laya.Sprite;

    constructor() { super(); }

    onEnable(): void {
        //获得工具条背景对象
        this.toolbarBG = this.owner.parent as Laya.Image;
        //获得折叠按钮对象
        this._owner = this.owner as Laya.Image;
        //获得菜单组对象
        this.menu = this.owner.parent.getChildByName("menu") as Laya.Sprite;
    }

    onMouseDown(e: Laya.Event) {
        //停止事件冒泡
        e.stopPropagation();

        if (this.isOpen) {
            //背景缓动收起
            Laya.Tween.to(this.toolbarBG, { width: 106 }, 1000, Laya.Ease.strongOut);
            //向左，移动+旋转
            Laya.Tween.to(this._owner, { x: 52, rotation: 540 }, 1000, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                //修改打开状态
                this.isOpen = false;
            }));
            //菜单消失
            Laya.Tween.to(this.menu, { alpha: 0 }, 300, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                //修改帮助菜单显示状态
                this.menu.visible = false;
            }));
        } else {
            //背景缓动打开
            Laya.Tween.to(this.toolbarBG, { width: 460 }, 1000, Laya.Ease.strongOut);
            //向右，移动+旋转
            Laya.Tween.to(this._owner, { x: 402, rotation: -360 }, 1000, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                //修改打开状态
                this.isOpen = true;
            }));
            //菜单显示
            Laya.Tween.to(this.menu, { alpha: 1 }, 200, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                //修改帮助菜单显示状态
                this.menu.visible = true;
            }));
        }
    }

    onDisable(): void {
    }
}