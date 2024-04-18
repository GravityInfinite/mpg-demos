const { regClass, property } = Laya;

import Prefab = Laya.Prefab;
import Image = Laya.Image;
import Event = Laya.Event;
import Panel = Laya.Panel;
import Point = Laya.Point;

@regClass()
export default class AStar extends Laya.Script {

    @property({type:Laya.Sprite})
    private gameMap: Laya.Sprite;  

    @property({type:Laya.Prefab})
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
	
    private tiledMap: Laya.TiledMap;
    /** 记录stage上的鼠标点，当频繁使用stage坐标转化时，可以减少实例开销 */
    private stageMouse: Point = new Point();
    /** 摇杆角度 */
    private angle: number = 0;
    /** 记录上次的角度 */
    private lastAngle: number;
    /** 是否允许跑动 */
    private isMoving: boolean = false;
    /** 角色动画的节点 */
    private roleAniNode: Laya.Sprite;
    private _animator: Laya.Animator2D;
    private isRun: boolean = false;	

    private graph: any;
    private _everyPath: any[];
    private opts: any;

    /** 记录上次的x */
    private lastX: number;
    /** 记录上次的y */
    private lastY: number;
    constructor() {
        super();
    }

    onEnable(): void {
		this.createMap();

        //对整个panel视窗进行鼠标事件侦听
        this.sceneWindow.on(Event.MOUSE_UP, this, this.mouseUp);

        //添加角色到视窗中心
        this.roleAniNode = this.roleAni.create() as Laya.Sprite;
        this.sceneWindow.addChild(this.roleAniNode);
        this.roleAniNode.pivot(this.roleAniNode.width / 2 , this.roleAniNode.height / 2 + 26);
        this.roleAniNode.scale(0.6,0.6);
        this.roleAniNode.x = this.lastX = 48;
        this.roleAniNode.y = this.lastY = 48;

        //找到动画状态机
        this._animator = this.roleAniNode.getComponent<Laya.Animator2D>(Laya.Animator2D);

		//获取当前的默认动画状态
		let aniState : Laya.AnimatorState2D = this._animator.getDefaultState();
		console.log(aniState.name);


        this.createWallMap();
    }

    private createWallMap(): void {
        
        Laya.loader.load("resources/tiledMap/desert_new.json").then(() => {
            //获取模拟list数据的json文件，文件要提前加载好
            let _json = Laya.loader.getRes("resources/tiledMap/desert_new.json").data; 
            let data =  _json.layers[0].data;  
            // console.log(data);    
            let mapData : Number[][];
            mapData = new Array();
            for (var i = 0; i < 40 ; i++) {
                mapData[i] = new Array();
                for (var j = 0; j < 60 ; j++) {
                    if( data[i*60+j] == 30 )
                        mapData[i][j] = 1;
                    else 
                        mapData[i][j] = 0;
                }
            }
            // console.log(mapData);

            this.graph = new (window as any).Graph(mapData);
            this.opts = [];
            this.opts.closest = true;
            this.opts.heuristic = (window as any).astar.heuristics.diagonal;        
        });    
    }

    mouseUp(e: Event): void {
        if( this.isMoving )
            return;
        this.stageMouse.x = Laya.stage.mouseX;
        this.stageMouse.y = Laya.stage.mouseY;
        let mapMouse = this.gameMap.globalToLocal(this.stageMouse);
        // console.log(mapMouse);    
        var start = this.graph.grid[Math.ceil(this.roleAniNode.y/32)-1][Math.ceil(this.roleAniNode.x/32)-1];
        var end = this.graph.grid[Math.ceil(mapMouse.y/32)-1][Math.ceil(mapMouse.x/32)-1];  
        // console.log(start,end);       
        this._everyPath = (window as any).astar.search(this.graph, start, end, {
            closest: this.opts.closest
        });
        // console.log(this._everyPath);    
        if( this._everyPath.length > 0 )
        {
            
            this.isMoving = true;
        }
        //开启定时重复执行
        Laya.timer.loop(100, this, this.loopfun);              
    }

    private loopfun(): void {
		if (this._everyPath.length > 0) {
            // console.log(this._everyPath[0].x,this._everyPath[0].y);
            let x = this._everyPath[0].y * 32 + 16;
            let y = this._everyPath[0].x * 32 + 16;

            if( x == this.lastX )
            {
                if( y > this.lastY )
                    this.angle = 90;
                else   
                    this.angle = 270;
            }
            else
            {
                if( x > this.lastX )
                    this.angle = 0;
                else   
                    this.angle = 180;
            }
                
            this.switchAni("run");
            this.lastX = x;
            this.lastY = y;
            
			//调整位置
			Laya.Tween.to(this.roleAniNode, { x: x, y: y }, 100);
			this._everyPath.splice(0,1);
		}
        else{
            this.switchAni("stand");
            Laya.timer.clear(this, this.loopfun); 
            this.isMoving = false; 
        }
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


    /** 切换动画
     * @param aniType 动作类型
     */
    switchAni(aniType: string): void {
        if (aniType == "run") {
				let runS : string = this.getOrientation(this.angle, this.runAniName);
                this._animator.play(runS);
				// console.log(runS);
                this.isRun = true;
        } else {
            this.isRun = false;
			let standS : string = this.getOrientation(this.angle, this.standAniName);
			// console.log(standS);
            this.lastAngle !== this.angle && this._animator.play(standS);
        }        

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


	onDisable(): void {
		// Laya.stage.off(Event.MOUSE_DOWN, this, this.mouseDown);
		Laya.stage.off(Event.MOUSE_UP, this, this.mouseUp);
		// Laya.stage.off(Event.MOUSE_MOVE, this, this.mouseMove);
		if (this.tiledMap) {
			this.tiledMap.destroy();
		}
	}
}