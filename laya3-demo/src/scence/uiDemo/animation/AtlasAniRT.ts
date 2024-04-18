const { regClass, property } = Laya;

@regClass()
export default class AtlasAniRT extends Laya.Script {
    @property({type:Laya.Button})
    private playAni: Laya.Button;    
    @property({type:Laya.Button})
    private stopAni: Laya.Button;  
    @property({type:Laya.ComboBox})
    private selectAni: Laya.ComboBox;  
    @property({type:Laya.Animation})
    private aniSource: Laya.Animation; 
/**
 * 图集动画，其实就是基于图集资源的逐帧动画。
 */
    /** 是否播放的开关，true为播放 */
    private isPlay: boolean = false;
    onAwake(): void {

        console.log("创建动画模板");
        //创建动画模板
        this.createAniTemplate("moveB");
        this.createAniTemplate("moveC");
        this.createAniTemplate("moveE");
        this.createAniTemplate("moveF");
        this.createAniTemplate("moveH");
        this.createAniTemplate("moveI");
        this.createAniTemplate("moveK");
        this.createAniTemplate("moveL");
        this.aniSource.play(0,true,"moveB");

    }

    onEnable(): void {
        
        //帧听按钮状态
        this.playAni.on(Laya.Event.MOUSE_DOWN, this, () => {
            this.isPlay = true;
            this.aniSource.play(0, true, this.selectAni.selectedLabel);
        });
        this.stopAni.on(Laya.Event.MOUSE_DOWN, this, () => {
            this.isPlay = false;
            this.aniSource.isPlaying && this.aniSource.stop();
        });


        //切换动画模板
        this.selectAni.selectHandler = new Laya.Handler(this, () => {
            this.isPlay ? this.aniSource.play(0, true, this.selectAni.selectedLabel) : this.aniSource.play(0, false, this.selectAni.selectedLabel);
        });

    }


    /** 创建动画模板
     * @param name 动画的资源模板名称
     * @param len 动画关键帧的长度，有多少资源，就创建多少个动画关键帧
     */
    createAniTemplate(name: string, len: number = 8): void {

        /**动画关键帧数组 */
        let aniFrames: Array<string> = [];
        for (let i: number = 0; i < len; i++) {
            //拼接动画关键帧的资源数组
            aniFrames.push("resources/UI/role/atlasAni/139x/" + name + i + ".png");
        }
        //创建动画模板，会占用内存，但频繁使用的时候可节省CPU性能消耗。
        Laya.Animation.createFrames(aniFrames, name);
    }

    onError(err: string): void {
        console.log("加载失败: " + err);
    }

}