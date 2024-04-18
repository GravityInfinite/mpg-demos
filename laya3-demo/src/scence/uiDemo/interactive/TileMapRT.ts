const { regClass, property } = Laya;

import Prefab = Laya.Prefab;
import Image = Laya.Image;
import Event = Laya.Event;
import Panel = Laya.Panel;
import Point = Laya.Point;

@regClass()
export default class TileMapRT extends Laya.Script {

    @property(Laya.Sprite)
    private gameMap: Laya.Sprite;  

    @property(Laya.Prefab)
    private roleAni: Laya.Prefab;

    /** @prop {name:runAniName, tips:"各个方向对应的角色跑动动画名称，共16个方向，以英文逗号间隔。方向顺序从右开始，顺时针从0至15", type:String, default:"Right,Rdown1,Rdown2,Rdown3,Down,Ldown3,Ldown2,Ldown1,Left,Lup1,Lup2,Lup3,Up,Rup3,Rup2,Rup1"}*/
    @property({type:"string"})
    private runAniName: string = "runRight,runRDown1,runRDown2,runRDown3,runDown,runLDown3,runLDown2,runLDown1,runLeft,runLUp1,runLUp2,runLUp3,runUp,runRUp3,runRUp2,runRUp1";
    
    /** @prop {name:standAniName, tips:"各个方向对应的角色站立动画名称，共8个方向，以英文逗号间隔。方向顺序从右开始，顺时针从0至7", type:String, default:"Right,Rdown,Down,Ldown,Left,Lup,Up,Rup"}*/
    @property({type:"string"})
    private standAniName: string = "right,Rdown,down,Ldown,left,Lup,up,Rup";
    /** @prop {name:gameMap, tips:"游戏地图", type:Node} */
    @property({type:Laya.Panel})
    private sceneWindow: Panel;
    @property(Laya.Image)
    private joystickBG: Image;/** 摇杆背景 */
	
    private tiledMap: Laya.TiledMap;

    /** 摇杆轴 */
    private joystickAxis: Image;
    /** 摇杆轴的最大移动范围 */
    private maxDistance: number;
    /** 记录可操作区的touchID */
    private touchId: number;
    /** 记录stage上的鼠标点，当频繁使用stage坐标转化时，可以减少实例开销 */
    private stageMouse: Point = new Point();
    /** 中心点坐标偏移值 */
    private axisPivot: Point = new Point();
    /** 摇杆角度 */
    private angle: number = 0;
    /** 记录上次的角度 */
    private lastAngle: number;
    /** 摇杆弧度 */
    private radian: number = 0;
    /** 记录上次播放的跑动动画名称，用于去重播放 */
    private lastRunAniName: string;    
    /** 是否允许跑动 */
    private isMoving: boolean = false;
    /** 角色动画的节点 */
    private roleAniNode: Laya.Sprite;
    private _animator: Laya.Animator2D;
    private isRun: boolean = false;	
	private mLastX: number = 0;
	private mLastY: number = 0;
    constructor() {
        super();

    }

    onEnable(): void {
		this.createMap();

        //查找节点对象
        this.joystickAxis = this.joystickBG.getChildByName("joystickAxis") as Image;

        //得到摇杆轴最大移动的距离，可用于限制轴心的移动范围，如果不想超出背景大圈，再除2即可。
        this.maxDistance = this.joystickBG.width - this.joystickAxis.width;

        //记录中心点偏移值，需要提前在IDE里将摇杆轴joystickAxis的坐标摆放到中心点坐标上
        this.axisPivot.x = this.joystickAxis.x;
        this.axisPivot.y = this.joystickAxis.y;

        //对整个panel视窗进行鼠标事件侦听
        this.sceneWindow.on(Event.MOUSE_DOWN, this, this.mouseDown);
        this.sceneWindow.on(Event.MOUSE_MOVE, this, this.mouseMove);
        this.sceneWindow.on(Event.MOUSE_UP, this, this.mouseUp);
        this.sceneWindow.on(Event.MOUSE_OUT, this, this.mouseUp);

        //添加角色到视窗中心
        this.roleAniNode = this.roleAni.create() as Laya.Sprite;
        this.sceneWindow.addChild(this.roleAniNode);
        this.roleAniNode.pivot(this.roleAniNode.width / 2, this.roleAniNode.height / 2);
        this.roleAniNode.x = this.sceneWindow.width / 2;
        this.roleAniNode.y = this.sceneWindow.height / 2;

        //找到动画状态机
        this._animator = this.roleAniNode.getComponent<Laya.Animator2D>(Laya.Animator2D);

		//获取当前的默认动画状态
		let aniState : Laya.AnimatorState2D = this._animator.getDefaultState();
		console.log(aniState.name);
    }

    	//创建地图
	createMap(): void {
		//创建地图对象
		this.tiledMap = new Laya.TiledMap();
		//创建地图，适当的时候调用destroy销毁地图
		this.tiledMap.createMap("resources/tiledMap/desert_new.json", new Laya.Rectangle(0, 0, this.sceneWindow.width, this.sceneWindow.height), new Laya.Handler(this, this.completeHandler));
	}

	private onLoaded(): void {
		this.tiledMap.mapSprite().removeSelf();
		this.gameMap.addChild(this.tiledMap.mapSprite());
	}

	/**
	 * 地图加载完成的回调
	 */
	private completeHandler(e: any = null): void {
		this.onLoaded();
	}

    /** 侦听panel 鼠标\手势按下时 */
    mouseDown(e: Event): void {
        //记录按下的touchId，用于判断是否是按下的事件
        this.touchId = e.touchId;
        this.isMoving = true;
        this.updateJoystickPoint();
    }

