const { regClass, property } = Laya;

@regClass()
export default class FrameAniRT extends Laya.Script {
    @property({type:Laya.Button})
    private playAni: Laya.Button;    
    @property({type:Laya.Button})
    private stopAni: Laya.Button;  
    @property({type:Laya.ComboBox})
    private selectAni: Laya.ComboBox;  
    @property({type:Laya.Animation})
    private aniSource: Laya.Animation; 
    
/** 逐帧动画
 * @readme 逐帧动画与图集动画的播放本质上没有什么区别，主要区别在于资源是图集还是散图。
 * 逐帧动画是指一帧一帧的连续播放，这种动画，也可以在时间轴上实现。
 */
    /** 是否播放的开关，true为播放 */
    private isPlay: boolean = false;

    onEnable(): void {
        //初始播放的动画
        this.isPlay = true;
        this.playAnimation(this.selectAni.selectedLabel);

        //帧听按钮状态
        this.playAni.on(Laya.Event.MOUSE_DOWN, this, () => {
            this.isPlay = true;
            this.playAnimation(this.selectAni.selectedLabel);
        });
        this.stopAni.on(Laya.Event.MOUSE_DOWN, this, () => {
            this.isPlay = false;
            this.aniSource.isPlaying && this.aniSource.stop();
        });

        //切换动画
        this.selectAni.selectHandler = new Laya.Handler(this, () => {
            this.isPlay ? this.playAnimation(this.selectAni.selectedLabel) : this.playAnimation(this.selectAni.selectedLabel, false);
        });

    }


    /** 直接播放动画
     * @param name 动画的资源模板名称
     * @param loop 是否循环播放
     * @param len 动画关键帧的长度，有多少资源，就创建多少个动画关键帧
     */
    playAnimation(name: string, loop: boolean = true, len: number = 7): void {

        /**动画关键帧数组 */
        let aniFrames: Array<string> = [];
        for (let i: number = 0; i < len; i++) {
            //拼接动画关键帧的资源数组
            aniFrames.push("resources/UI/role/frameAni/" + name + i + ".png");
        }

        //设置动画的数据源,并播放。
        this.aniSource.loadImages(aniFrames).play(0, loop);
        // 如果需要频繁播放调用的，建议采用动画模板的方式，节省性能开销，参照图集动画示例中的API即可
    }

}