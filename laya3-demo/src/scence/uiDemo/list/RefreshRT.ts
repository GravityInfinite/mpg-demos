const { regClass, property } = Laya;

/** 拉动刷新的列表示例 
 * @readme 重点示范基于列表橡皮筋效果的上下拉动、列表滚动暂停、恢复、列表数据添加方式等，
 * 以及横向拉动单元格效果，与快捷跳转到指定的列表单元格位置等功能。
*/
@regClass()
export default class RefreshRT extends Laya.Script {

    @property({ type: Laya.List })
    private refreshList: Laya.List;

    @property({ type: Laya.Button })
    private toLine: Laya.Button;

    @property({ type: Laya.Button })
    private toTop: Laya.Button;

    @property({ type: Laya.Button })
    private toBottom: Laya.Button;

    @property({ type: Laya.Box })
    private refreshLoading: Laya.Box;

    @property({ type: Laya.Label })
    private lineNumber: Laya.Label;

    /** 滚动条效果是否停止 */
    private scrollBarIsStop: boolean = false;
    /** 消息生成的当前最大id值 */
    private msgIdNow: number = 1;
    /** 移动前的上次坐标位置 */
    private moveLastPos: Laya.Point;
    /** 列表单元是否已打开 */
    private itemIsOpen: boolean = false;
    /**展开的单元格索引ID */
    private itemOpenId: number = -1;
    /**展开的单元格对象 */
    private openedItem: Laya.Box;
    /** 记录模拟数据的红点状态 */
    private redHotStatus: Array<number> = [];
    /** 纪录鼠标按下状态，true为已按下，用于状态判断 */
    private mouseDown: boolean = false;
    constructor() { super(); }

    onEnable(): void {
        this.refreshList.array = this.createListData(9);
        this.refreshList.repeatY = this.refreshList.array.length;
        this.refreshList.vScrollBarSkin = "";
        //帧听几个操作按钮的点击事件
        this.toLine.on(Laya.Event.CLICK, this, this.onToLineBtn);
        this.toTop.on(Laya.Event.CLICK, this, this.onToTopBtn);
        this.toBottom.on(Laya.Event.CLICK, this, this.onToBottomBtn);
        //侦听鼠标在列表上的抬起处理
        this.refreshList.on(Laya.Event.MOUSE_UP, this, this.stageOnMouseUp);
        this.refreshList.on(Laya.Event.MOUSE_OUT, this, this.stageOnMouseUp);

        //游戏逻辑关联引擎的停止滚动接口
        this.refreshList.scrollBar.stopMoveLimit = this.scrollBarIsStopBind.bind(this);
        this.refreshLimit("dragTopLimit", 80);
        this.refreshLimit("dragBottomLimit", 80, 20);

        //绑定单元格鼠标处理
        this.refreshList.mouseHandler = new Laya.Handler(this, this.onListMouse);
    }

    stageOnMouseUp(): void {
        // console.log("??????????-----stageOnMouseUp", this.itemIsOpen, this.itemOpenId, this.openedItem);
        this.mouseDown = false;
    }

    /**
     * 处理列表刷新数据时的限制
     * @param eventName 要侦听的事件名
     * @param moveLimit 移动距离的上限，达到上限后才会抛出要侦听的事件
     * @param distance 相对布局，位于父节点的距离
     * @param time  需要加载多少毫秒后恢复
     */
    refreshLimit(eventName: string, moveLimit: number, distance: number = 0, time: number = 2000): void {
        if (eventName === "dragTopLimit") {
            //设置下拉的最大橡皮筋高度,只有在启用了停止滚动的功能后有效
            this.refreshList.scrollBar.topMoveLimit = moveLimit;
        } else if (eventName === "dragBottomLimit") {
            this.refreshList.scrollBar.bottomMoveLimit = moveLimit;
        }
        //帧听达到限制的事件，达到限制条件的时候再触发停止滚动的接口
        this.refreshList.scrollBar.on(eventName, this, () => {
            console.log("达到了滚动限制:" + eventName);
            //显示加载进度ui
            this.refreshLoading.visible = true;
            //处理加载ui的位置
            if (eventName === "dragTopLimit") {
                //先清理bottom的状态，避免top计算出错
                this.refreshLoading.bottom = NaN;
                this.refreshLoading.top = distance;
                //创建模拟数据
                var _arr = this.createListData(5, "顶部新增的标题");
                //加到源数据前面
                _arr = _arr.concat(this.refreshList.array);
                var index = 0 + 5;
                var line = 0;
                //所有的红点数据索引都增加
                if (this.redHotStatus.length > 0) {
                    for (let i = 0; i < this.redHotStatus.length; i++) {
                        this.redHotStatus[i] += 5;
                    }
                }

            } else if (eventName === "dragBottomLimit") {
                this.refreshList.scrollBar.disableDrag = true;
                //先清理top的状态，避免bottom计算出错
                this.refreshLoading.top = NaN;
                this.refreshLoading.bottom = distance;
                //创建模拟数据
                var _arr = this.createListData(5, "底部新增的标题");
                //加到源数据后面
                _arr = this.refreshList.array.concat(_arr);
                var index = this.refreshList.array.length - 1;
                var line = index + 5;

            }
            //停止滚动条
            this.scrollBarIsStop = true;
            //模拟数据加载效果，X秒后恢复
            Laya.timer.once(time, this, () => {
                //更新list数据源
                this.refreshList.array = _arr;
                this.refreshList.scrollTo(line);
                //将选中索引设定为该索引
                this.refreshList.selectedIndex = index;
                //恢复滚动条到原位
                this.scrollBarIsStop = false;
                this.refreshList.scrollBar.backToNormal();
                this.refreshLoading.visible = false;
            });
        });
    }


