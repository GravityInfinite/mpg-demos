import { ItemBoxBase } from "./ItemBox.generated";

const { regClass, property } = Laya;

@regClass()
export class Script extends ItemBoxBase {

    @property({ type: "string" })
    public text: string = "";

    constructor() {
        super();
    }

    get dataSource(): any {
        return super.dataSource;
    }
    set dataSource(value: any) {
        super.dataSource = value;
        if (!value) return;

        //把数据源里的值，给到子节点属性
        if (value.avatar) {
            let redHot = this.getChildByName("avatar").getChildByName("redHot") as Laya.Image;
            redHot.visible = value.avatar.redHot.visible;
        }

        if (value.flag) {
            let flagText = this.getChildByName("flag").getChildByName("flagText") as Laya.Text;
            flagText.text = value.flag.flagText.text;
        }
    }
}