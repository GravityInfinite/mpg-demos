const { regClass, property } = Laya;
@regClass()
export default class bgImg extends Laya.Script {
    declare owner: Laya.Image;
    /** x轴最大可拖坐标点 */
    private maxX: number = 0;
    /** x轴最小可拖坐标点 */
    private minX: number = -90;
    /** y轴最大可拖坐标点 */
    private maxY: number = 0;
    /** y轴最小可拖坐标点 */
    private minY: number = -580;

    /**每次滚轮的缩放大小 */
    private scaleSize: number = 0.1;

    /** 上次的距离值 */
    private lastDistance: number = 0;
    /** 缩放前的中心点坐标信息 */
    private lastPivot: Laya.Point;
    /** 开始单指拖拽模式 */
    private startedSingleTouchDrag: boolean = false;

    onEnable(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.onMouseWheel();
    }

    /** 帧听滚轮事件，并处理滚动 */
    onMouseWheel(): void {
        //处理滚轮事件的帧听
        this.owner.on(Laya.Event.MOUSE_WHEEL, this, (e: Laya.Event) => {
            //转换舞台坐标为本地坐标
            let point: Laya.Point = this.owner.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
            // this.addTestPoint(point);

            if (e.delta > 0) { //当滑轮向上滚动时  
                this.owner.scaleX += this.scaleSize;
                this.owner.scaleY += this.scaleSize;
            }
            if (e.delta < 0) { //当滑轮向下滚动时  
                this.owner.scaleX -= this.scaleSize;
                this.owner.scaleY -= this.scaleSize;
                //设置最小缩放值
                (this.owner.scaleX < 1) && (this.owner.scaleX = 1);
                (this.owner.scaleY < 1) && (this.owner.scaleY = 1);
            }

            //缩放后的鼠标位置
            let point2: Laya.Point = this.owner.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
            // this.addTestPoint(point2, "#ffffff");

            //计算缩放引发的xy偏移值
            let _offsetX = (point2.x - point.x) * this.owner.scaleX;
            let _offsetY = (point2.y - point.y) * this.owner.scaleY;

            //偏移的实际坐标位置
            _offsetX += this.owner.x;
            _offsetY += this.owner.y;

            //缩放后,图的宽高改变了，要更新边界限制
            this.updateLimit();

            //对于有边界限制的，要考虑偏移不要超过边界限制
            if (_offsetX > this.maxX) this.owner.x = this.maxX;
            else if (_offsetX < this.minX) this.owner.x = this.minX;
            else this.owner.x = _offsetX;

            if (_offsetY > this.maxY) this.owner.y = this.maxY;
            else if (_offsetY < this.minY) this.owner.y = this.minY;
            else this.owner.y = _offsetY;
        });
    }

    onStart(): void {
        //onStart 生命周期里得到的适配宽高比较准确
        this.updateLimit();
    }

    /** 更新边界限制 */
    updateLimit(): void {
        //父节点，panel
        let _parent = this.owner.parent as Laya.Panel;

        //设置初始值
        this.minX = Math.min(_parent.width - this.owner.width * this.owner.scaleX, 0);
        this.minY = Math.min(_parent.height - this.owner.height * this.owner.scaleY, 0);
    }

    onMouseDown(e: Laya.Event): void {
        e.stopPropagation();
        //当触摸操作的touch对象数组存在，并且大于1个触摸点，就认定为缩放
        if (e.touches && e.touches.length > 1) {
            if (this.startedSingleTouchDrag) {
                //当检测到第二个触点时停止拖动相关的处理，否则会与多点触摸处理事件冲突。
                this.owner.stopDrag();
                //改变状态，视为进入多指模式
                this.startedSingleTouchDrag = false;
            }
            let lastPivot = this.setPivot(e);
            //加个保护，个别浏览器（例如safari）有bug，可能偶尔遗失手势信息
            if (!(lastPivot.x) || !(lastPivot.y)) {
                console.log("(((((((((((((((((((((((", this.lastPivot, JSON.parse(JSON.stringify(e.touches)));
            } else {
                //把初始的touch空间位置通过开平方运算，记录为初始双指距离
                this.lastDistance = this.getDistance(e);
                //纪录缩放前的手指中心点坐标
                this.lastPivot = lastPivot;
                //多指按下的情况下，再去侦听手势移动事件并处理逻辑
                this.owner.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
                // this.addTestPoint(this.lastPivot);
            }
        }
        else { //单指模式
            this.owner.startDrag();//拖拽图片 
            this.startedSingleTouchDrag = true;
        }
    }

