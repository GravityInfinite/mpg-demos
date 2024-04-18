const { regClass, property } = Laya;

@regClass()
export default class TextShowRT extends Laya.Script {
    @property({type:Laya.Label})
    private btFont: Laya.Label;    

    onAwake(): void {
        this.loadBitmapFont();
    }

    /**
     * 实例化位图字体类，并加载位图字体
     */
    loadBitmapFont(): void {
        let bitmapFont: Laya.BitmapFont = new Laya.BitmapFont();
        bitmapFont.loadFont("resources/bitmapfont/gongfang.fnt", new Laya.Handler(this, this.onFontLoaded, [bitmapFont]));
    }
    /**
     * 位图字体加载完成后的回调方法
     * @param bitmapFont 实例后的位图字体对象
     */
    onFontLoaded(bitmapFont: Laya.BitmapFont): void {
        //注册位图字体
        Laya.Text.registerBitmapFont("gongfang", bitmapFont);

        //除非是注册位图字体（Laya.Text.registerBitmapFont）在字体显示前就完成，例如在Main入口类里注册。
        //否则，需要在完成位图字体的注册后，对于需要使用位图字体的对象，重设字体（font）
        this.btFont.font = "gongfang";
    }
}