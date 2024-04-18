
const { regClass, property } = Laya;
import KeyBoardManager = Laya.InputManager;
import Keyboard = Laya.Keyboard;
import Vector3 = Laya.Vector3;

@regClass()
export default class D3Main extends Laya.Script {
    /** 3D 场景 */
    @property({ type: Laya.Scene3D, caption: "3D场景根节点" })
    private scene3D: Laya.Scene3D;
    /** 定义主角的节点精灵 */
    private spRole: Laya.Sprite;
    /** 拖尾的节点精灵 */
    @property({ type: Laya.Sprite, caption: "拖尾节点", tips: "拖拽拖尾的节点绑定到组件属性上" })
    private spTrail: Laya.Sprite;//这里是为了展示装饰器绑定节点的使用

    /** 拖尾的当前转向 */
    private turnLeft: boolean = true;
    /** 当前所处的旋转方位 */
    private _rotation: Vector3 = new Vector3(0, 0, 0);
    private rotationW: Vector3 = new Vector3(0, 180, 0);
    private rotationS: Vector3 = new Vector3(0, 0, 0);
    private rotationA: Vector3 = new Vector3(0, -90, 0);
    private rotationD: Vector3 = new Vector3(0, 90, 0);
    private sp3Role: Laya.Sprite3D = new Laya.Sprite3D();
    /** 记录上次播放的跑动动画名称，用于去重播放 */
    private lastRunAniName: string;
    private _animator: Laya.Animator;

    onEnable(): void {
        //动态创建并添加一个精灵，用于展示动态创建精灵的用法，与IDE的区别是，动态创建的，可以不设置精灵宽高，会自动获取纹理的宽高，IDE里会强制设置宽高，原则上，设置宽高更节性能。
        this.spRole = this.owner.addChild(new Laya.Sprite());
        //初始化舞台设置
        this.setStage();

        //加载3D精灵（模型），添加到2D精灵上
        this._3Dto2D("resources/3d/girl/girl.lh", this.spRole, 1, true);
        //设置2D精灵坐标位置
        this.spRole.pos(30, 768);

        this._3Dto2D("resources/3d/trail/Cube.lh", this.spTrail, 2);
        this.spTrail.pos(100, 500);

    }

    /** 重置舞台相关的设置
     * @readme 由于上一个场景是横屏的，切到竖屏游戏的时候，需要修改一些初始化的舞台设置，否则就会有问题。
     * 当然，这只是故意实现的特例，正常情况下，不需要这样做，横屏还是竖屏，最好统一起来。
     */
    setStage(): void {
        //重置舞台的初始宽高
        Laya.stage.width = 640;
        Laya.stage.height = 1136;
        if (Laya.Browser.onPC) {
            //取消对画布的物理分辨率
            Laya.stage.useRetinalCanvas = false;
            //用于PC上的体验，手机端不建议使用showall模式（不能保障各机型全屏适配）。
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            //在不全屏的情况下，stage位于画布的位置
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        } else {
            //强制竖屏
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            //更改适配模式,保高缩放模式
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        }
    }

