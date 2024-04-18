const { regClass, property } = Laya;

@regClass()
export default class ComboBoxRT extends Laya.Script {
    @property({type:Laya.ComboBox})
    private combo1: Laya.ComboBox;
    @property({type:Laya.ComboBox})
    private combo2: Laya.ComboBox; 
    @property({type:Laya.Label})
    private selectedText: Laya.Label;     

    private comboList: Laya.List;

    constructor() { super(); }

    onEnable(): void {
        //模拟list数据
        var _dataSourece = this.getDataSourece();
        //通过预制体创建资源
        Laya.loader.load("prefab/ComboList.lh").then(res => {

            let node = res.create();
            this.comboList = node;

            //修改数据源，这里用模拟数据替代
            this.comboList.array = _dataSourece;
            //列表数据长度
            this.comboList.repeatY = _dataSourece.length;

            //将自定义的List数据替换给下拉框自己创建的list
            this.combo2.list = this.comboList;
            this.combo2.list.width = this.combo2.width;
            this.combo2.list.hScrollBarSkin = "";
            this.combo2.selectHandler = new Laya.Handler(this, this.onSelected2);
        });

        this.combo1.selectHandler = new Laya.Handler(this, this.onSelected1);
        // this.combo1.itemPadding = "20,5,5,25";
        // this.combo1.itemHeight = 70 ;
        // this.combo1.defaultLabel = "请选择下拉选项";
    }

    onSelected1(index: number): void {
        this.selectedText.text = "您选中了：" + this.combo1.selectedLabel;
        // this.selectedText.text = "您选中了：" + this.combo1.list.array[index].label;
    }

    onSelected2(index: number): void {
        this.selectedText.text = "您选中了：" + (index < 0 ? "" : this.comboList.array[index].label);
    }


    /**
     * 创建List用的模拟数据
     */
    getDataSourece(): Array<any> {
        for (var _data = [], i = 0; i < 10; i++) {
            _data[i] = { "optText": { "text": "选项" + (i + 1) } };
        }
        return _data;

    }

    onDisable(): void {
    }
}