    /**列表的鼠标事件处理，常用于处理单元格上的点击事件等 */
    onListMouse(e: Laya.Event, index: number): void {
        // console.log("-----onListMouse", e.type, this.refreshList.getChildAt(0), e.target, index);

        if (e.type == Laya.Event.MOUSE_DOWN) {
            this.mouseDown = true;
            // console.log("===========MOUSE_DOWN", this.itemOpenId, JSON.stringify(this.redHotStatus), index);
            //如果单元格已经展开，则先恢复
            if (this.itemIsOpen) {
                this.itemIsOpen = false;
                this.itemOpenId = -1;
                Laya.Tween.to(this.openedItem, { "x": 0 }, 500, null, Laya.Handler.create(this, () => {
                    this.refreshList.scrollBar.disableDrag = false;
                }));
                // console.log("mouseDown+++++++++++++*****", this.itemOpenId, e.target.name, index);
            } else {
                //转换全局坐标为列表单元格的本地坐标并保存
                this.moveLastPos = e.target.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
                //鼠标按下的时候进行移动侦听
                e.target.on(Laya.Event.MOUSE_MOVE, this, this.onItemBoxMouseMove, [e.target, index]);
                // console.log("移动侦听", this.itemOpenId, e.target.name, index);
            }
        }
        if (e.type == Laya.Event.MOUSE_UP) {
            this.mouseDown = false;
            // console.log("??????????=====MOUSE_UP", this.itemIsOpen, this.itemOpenId, this.openedItem, index);
            // !(this.itemOnMouseUp()) && e.target.off(Laya.Event.MOUSE_MOVE, this, this.onItemBoxMouseMove);
            this.itemOnMouseUp();
        }

        if (e.type == Laya.Event.CLICK) {

            if (e.target.name == "flag") this.onClickFlag(index);
            //点击删除文本
            if (e.target.name == "del") this.onClickDel(index);
        }

    }

    /** 列表单元格上的鼠标抬起时处理恢复逻辑
     */
    itemOnMouseUp(): void {
        //抬起鼠标时，处理正打开的单元格
        if (this.itemIsOpen) {
            var targetX: number;
            //根据单元格x当前坐标，处理回缩还是展开。
            if (this.openedItem.x < -80) {
                targetX = -262;
            } else {
                this.itemIsOpen = false;
                targetX = 0;
            }
            //当前坐标不等于目标坐标时，才处理
            if (targetX !== this.openedItem.x) {
                //自动展开或恢复
                Laya.Tween.to(this.openedItem, { "x": targetX }, 500);
            }

            //在鼠标抬起的时候恢复列表滚动
            this.refreshList.scrollBar.disableDrag = false;

            //抬起或划出单元格的时候移除移动侦听
            if (this.itemOpenId !== -1) {
                this.openedItem.off(Laya.Event.MOUSE_MOVE, this, this.onItemBoxMouseMove);
                this.itemOpenId = -1;  //接触侦听后，恢复为未打开的状态

                // console.log("off1___33333333333333---this.openedItem", this.openedItem.name, this.itemOpenId, this.openedItem, this.itemIsOpen, this.refreshList.array);
            }

            // console.log("off2________移除移动侦听", this.itemOpenId, this.openedItem, this.itemIsOpen);
        }
        // console.log("off3________移除移动侦听", this.itemOpenId, this.openedItem, this.itemIsOpen);

        // return false;
    }

    /** 点击标记按钮处理
     * @param index 要删除的列表索引
    */
    onClickFlag(index: number): void {
        // console.log("((((((((((((--onClickFlag---------", JSON.stringify(this.redHotStatus), this.refreshList.array[index]);
        //检查红点是否已经是显示状态，
        var showRedHot: number = this.redHotStatus.indexOf(index);
        //红点不在列表中，说明当前index的单元格未显示红点
        if (showRedHot == -1) {
            //修改数据源，设置为显示红点
            this.refreshList.array[index].avatar = {};
            this.refreshList.array[index].avatar.redHot = { "visible": true }
            this.refreshList.array[index].flag = { "flagText": { "text": "标记已读" } };
            //把当前已显示红点的索引记录下来，用于点击判断
            this.redHotStatus.push(index);
        } else {
            this.refreshList.array[index].avatar = { "redHot": { "visible": false } };
            this.refreshList.array[index].flag = { "flagText": { "text": "标记未读" } };
            //清除红点索引记录
            this.redHotStatus.splice(showRedHot, 1);
            // console.log("11111", JSON.stringify(this.redHotStatus));
        }
        this.refreshList.refresh();
        // console.log("((((((((((((--onClickFlag+++++", JSON.stringify(this.redHotStatus), this.refreshList.array);
    }

