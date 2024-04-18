const { regClass, property } = Laya;

import { UsePanelRTBase } from "./UsePanelRT.generated";
import Event = Laya.Event;
import Mouse = Laya.Mouse;

@regClass()
export default class UsePanelRT extends UsePanelRTBase {
    constructor() { super(); }

    onEnable(): void {
        if (!(Laya.Browser.onPC)) {
            this.topLab.text = "背景可拖拽，双指缩放改变大小";
        } else {
            this.panel.on(Event.MOUSE_OVER, this, () => { Mouse.cursor = "move" });
            this.panel.on(Event.MOUSE_OUT, this, () => { Mouse.cursor = "auto" });
        }
    }
}