const { regClass, property } = Laya;

@regClass()
export default class BaseUI extends Laya.Script {

    private window :Laya.Scene;
    constructor() { super(); }

    //可以统一处理所有UI的事情，比如初始化UI，处理事件等等
    baseUI(ui :Laya.Scene): void {

        this.window = ui;
        
        this.searchCloseButton( ui );

    }

    //统一查找所有的Button，并查看是不是关闭button添加关闭场景事件
    searchCloseButton( node: Laya.Node ): void {

        //遍历所有的节点
        for( let i = 0; i < node.numChildren; i++ )
        {
            let child = node.getChildAt(i);
            if( child instanceof Laya.Button && child.name == "closeBtn" )
            {
                //添加关闭场景事件
                child.on(Laya.Event.MOUSE_DOWN, this, () => { this.window.close() });
                console.log("baseUI 发现closeBtn，统一添加关闭事件");
            }                
            else
                this.searchCloseButton( child );
        }
    }

    onDisable(): void {
    }
}