    onMouseUp(e: Laya.Event): void {
        //鼠标或手势抬起后，移除侦听
        this.owner.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }
    /** 计算两个触摸点坐标之间的距离 */
    getDistance(e: Laya.Event): number {
        //初始值为0
        var distance: number = 0;
        if (e.touches && e.touches.length > 1) {
            //计算距离
            let dx: number = e.touches[0].pos.x - e.touches[1].pos.x;
            let dy: number = e.touches[0].pos.y - e.touches[1].pos.y;
            distance = Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    }

    /** 鼠标（或手势）在对象上移动时触发的事件侦听方法 */
    mouseMove(e: Laya.Event): void {
        /**当前的双指距离*/
        let distance: number = this.getDistance(e);

        //设置缩放
        this.owner.scaleX += (distance - this.lastDistance) * (this.scaleSize / 10);
        this.owner.scaleY += (distance - this.lastDistance) * (this.scaleSize / 10);
        //设置缩放值值限制条件
        (this.owner.scaleX < 1) && (this.owner.scaleX = 1);
        (this.owner.scaleY < 1) && (this.owner.scaleY = 1);
        (this.owner.scaleX > 5) && (this.owner.scaleX = 5);
        (this.owner.scaleY > 5) && (this.owner.scaleY = 5);

        //缩放后的手势中心点位置(局部位置)
        let nowPivot = this.setPivot(e);
        //加个保护，个别浏览器（例如safari）有bug，可能偶尔遗失手势信息
        if (!(nowPivot.x) || !(nowPivot.y)) {
            console.log("$$$$$$$$$$$", nowPivot, JSON.parse(JSON.stringify(e.touches)));
        } else {
            // this.addTestPoint(nowPivot, "#ffffff");

            //缩放后,图的宽高改变了，要更新边界限制
            this.updateLimit();

            //计算缩放引发的xy偏移值
            let _offsetX = (nowPivot.x - this.lastPivot.x) * this.owner.scaleX;
            let _offsetY = (nowPivot.y - this.lastPivot.y) * this.owner.scaleY;

            //偏移的实际坐标位置
            _offsetX += this.owner.x;
            _offsetY += this.owner.y;

            //对于有边界限制的，要考虑偏移不要超过边界限制
            if (_offsetX > this.maxX) this.owner.x = this.maxX;
            else if (_offsetX < this.minX) this.owner.x = this.minX;
            else this.owner.x = _offsetX;

            if (_offsetY > this.maxY) this.owner.y = this.maxY;
            else if (_offsetY < this.minY) this.owner.y = this.minY;
            else this.owner.y = _offsetY;

            //保存当前值，用于下次计算
            this.lastDistance = distance;
        }
    }

    /**
     * 计算并设置多指的中心点坐标
     * @param touches 手势信息数组
     */
    setPivot(e: Laya.Event): Laya.Point {
        //加个保护，只在多指信息存在的时候才进行处理
        if (e.touches && e.touches.length >= 2) {
            let Point0: Laya.Point = this.owner.globalToLocal(new Laya.Point(e.touches[0].pos.x, e.touches[0].pos.y));
            let Point1: Laya.Point = this.owner.globalToLocal(new Laya.Point(e.touches[1].pos.x, e.touches[1].pos.y));
            return new Laya.Point((Point0.x + Point1.x) / 2, (Point0.y + Point1.y) / 2);
        }
        return this.lastPivot;

    }

    onUpdate(): void {
        //边界控制
        (this.owner.x > this.maxX) && (this.owner.x = this.maxX);
        (this.owner.x < this.minX) && (this.owner.x = this.minX);
        (this.owner.y > this.maxY) && (this.owner.y = this.maxY);
        (this.owner.y < this.minY) && (this.owner.y = this.minY);
        // console.log("---------_owner.xy++++++++++", this.owner.x, this.owner.y, this.maxX, this.maxY, this.minX, this.minY, this.owner);
    }

    /** 添加一个测试点
     * @param point 测试点坐标
     * @param size 测试点大小，圆的半径
     * @param color 测试点的颜色
     */
    addTestPoint(point: Laya.Point, color: string = "#ff0000", size: number = 2): void {
        let spTest = new Laya.Sprite();
        spTest.graphics.drawCircle(0, 0, size, color);
        this.owner.addChild(spTest);
        spTest.pos(point.x, point.y);
        // console.log("====---------", point.x, point.y)
    }
}