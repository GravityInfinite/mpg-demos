const { regClass, property } = Laya;
import ShapeDetection from "./ShapeDetection";
import { ShapeDetectionRTBase } from "./ShapeDetectionRT.generated";
@regClass()
export default class ShapeDetectionRT extends ShapeDetectionRTBase {
    /** 碰撞检测UI继承类的单例 */
    static i: ShapeDetectionRT;
    /** 脚本引用 */
    private _script: ShapeDetection;
    /** 检测类型 */
    private _detectionType: number = 0;
    /** 需要碰撞的节点 */
    private collisionNodes: Array<any> = null;

    constructor() {
        super();
        ShapeDetectionRT.i = this;
    }

    onEnable(): void {
        this.collisionNodes = [this.c1, this.p1, this.p2];
        //获取场景上的组件
        this._script = this.getComponent(ShapeDetection);
        //关联切换选项
        this.detectionType.selectHandler = new Laya.Handler(this, this.onSelected);
        //设置默认的选项
        this.detectionType.selectedIndex = 0;
        // this.setCircleLine([this.c11, this.p11, this.p22]);
        // this.onSelected(0);
    }

    /** 当选中某个选项时 */
    onSelected(index: number): void {
        console.log("onSelected:"+index);
        this._detectionType = index;
        switch (index) {
            case 0:
                this.setCircleLine([this.c11, this.p11, this.p22]);
                break;
            case 1:
                this.setRectLine([this.c11, this.p11, this.p22]);
                break;
            case 2:
                this.c11.graphics.clear();
                this.p11.graphics.clear();
                this.p22.graphics.clear();
                break;
        }
    }

    /** 碰撞检测 
     * @param self 发起碰撞的对象
    */
    collisionWith(self: Laya.Sprite): void {
        /** 被撞的对象 */
        let nodes: Array<any>;
        nodes = this._script.collisionWith(self, this.collisionNodes, this._detectionType);
        if (nodes.length > 0) {
            nodes.push(self);
            this.setLineWidth(nodes);
        } else {
            this.retsetLineWidth();
        }
    }

    /** 设置边框宽度 
     * @param nodes 节点对象数组
     */
    setLineWidth(nodes: Array<any>): void {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i]._graphics._cmds[0].lineWidth = 3;
        }
    }


    /** 重置边框宽度 */
    retsetLineWidth(): void {
        for (let i = 0; i < this.collisionNodes.length; i++) {
            this.collisionNodes[i]._graphics._cmds[0].lineWidth = 0;
        }
    }

    /** 设置圆形边线 
     * @param nodes 节点对象数组
     * @param lineWidth 线框宽度
     * @param lineColor 线的颜色
    */
    setCircleLine(nodes: Array<any>, lineWidth: number = 1, lineColor: string = "#1e00fb"): void {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].graphics.clear();
            let x: number = nodes[i].width / 2,
                y: number = nodes[i].height / 2,
                radius: number = this._script.rectToRadius(nodes[i].width, nodes[i].height);

            nodes[i].graphics.drawCircle(x, y, radius, null, lineColor, lineWidth);
        }
    }

    /** 设置矩形边线 
     * @param nodes 节点对象数组
     * @param lineWidth 线框宽度
     * @param lineColor 线的颜色
    */
    setRectLine(nodes: Array<any>, lineWidth: number = 1, lineColor: string = "#1e00fb"): void {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].graphics.clear();
            nodes[i].graphics.drawRect(nodes[i].x, nodes[i].y, nodes[i].width, nodes[i].height, null, lineColor, lineWidth);
        }
    }
}