    /** 单元格上的删除按钮点击逻辑 
     * @param index 要删除的列表索引
    */
    onClickDel(index: number): void {
        // console.log("((((((((((((del------------");
        //按索引删除
        this.refreshList.array.splice(index, 1);
        //清除已纪录的打开状态
        // this.itemIsOpen = false;
        this.itemOpenId = -1;
        //如果当前单元格有红点状态纪录，要把状态索引清除
        var showRedHot: number = this.redHotStatus.indexOf(index);
        if (showRedHot > -1) {
            this.redHotStatus.splice(index, 1);
        }

        //处理红点用于点击状态数据索引
        if (this.redHotStatus.length > 0) {
            for (let i = 0; i < this.redHotStatus.length; i++) {
                (this.redHotStatus[i] > index) && (this.redHotStatus[i] += 1);
            }
        }
        //刷新列表
        this.refreshList.refresh();
    }

    /** 列表当前单元格的鼠标移动事件的处理
     * @param item 单元格对象
     * @param index 单元格索引
    */
    onItemBoxMouseMove(item: Laya.Box, index: number): any {
        if (this.mouseDown) {
            //得到当前的本地坐标
            let mousePos = item.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
            //计算移动距离值
            let moveX = this.moveLastPos.x - mousePos.x;
            let moveY = this.moveLastPos.y - mousePos.y;

            //当左右划，并且是没有打开的时候，处理
            if (Math.abs(moveX) > Math.abs(moveY) && !(this.itemIsOpen)) {
                // console.log("@@@@---onItemBoxMouseMove", moveX, moveY);
                //存储正在打开的单元格对象，用于跨单元格恢复处理
                this.openedItem = item;
                //已进入划动状态
                this.itemIsOpen = true;
                //停止列表的上下滚动
                this.refreshList.scrollBar.disableDrag = true;
                //纪录下来打开的单元格索引，在下次重按之前，都会先处理该索引
                this.itemOpenId = index;
            }

            //划动状态的时候处理单元格x位置
            if (this.itemIsOpen) {
                this.openedItem.x -= moveX;
                // console.log("-------------move-------", { item }, { mousePos }, this.openedItem, this.itemIsOpen, this.itemOpenId);
                if (this.openedItem.x < -262) this.openedItem.x = -262;
                else if (this.openedItem.x > 0) this.openedItem.x = 0;
            }
        } else {
            this.refreshList.scrollBar.disableDrag = false;
            // console.log("没有按下的时候，划动", this.itemOpenId, this.openedItem);
        }
    }



    /** 关联引擎的滚动限制接口 */
    scrollBarIsStopBind(): boolean {
        return this.scrollBarIsStop;
    }

    /** 当点击跳转XX行的按钮时 */
    onToLineBtn(): void {
        let line: number = parseInt(this.lineNumber.text) - 1;
        //传入列表array的索引值，会将该索引作为第一个（可见的）起始索引
        this.refreshList.scrollTo(line);
        //并将选中索引设定为该索引
        (line < this.refreshList.array.length) && (this.refreshList.selectedIndex = line);
    }

    /** 当点击跳转顶部的按钮时 */
    onToTopBtn(): void {
        this.refreshList.scrollTo(0);
        //并将选中索引设定为该索引
        this.refreshList.selectedIndex = 0;
    }

    /** 当点击跳转底部的按钮时 */
    onToBottomBtn(): void {
        let line: number = this.refreshList.array.length - 1;
        //如果索引传值大于最大的可见起始索引时，只会拉到底，不会把传入的索引当成第一个可见索引
        this.refreshList.scrollTo(line);
        //并将选中索引设定为该索引
        this.refreshList.selectedIndex = line;
    }


    /** 创建list模拟数据
     * @param max 最大生成数量
     * @param msgTitle 标题文本
     */
    createListData(max: number = 5, msgTitle: string = "初始测试标题"): any {
        let _Date: Date = new Date();
        let _hour: string = (_Date.getHours() < 10) ? "0" + _Date.getHours() : "" + _Date.getHours();
        let _minute: string = (_Date.getMinutes() < 10) ? "0" + _Date.getMinutes() : "" + _Date.getMinutes();
        var _arr: Array<any> = [];

        for (var i: number = 0; i < max; i++) {
            let msgTime: any = { "text": _hour + " : " + _minute };
            _arr[i] = {};
            _arr[i].msgTime = msgTime;
            _arr[i].msgTitle = { "text": msgTitle + (this.msgIdNow + i) };
            //给img子节点直接设置数据源的方式，引擎是不支持的，但可以通过runtime类来修改数据源处理流程来实现，具体可参考本示例list单元格的Runtime类
            _arr[i].avatar = { "redHot": { "visible": false } };

            // console.log(".............", i, msgTime);
        }
        this.msgIdNow += i;
        return _arr;
    }

    onDisable(): void {
    }
}