    /** 加载3D精灵画到2D Texture上 
     * @param lh 模型的字符串路径
     * @param sp 2D精灵节点，用于画3D的texture
     * @param layer 手动指定层ID
     * @param isRole 是否是可以被控制的主角
    */
    _3Dto2D(lh: string, sp: Laya.Sprite, layer: number, isRole: boolean = false): void {
        //加载指定的模型，并画到2D精灵上
        Laya.loader.load(lh).then(res => {
            //把指定的模型节点添加3D到场景上
            let sp3: Laya.Sprite3D = res.create();
            this.scene3D.addChild(sp3);

            //创建一个3D摄像机
            let _camera = new Laya.Camera(0, 0.1, 1000);
            //把摄像机添加到3D场景上
            this.scene3D.addChild(_camera);
            //设置摄像机旋转角度
            _camera.transform.rotate(new Vector3(-45, 0, 0), false, false);
            _camera.clearColor = new Laya.Color(0, 0, 0, 0);

            //把摄像机设置为正交模式，2\3D混合游戏一般不使用透视模式
            _camera.orthographic = true;
            //近大远小，
            _camera.orthographicVerticalSize = 10;

            //清除其它层，避免几个层混合到一起
            _camera.removeAllLayers();
            //设置摄像机的层，
            _camera.addLayer(layer); 

            //一定要给对应的渲染对象节点设置层与摄像机一样的层，如果不清楚是哪个节点，就写个循环，把所有节点都遍历设置一下，否则会影响显示结果
            if (isRole)
                (<Laya.Sprite3D>sp3.getChildAt(0).getChildAt(1)).layer = layer;
            else
                (<Laya.Sprite3D>sp3.getChildAt(0).getChildAt(0)).layer = layer;

            //临时坐标，用于2D转3D的输出
            let _tempPos = new Vector3(0, 0, 0);
            //把想显示在2D位置的屏幕坐标转换为3D空间坐标
            _camera.convertScreenCoordToOrthographicCoord(new Vector3(220, 900, 0), _tempPos);
            //把转换后的坐标设置在3D场景中，以便吻合2D屏幕的观察
            sp3.transform.position = _tempPos;
            //缩放值为1
            if (isRole)
                sp3.transform.localScale = new Vector3(3, 3, 3);
            else
                sp3.transform.localScale = new Vector3(1, 1, 1);

            //把3D摄像机视图画到256宽高的纹理上
            _camera.renderTarget = new Laya.RenderTexture(256, 256, Laya.RenderTargetFormat.R8G8B8A8, Laya.RenderTargetFormat.DEPTHSTENCIL_24_8);
            // 再将离屏3D画到2D节点上，至此，就完成把3D画到2D的基础渲染流程
            sp.texture = new Laya.Texture(_camera.renderTarget);


            //根据参数决定是否要控制哪个节点
            isRole && (this.sp3Role = sp3);

            if (isRole) {
                this._animator = sp3.getChildAt(0).getComponent<Laya.Animator>(Laya.Animator);
                Laya.stage.on(Laya.Event.KEY_UP, this, () => {
                    this.switchAni("Idle");
                });
            }
        });
    }


    onUpdate(): void {
        //调整拖尾转向
        if (this.spTrail.x < 20 && this.turnLeft) this.turnLeft = false;
        else if (this.spTrail.x > (Laya.stage.width - 200) && !(this.turnLeft)) this.turnLeft = true;
        //控制拖尾的自动移动
        if (this.turnLeft) this.spTrail.x -= 1;
        else this.spTrail.x += 1;

        //侦听键盘事件，让用户来控制主角移动
        if (KeyBoardManager.hasKeyDown(Keyboard.W)) {
            this.spRole.y -= 3;
            this.rotateRole(this.rotationW);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.S)) {
            this.spRole.y += 3;
            this.rotateRole(this.rotationS);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.A)) {
            this.spRole.x -= 3;
            this.rotateRole(this.rotationA);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.D)) {
            this.spRole.x += 3;
            this.rotateRole(this.rotationD);
        }
    }

    /** 改变角色的朝向 
     * @param r Vector3旋转值
     */
    private rotateRole(r: Vector3): void {
        this.switchAni("Run");
        if (r === this._rotation) return;
        //按世界坐标改变到指定的方位
        this.sp3Role.transform.rotationEuler = r;
        //纪录当前方位，避免重复改变
        this._rotation = r;

    }

    switchAni(aniType: string): void {
        if (aniType == "Run") {
            if (aniType !== this.lastRunAniName) {
                this._animator.play(aniType);

            }
        } else {
            this._animator.play(aniType);
        }
        this.lastRunAniName = aniType;
    }

    onDisable(): void {
        //恢复对画布使用物理分辨率
        Laya.stage.useRetinalCanvas = true;
        //恢复强制横屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        //恢复舞台的设计宽高
        Laya.stage.width = 1334;
        Laya.stage.height = 750;
        //恢复适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        //页面关闭后，清除3D场景
        this.scene3D.destroy();
    }
}