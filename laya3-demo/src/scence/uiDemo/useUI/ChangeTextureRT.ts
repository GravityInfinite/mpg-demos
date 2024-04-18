import { Script } from "../../../ItemBox";

const { regClass, property } = Laya;

// export default class ChangeTextureRT extends ui.uiDemo.useUI.ChangeTextureUI {
@regClass()
export default class ChangeTextureRT extends Laya.Script {
    @property({type:Laya.Image})
    private Img: Laya.Image;    
    @property({type:Laya.Sprite})
    private spImg: Laya.Sprite; 
    @property({type:Laya.Sprite})
    private graphicsSprite: Laya.Sprite; 
    @property({type:Laya.Sprite})
    private textureImg: Laya.Sprite;     

    private graphics: Laya.Graphics; 

    constructor() { super(); }

    onEnable(): void {
        this.graphics = this.graphicsSprite.graphics;
        Laya.timer.loop(2000, this, () => {
            this.changeImgSkin();
            this.changeSpriteTexture();
            this.changeFillTexture();
            this.changeTexture();
        });
    }

    /** 替换Image组件的资源 */
    changeImgSkin(): void {
        this.Img.skin = this.randomImg();
    }

    /**替换Sprite组件的资源 */
    changeSpriteTexture(): void {
        this.spImg.loadImage(this.randomImg(true, 6, 5));
    }

    /**替换FillTexture资源，基于Graphics绘图只能是重绘 */
    changeFillTexture(): void {
        //需要注意，调用clear方法会清除当前节点上的所有Graphics绘图（不含子节点），如果不想全部清，则需要把该不需要清除的Graphics绘图放到其它节点上。
        this.graphics.clear();
        let imgTexture : string = this.randomImg(true, 4);
        Laya.loader.load(imgTexture).then(res=>{
            //重绘纹理
            this.graphics.fillTexture(res, 0, 0, 1, 1);            
        });


    }

    /** 替换Texture资源，基于Graphics绘图只能是重绘 */
    changeTexture(): void {
        //清除this._textureImg节点下的所有绘图（不含子节点）
        this.textureImg.graphics.clear();
        //加载资源获得一个纹理对象
        let _texture: Laya.Texture = Laya.loader.getRes(this.randomImg(true, 8));
        //在this._textureImg节点上重绘纹理
        this.textureImg.graphics.drawTexture(_texture);
    }

    /** 生成随意图片地址 */
    randomImg(isMan: boolean = false, max: number = 8, min: number = 1): string {
        let mum = Math.floor(Math.random() * (max - min + 1)) + min;

        if (isMan) return "resources/UI/role/m" + mum + ".png";
        return "resources/UI/role/w" + mum + ".png"
    }

    onDisable(): void {
    }
}