import { DialogRTBase } from "./DialogRT.generated";

const { regClass, property } = Laya;

@regClass()
export default class DialogRT extends DialogRTBase {
 

    constructor() { super(); }

    onAwake(): void {

        this.dialogTitle.text = "弹窗的标题";
        this.dialogText.text = "弹窗的具体文本……";

        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            this.close();
        });
    }

    onDisable(): void {
    }
}