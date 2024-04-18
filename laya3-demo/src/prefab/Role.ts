const { regClass, property } = Laya;
import Event = Laya.Event;
import Keyboard = Laya.Keyboard;
import KeyBoardManager = Laya.InputManager;
@regClass()
export default class Role extends Laya.Script {

    @property({ type: Laya.Sprite })
    private role1: Laya.Sprite;

    private _animator: Laya.Animator2D;
    /** 角色的站立方向 */
    private roleDirection: string;
    private lastRoleDirection: string;

    declare owner: Laya.Sprite;
    private bg: Laya.Image;
    constructor() { super(); }

    onEnable(): void {

        this._animator = this.role1.getComponent<Laya.Animator2D>(Laya.Animator2D);
        // this.roleStand = this._owner.getChildByName("roleStand") as Laya.Animation;
        // this.roleRun = this._owner.getChildByName("roleRun") as Laya.Animation;
        this.bg = this.owner.parent as Laya.Image;
        Laya.stage.on(Event.KEY_UP, this, this.onKeyUp);
    }

    /** 播放动画
     * @param name 动画名称
     * @param type 动画类型，跑:run，停:stand
     */
    playRoleAni(name: string, type: string = "stand"): void {
        if (type == "run") {
            this._animator.play("run" + name.substring(0, 1).toUpperCase() + name.substring(1, name.length));
        } else {
            this._animator.play(name);
        }
    }

    onUpdate(): void {
        this.lastRoleDirection = this.roleDirection;

        //侦听键盘事件，让用户来控制主角移动
        if (KeyBoardManager.hasKeyDown(Keyboard.UP) || KeyBoardManager.hasKeyDown(Keyboard.W)) {
            // console.log(KeyBoardManager.hasKeyDown(Keyboard.UP));
            this.roleDirection = "up";
            this.owner.y -= 2;
            this.owner.y < 80 && (this.owner.y = 80);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.DOWN) || KeyBoardManager.hasKeyDown(Keyboard.S)) {
            // console.log(KeyBoardManager.hasKeyDown(Keyboard.DOWN));
            this.roleDirection = "down";
            this.owner.y += 2;
            this.owner.y > (this.bg.height - 130) && (this.owner.y = this.bg.height - 130);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.LEFT) || KeyBoardManager.hasKeyDown(Keyboard.A)) {
            // console.log(KeyBoardManager.hasKeyDown(Keyboard.LEFT));
            this.roleDirection = "left";
            this.owner.x -= 2;
            this.owner.x < 30 && (this.owner.x = 30);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.RIGHT) || KeyBoardManager.hasKeyDown(Keyboard.D)) {
            // console.log(KeyBoardManager.hasKeyDown(Keyboard.RIGHT));
            this.roleDirection = "right";
            this.owner.x += 2;
            this.owner.x > (this.bg.width - 130) && (this.owner.x = (this.bg.width - 130));
        }

        //方向改变之后，才调整播放的动画
        this.lastRoleDirection !== this.roleDirection && this.playRoleAni(this.roleDirection, "run");
    }

    //键盘控键抬起时
    onKeyUp(e: Event): void {
        // console.log("onKeyUp");
        this.playRoleAni(this.roleDirection);
        //清空方向，用于下次按键的同方向播放判断；
        this.roleDirection = "";
    }

    onDisable(): void {
    }
}