    /** 更新摇杆按下的位置 */
    updateJoystickPoint(): void {
        //先把stage坐标转换为摇杆节点的本地坐标,这里是轴心的父节点坐标摇杆背景
        this.stageMouse.x = Laya.stage.mouseX;
        this.stageMouse.y = Laya.stage.mouseY;
        let joystickBGMouse = this.joystickBG.globalToLocal(this.stageMouse),
            /** 根据摇杆轴心偏移调整后的鼠标坐标点 */
            mouseX = joystickBGMouse.x - this.joystickAxis.width / 2,
            mouseY = joystickBGMouse.y - this.joystickAxis.height / 2;

        //计算弧度、角度
        this.radian = Math.atan2(mouseY - this.axisPivot.y, mouseX - this.axisPivot.x);
        this.lastAngle = this.angle;
        this.angle = Math.round(this.radian * 180 / Math.PI * 10) / 10;
        this.angle < 0 && (this.angle += 360);

        /**计算摇杆轴的移动距离，摇杆节点（joystickBG）的中心位置到摇杆节点坐标系的摇杆轴鼠标点位置*/
        let distance = this.getDistance(this.joystickBG.width / 2, this.joystickBG.height / 2, joystickBGMouse.x, joystickBGMouse.y);

        // console.log({ distance }, this.maxDistance);
        //在摇杆背景区域外，并且角度发生变化才更新摇杆轴位置
        if (distance > this.maxDistance && this.lastAngle !== this.angle) {
            this.joystickAxis.x = Math.floor(Math.cos(this.radian) * this.maxDistance) + this.axisPivot.x;
            this.joystickAxis.y = Math.floor(Math.sin(this.radian) * this.maxDistance) + this.axisPivot.y;
        } else {
            //在限制内，直接设置坐标, 用joystickBG坐标系下的鼠标坐标，减去joystickAxis自身的中心点偏移值，得到joystickAxis最终的坐标值
            this.joystickAxis.pos(joystickBGMouse.x - this.joystickAxis.width / 2, joystickBGMouse.y - this.joystickAxis.height / 2);
        }
        this.switchAni("run");
    }

    /** 切换动画
     * @param aniType 动作类型
     */
    switchAni(aniType: string): void {
        if (aniType == "run") {
            let _runAniName: string = this.getOrientation(this.angle, this.runAniName);
            if (_runAniName !== this.lastRunAniName) {
                this.lastRunAniName = _runAniName;
                this._animator.play(_runAniName);
                // console.log(_runAniName);
            }
            this.isRun = true;
        } else {
            this.isRun = false;
			let standS : string = this.getOrientation(this.angle, this.standAniName);
			// console.log(standS);
            this.lastAngle !== this.angle && this._animator.play(standS);
        }          
    }

    /** 鼠标抬起时 */
    mouseUp(e: Event): void {
        //不是按下的，不作处理
        if (e.touchId != this.touchId) return;
        this.touchId = null;
        this.isMoving = false;
        //摇杆轴回归原位（摇杆背景中心）
        this.joystickAxis.pos(this.axisPivot.x, this.axisPivot.y);

        //设置站立朝向
        this.switchAni("stand");
    }

    /** 鼠标移动的时候 */
    mouseMove(e: Event): void {
        //只处理按下并移动的逻辑
        if (e.touchId != this.touchId) return;
        this.updateJoystickPoint();
    }

    /** 根据角度得到朝向动画名 
     * @param angle 角度
     * @param aniName 动画名称字符串
     * @return 动画名
    */
    getOrientation(angle: number, aniName: string): string {
        let aniArr: Array<string> = aniName.split(",");
        const angleConditions: number = 360 / aniArr.length;
        return aniArr[Math.floor(angle / angleConditions)];
    }

    onUpdate(): void {
        if (!this.isMoving) return;
        //更新角色的移动
        this.updateRoleMove();

    }

    /** 更新角色移动相关 */
    updateRoleMove(): void {
        //根据摇杆角度改变角色移动朝向
        this.switchAni("run");

        //移动的坐标向量为：摇杆弧度下的坐标向量比率（斜边比）乘以移动速度
        let dx = Math.cos(this.radian) * 2;
        let dy = Math.sin(this.radian) * 2;
		this.mLastX += dx;
		this.mLastY += dy;
		if( this.mLastX < 0 )
			this.mLastX = 0;
		else if( this.mLastX > 1920 - this.sceneWindow.width )
			this.mLastX = 1920 - this.sceneWindow.width;			
		if( this.mLastY < 0 )
			this.mLastY = 0;
		else if( this.mLastY > 1280 - this.sceneWindow.height )
			this.mLastY = 1280 - this.sceneWindow.height;
		this.tiledMap.moveViewPort(this.mLastX, this.mLastY);        
    }

    /** 
    * 获得两个坐标点的直线距离，
    * 依据勾股定理，用目标坐标的分量与原始坐标的分量计算斜边(目标点到鼠标点的直线距离)，用于判断是否超出限制范围
    * @param centerX 原始的中心点坐标X轴位置
    * @param centerY 原始的中心点坐标Y轴位置
    * @param mouseX 鼠标点X轴位置
    * @param mouseY 鼠标点Y轴位置
    */
    getDistance(centerX: number, centerY: number, mouseX: number, mouseY: number): number {
        let dx: number = centerX - mouseX,
            dy: number = centerY - mouseY;
        return Math.sqrt(dx * dx + dy * dy);
    }

	onDisable(): void {
		Laya.stage.off(Event.MOUSE_DOWN, this, this.mouseDown);
		Laya.stage.off(Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
		if (this.tiledMap) {
			this.tiledMap.destroy();
		}
	}
}