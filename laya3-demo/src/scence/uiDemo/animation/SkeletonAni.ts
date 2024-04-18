const { regClass, property } = Laya;

import Templet = Laya.Templet;
import Event = Laya.Event;
import SpineSkeleton = Laya.SpineSkeleton;
/**
 * 骨骼动画示例:
 * @readme1 骨骼动画有两种，一种是将spine或龙骨动画通过LayaAirIDE转换为引擎内置的骨骼动画（无论是spine还是龙骨，转换成引擎内置的动画文件后，都是sk后缀，）
 * 转换后的骨骼动画性能高，但有版本限制，且仅支持基础的功能。
 * @readme2 spine转换文档：https://ldc2.layabox.com/doc/?nav=zh-ts-1-5-4
 * @readme3 龙骨转换文档：https://ldc2.layabox.com/doc/?nav=zh-ts-1-5-5
 * @readme4 另一种是直接使用第三方的动画文件和动画运行库。这种方式，只支持spine动画文件。
 * @readme5 用样的spine动画，直接使用spine文件（skel后缀），要比转换成引擎内置的骨骼动画，性能相对LayaAir引擎内置版本要差不少，但支持相对完整的功能，以及3.7、3.8、4.0多个版本。
 * 具体可查看相关文档：https://ldc2.layabox.com/doc/?nav=zh-ts-1-5-6
 */
 @regClass()
export default class SkeletonAni extends Laya.Script {
    /** 内置动画模板(spine与DragonBones通用) */
    // private skeletonTemplet: Templet;
    /** spine动画模板 */
    // private spineTemplet: SpineTemplet;
    /**内置的骨骼动画 */
    private skeletonAni: Laya.Skeleton;
    /**spine动画 */
    private spineAni: Laya.SpineSkeleton;
    /** 动画皮肤名称 */
    private skinArray: Array<string> = ["goblin", "goblingirl"];
    /** 动画皮肤索引 */
    private skinIndex: number = 0;
    /** spine 动画索引 */
    private spineAniIndex: number = 6;
    /** 挂载内置spine动画的节点 */
    private skeletonNode: Laya.Sprite;
    /**挂载spine动画的节点 */
    private spineNode: Laya.Sprite;
    /** spine动画的数量 */
    private spineAniNum: number;

    onEnable(): void {
        this.createLayaSpine();
        this.createSpine();
    }

    /**创建layaAir引擎内置的spine动画 */
    createLayaSpine(): void {
        this.skeletonNode = this.owner.getChildByName("skeletonNode") as Laya.Sprite;
        // this.skeletonTemplet = new Templet();
        // this.skeletonTemplet.on(Event.COMPLETE, this, this.parseComplete);
        Laya.loader.load("resources/UI/role/spineAni/goblins.sk").then((templet: Templet) => {
            //创建动画，缓冲区模式为1，可以启用换装
            this.skeletonAni = templet.buildArmature(1);
            this.skeletonNode.addChild(this.skeletonAni);
            this.skeletonAni.x = 128;
            this.skeletonAni.y = 390;

            //按索引播放动画
            this.skeletonAni.play(0, true);
            //设置皮肤
            this.changeSkin();

            //点击换肤
            this.skeletonNode.on(Event.CLICK, this, this.changeSkin);
		});
        //加载转换后的骨骼动画
        // this.skeletonTemplet.loadAni("role/spineAni/goblins.sk");
        //找到IDE里的节点
        
    }

    /** 动画解析完成回调 */
    parseComplete(): void {

    }

    /**创建spine动画 */
    createSpine(): void {
        //找到IDE里的节点
        this.spineNode = this.owner.getChildByName("spineNode") as Laya.Sprite;
        //根据不同的spine版本，创建不同的spine动画模板，提醒：别忘了IDE里勾选对应spine版本的引擎库
        // this.spineTemplet = new SpineTemplet();//Laya.SpineVersion.v3_8);
        // this.spineTemplet.on(Event.COMPLETE, this, this.spineParseComplete)
        // this.spineTemplet.loadAni("role/spineAni/spineboy-pma.skel");
        Laya.loader.load("resources/UI/role/spineAni/spineboy-pma.skel",Laya.Loader.SPINE).then((templet: Laya.SpineTemplet) => {
            //创建spine动画
            this.spineAni = new SpineSkeleton();
            this.spineAni.templet = templet;
            this.spineNode.addChild(this.spineAni);
            this.spineAni.scale(0.3, 0.3);
            this.spineAni.pos(220, 390);

            //获得spine动画的数量
            this.spineAniNum = this.spineAni.getAnimNum();
            //按索引播放动画
            this.spineAni.play(this.spineAniIndex, true);
            //侦听点击，换动画
            this.spineNode.on(Event.CLICK, this, this.changeAni);
		});        
        
    }

    /** spine动画解析完成回调 */
    spineParseComplete(): void {

    }

    /** 更换动画 */
    changeAni(): void {
        //挑几个好看的spine动画，所以把前几个跳过去了，开发者可按实际需求设置动画索引值
        ++this.spineAniIndex >= this.spineAniNum && (this.spineAniIndex = 5);
        //按索引播放动画
        this.spineAni.play(this.spineAniIndex, true, true);
    }



    /** 改变骨骼动画皮肤 */
    changeSkin(): void {
        //按名称来播放spine动画,如果想按索引可用showSkinByIndex(index)
        this.skeletonAni.showSkinByName(this.skinArray[this.skinIndex]);
        //注意，这里的index索引是指动画皮肤的索引，并非是示例这里用于定义名称的数组索引skinIndex
        // this.skeletonAni.showSkinByIndex(index);

        //改变索引值，超出皮肤的索引长度后重置
        ++this.skinIndex >= this.skinArray.length && (this.skinIndex = 0);
    }

}