const { regClass, property } = Laya;
//理解鼠标事件与穿透，请参照文档：https://ldc2.layabox.com/doc/?nav=zh-ts-2-2-8

@regClass()
export default class TextShowRT extends Laya.Script {
    @property({type:Laya.Tab})
    private throughTab: Laya.Tab;    
    @property({type:Laya.Sprite})
    private leftBg: Laya.Sprite;   
    @property({type:Laya.Sprite})
    private rightBg: Laya.Sprite;      
    @property({type:Laya.Button})
    private btn1: Laya.Button;    
    @property({type:Laya.Button})
    private btn2: Laya.Button; 
    @property({type:Laya.Sprite})
    private close1: Laya.Sprite;    
    @property({type:Laya.Sprite})
    private close2: Laya.Sprite; 

    constructor() { super(); }

    onEnable(): void {
        this.changeMouseCursor();
        this.throughTab.selectHandler = new Laya.Handler(this, this.onSwitchTab);
    }

    /**当切换tab的index标签索引时 */
    onSwitchTab(index: number): void {
        switch (index) {
            case 0:
                this.leftBg.hitTestPrior = true;
                this.rightBg.hitTestPrior = true;
                break;
            case 1:
                this.leftBg.hitTestPrior = false;
                this.rightBg.hitTestPrior = false;
                break;
        }
    }

    /**
     * 改变鼠标样式，
     * 通过侦听父节点的移入和移出事件，做出鼠标样式的改变，方便查看不同检测模式下，鼠标事件的交互区域变化
     */
    changeMouseCursor(): void {
        //进出鼠标事件区，改变鼠标状态
        this.leftBg.on(Laya.Event.MOUSE_OVER, this, () => {
            Laya.Mouse.cursor = "move";
        });
        this.leftBg.on(Laya.Event.MOUSE_OUT, this, () => {
            Laya.Mouse.cursor = "auto";
        });
        this.rightBg.on(Laya.Event.MOUSE_OVER, this, () => {
            Laya.Mouse.cursor = "move";
        });
        this.rightBg.on(Laya.Event.MOUSE_OUT, this, () => {
            Laya.Mouse.cursor = "auto";
        });
        //侦听父节点的点击状态
        this.leftBg.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": "点击了左侧的可点击区域", "point": { x: Laya.stage.mouseX - 100 } });
            console.log("click " + this.leftBg.name);
        });
        this.rightBg.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": "点击了右侧的可点击区域", "point": { x: Laya.stage.mouseX - 120 } });
            console.log("click " + this.rightBg.name);
        });
        //侦听在父节点鼠标检测区域子节点的点击状态，用于测试穿透
        this.btn1.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
            //阻止事件向父节点冒泡，只对相同事件类型有效，假如父节点侦听的是MOUSE_DOWN，这里是CLICK，那就无法阻止了。
            e.stopPropagation();
            Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": "点击了测试按钮1" });
            console.log("click btn1");
        });
        this.btn2.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
            e.stopPropagation();
            Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": "点击了测试按钮2" });
            console.log("click btn2");
        });

        //侦听在父节点区域之外的点击状态，用于测试优先检测子对象和本对象的区别
        //穿透模式下，优先检测的设置无效
        this.close1.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
            e.stopPropagation();//这里不阻止，父节点btn1，爷节点leftBg，会都响应帧听，然后打印。
            Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": "点击了左侧关闭按钮" , "point": { x: Laya.stage.mouseX - 100 } });
            console.log("click " + this.close1.name);
        });
        //在不穿透的模式下，优先检测本对象，本对象范围外的，会跳过检测，导致点击不到。
        this.close2.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
            e.stopPropagation();
            Laya.Scene.open("scenes/uiDemo/Msg.ls", false, { "text": "点击了右侧关闭按钮" , "point": { x: Laya.stage.mouseX - 120 } });
            console.log("click " + this.close2.name);
        });

    }

    onDisable(): void {
    }
}