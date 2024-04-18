import { LoopListRTBase } from "./LoopListRT.generated";

const { regClass } = Laya;

@regClass()
export default class LoopListRT extends LoopListRTBase {

    /**左划的限制，达到限制后右侧增加item数据 */
    private leftLimit: number;
    /**右划的限制，达到限制后左侧增加item数据 */
    private rightLimit: number;

    onEnable(): void {
        //初始数据源
        this.hList.array = this.getListDataSource();

        //把数据索引为1的item设定为可视列表第一项，让右划更平滑
        this.hList.scrollTo(1);

        //取得居中的头像对象
        let icon = this.hList.cells[1].getChildByName("icon") as Laya.Image;
        //把居中的cell头像放大2倍
        icon.scaleX = icon.scaleY = 2;

        // this.hList.disableStopScroll = true;
        //侦听滚动条，按滑动条值的条件处理循环逻辑
        this.hList.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange);
        //设置头像改变的坐标限制
        this.leftLimit = this.getLeftLimit();
        this.rightLimit = this.getRightLimit();
    }

    onScrollBarChange(): void {
        var sliderValue = this.hList.scrollBar.value;
        var listArr = this.hList.array;
        //达到左划限制，删除第一个，加到右侧
        if (sliderValue > this.leftLimit) {
            var cell = listArr.shift();
            listArr[listArr.length] = cell;
            this.hList.array = listArr;
            //重设滚动条位置值，无缝衔接
            this.hList.scrollBar.value = sliderValue - this.hList.cells[0].width - this.hList.spaceX;
            this.iconTweenToLeft();

        } else if (sliderValue < this.rightLimit) {//达到右划限制，删除最后一个，加到开头    
            cell = listArr.pop();
            listArr.unshift(cell);
            this.hList.array = listArr;
            this.hList.scrollBar.value = sliderValue + this.hList.cells[0].width + this.hList.spaceX;
            this.iconTweenToRight();
        }
    }

    /**
     * 左划缓动处理头像
     * @param time 缓动效果时间
     */
    iconTweenToLeft(time: number = 200) {
        //取得原放大的头像对象
        let iconOld = this.hList.cells[0].getChildByName("icon") as Laya.Image;
        //新的cell容器把值设置为2
        iconOld.scaleX = iconOld.scaleY = 2;
        //然后缓动缩小还原
        Laya.Tween.to(iconOld, { scaleX: 1, scaleY: 1 }, time);

        //取得新头像对象
        let icon = this.hList.cells[1].getChildByName("icon") as Laya.Image;
        //由于cell是复用的，先将值还原，否则没有缩放效果。
        icon.scaleX = icon.scaleY = 1;
        //缓动放大居中区域的头像
        Laya.Tween.to(icon, { scaleX: 2, scaleY: 2 }, time);
    }

    /**
     * 右划缓动处理头像
     * @param time 缓动效果时间
     */
    iconTweenToRight(time: number = 200) {
        //取得原放大的头像对象
        let iconOld = this.hList.cells[1].getChildByName("icon") as Laya.Image;
        //新的cell容器把值设置为2
        iconOld.scaleX = iconOld.scaleY = 2;
        //然后缓动缩小还原
        Laya.Tween.to(iconOld, { scaleX: 1, scaleY: 1 }, time);

        //取得新头像对象
        let icon = this.hList.cells[2].getChildByName("icon") as Laya.Image;
        //由于cell是复用的，先将值还原，否则没有缩放效果。
        icon.scaleX = icon.scaleY = 1;
        //缓动放大居中区域的头像
        Laya.Tween.to(icon, { scaleX: 2, scaleY: 2 }, time);
    }


    /**取得右划限制 */
    getRightLimit(): number {
        return this.hList.cells[0].width - this.hList.spaceX;
    }

    /**取得左划限制 */
    getLeftLimit(): number {
        return (this.hList.cells[0].width * 2) + this.hList.spaceX;
    }

    /**
     * 模拟数据源
     * @param length 生成的数组长度
     */
    getListDataSource(length: number = 5): Array<any> {
        let _arr: Array<any> = [];
        for (let i: number = 0; i < length; i++) {
            _arr[i] = {};
            _arr[i].icon = { "skin": `resources/UI/role/r${i}.png` };
        }
        return _arr;
    }
}