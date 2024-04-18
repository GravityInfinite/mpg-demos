const { regClass, property } = Laya;

@regClass()
export default class PhysicalCollisionRT extends Laya.Script {
    @property({type:Laya.Image})
    private bTop: Laya.Image;    
    @property({type:Laya.Image})
    private bBottom: Laya.Image;   
    @property({type:Laya.Image})
    private bRight: Laya.Image;      
    @property({type:Laya.Image})
    private bLeft: Laya.Image; 

    onEnable(): void {
        this.bTop.getComponent(Laya.BoxCollider).width = this.bTop.width;
        this.bBottom.getComponent(Laya.BoxCollider).width = this.bBottom.width;
        this.bRight.getComponent(Laya.BoxCollider).height = this.bRight.height;
        this.bLeft.getComponent(Laya.BoxCollider).height = this.bLeft.height;
    }
}