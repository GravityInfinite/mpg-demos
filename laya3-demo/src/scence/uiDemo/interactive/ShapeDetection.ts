const { regClass, property } = Laya;
import Rectangle = Laya.Rectangle;
/**
 * 形状的碰撞检测
 * @readme1 本示例基于教学出发，提供了多种检测方式。
 * 但，基于性能考虑，真实项目中，尽可能采用矩形检测，如果是圆形或有旋转，尽可能采用正圆的圆心检测。
 * 一定要精准检测的时候，尽可能先粗略检测发生碰撞后再精细检测。 
 * @readme2 碰撞需要检测全部，当碰撞物体较多时，需要用四叉树降低检测范围。
 */
 @regClass()
export default class ShapeDetection extends Laya.Script {
    /** 创建一个碰撞节点的矩形区对象，用于检测复用，可节省频繁检测的实例开销 */
    private _rect1: Rectangle = Rectangle.TEMP;
    /** 创建一个碰撞目标节点的矩形区对象，用于检测复用，可节省频繁检测的实例开销 */
    private _rect2: Rectangle = Rectangle.TEMP;

    /** 矩形检测 
     * @param self 本对象
     * @param target 目标对象
     * @returns boolean：true碰到，flase未碰到
    */
    rectDetection(self: Laya.Sprite, target: Laya.Sprite): boolean {
        //依据矩形顶点判断检测
        return !(//以下有一个条件成立就是未碰到，全都不成立就是碰上了
            self.x > target.x + target.width ||
            self.x + self.width < target.x ||
            self.y > target.y + target.height ||
            self.y + self.height < target.y
        );
    }

    /** 碰撞检测 
     * @param self 控制的碰撞发起对象
     * @param targets 被碰撞的目标对象
     * @param type 碰撞检测类型0：圆形检测，1：矩形检测，2：多边形检测 
     * @returns collisionNodes：被撞的节点对象
    */
    collisionWith(self: Laya.Sprite, targets: Array<any>, type: number): Array<any> {
        /** 被撞的节点对象 */
        let collisionNodes: Array<any> = [];
        if (type == 0) {
            /** 圆心点坐标 */
            var p1: Laya.Point = Laya.Point.create(),
                p1PivotX: number = self.width / 2,
                p1PivotY: number = self.height / 2,
                p2: Laya.Point = Laya.Point.create(),
                p1Radius: number,
                p2Radius: number;

            //圆心
            p1.x = self.x + p1PivotX;
            p1.y = self.y + p1PivotY;
            //半径
            p1Radius = this.rectToRadius(self.width, self.height);
        } else if (type == 2) {
            /** 被撞方的多边形各个顶点坐标 */
            var targetVertices: Array<any>,
                /** 碰撞方的多边形各个顶点坐标 */
                selfVertices: Array<any>;
            selfVertices = this.arrayToPoint(self);
        }

        for (let i = 0; i < targets.length; i++) {
            if (self == targets[i]) continue;
            switch (type) {
                case 0:
                    p2.x = targets[i].x + (targets[i].width / 2);
                    p2.y = targets[i].y + (targets[i].height / 2);
                    p2Radius = this.rectToRadius(targets[i].width, targets[i].height);

                    this.circleDetection(p1, p2, p1Radius + p2Radius) && collisionNodes.push(targets[i]);
                    // this.circlesCollision(p1, p2, p1Radius, p2Radius) && collisionNodes.push(targets[i]);
                    break;
                case 1:
                    this.rectDetection(self, targets[i]) && collisionNodes.push(targets[i]);
                    break;
                case 2:
                    //圆和多边形碰撞检测
                    if (self.name === "c1") {//碰撞方是圆形
                        targetVertices = this.arrayToPoint(targets[i]);
                        this.circleAndPolygonDetection(self, targetVertices, targets[i]) && collisionNodes.push(targets[i]);
                    } else if (targets[i].name === "c1") {//被撞方是圆形
                        this.circleAndPolygonDetection(targets[i], selfVertices, self) && collisionNodes.push(targets[i]);
                    } else {//多边形与多边形碰撞检测
                        targetVertices = this.arrayToPoint(targets[i]);
                        this.polygonDetection(selfVertices, targetVertices, self, targets[i]) && collisionNodes.push(targets[i]);
                    }
                    break;
            }
        }
        return collisionNodes;
    }

    /**
     * 圆和多边形的碰撞检测
     * @param circel 圆形碰撞方的节点对象
     * @param polygonVertices 多边形碰撞方的全部顶点坐标
     * @param polygonNode 多边形节点对象
     * @returns 
     */
    circleAndPolygonDetection(circel: Laya.Sprite, polygonVertices: Array<any>, polygonNode: Laya.Sprite): boolean {
        /** 多边形的边坐标数组 */
        let sides = this.getSides(polygonVertices),
            /** 投影轴 */
            axises: Array<any> = [],
            /** 碰撞方的圆心坐标 */
            circelCenter: Laya.Point = Laya.Point.create(),
            /**最近坐标点 */
            nearestPoint: Laya.Point = Laya.Point.create(),
            /** 圆的半径 */
            radius: number = circel.hitArea._hit._cmds[0].radius,
            /** 多边形顶点坐标 */
            targetList: Array<any> = this.getNodeCoord(polygonVertices, polygonNode);

        //设置圆心坐标
        circelCenter.x = circel.x + circel.hitArea._hit._cmds[0].x;
        circelCenter.y = circel.y + circel.hitArea._hit._cmds[0].y;

        //计算离圆最近的多边形顶点坐标
        nearestPoint = this.getNearestPoint(circelCenter, targetList);
        axises.push(new Laya.Point(nearestPoint.x - circelCenter.x, nearestPoint.y - circelCenter.y));

        //多边形各边的法线(投影轴)
        for (let i: number = 0, len: number = sides.length; i < len; i++) axises.push(this.perpendicular(sides[i]));

        for (let i: number = 0, len: number = axises.length; i < len; i++) {
            let axis = axises[i],
                s = this.getCircleProjection(circelCenter, axis, radius),
                t = this.getPolygonProjection(targetList, axis);

            //如果不发生投影重叠，直接退出检测，否则就要检测每一条边
            if (!this.isOverlap(s, t)) return false;
        }

        return true;
    }

    /**
     * 获得离圆最近的多边形顶点坐标
     * @param circelCenter 圆心坐标 
     * @param list 多边形所有顶点的节点位置坐标
     * @returns nearestPoint 最近的点
     */
    getNearestPoint(circelCenter: Laya.Point, list: Array<any>): Laya.Point {
        /**最近坐标点 */
        let nearestPoint: Laya.Point = list[0],//先从多边形第一个顶点开始算
            /** 最短的直线距离 */
            minDistance: number = this.getDistance(circelCenter, nearestPoint),
            /** 用于遍历计算的当前坐标点 */
            nowPoint: Laya.Point,
            /** 用于遍历计算的的当前直线距离 */
            nowDistance: number;

        //遍历所有顶点（除去已算的），算出两点间最短的直线距离
        for (let i: number = 1; i < list.length; i++) {
            nowPoint = list[i];
            nowDistance = this.getDistance(circelCenter, nowPoint);
            //记录更小的坐标点与直线距离
            if (nowDistance < minDistance) {
                minDistance = nowDistance;
                nearestPoint = nowPoint;
            }
        }
        return nearestPoint;
    }


    /** 多边形碰撞检测
     * @param selfVertices 碰撞方的顶点坐标
     * @param targetVertices 被撞方的顶点坐标
     */
    polygonDetection(selfVertices: Array<any>, targetVertices: Array<any>, selfNode: Laya.Sprite, targetNode: Laya.Sprite): boolean {
        /** 两个多边形边 拼成的全部边数组 */
        let sides = this.getSides(selfVertices).concat(this.getSides(targetVertices)),
            /** 投影轴 */
            axises: Array<any> = [],
            /** 多边形顶点坐标 */
            selfList: Array<any> = this.getNodeCoord(selfVertices, selfNode),
            targetList: Array<any> = this.getNodeCoord(targetVertices, targetNode);

        //获得各边的法线(投影轴)
        for (let i: number = 0, len: number = sides.length; i < len; i++) axises.push(this.perpendicular(sides[i]));

        for (let i: number = 0, len: number = axises.length; i < len; i++) {
            let axis = axises[i],
                s = this.getPolygonProjection(selfList, axis),
                t = this.getPolygonProjection(targetList, axis);

            //如果不发生投影重叠，直接退出检测，否则就要检测每一条边
            if (!this.isOverlap(s, t)) return false;
        }
        return true;
    }



    /** 判断投影集合是否存在交集，也就是发生投影重叠 
     * @param self 碰撞方的投影集合
     * @param target 碰撞目标的投影集合
    */
    isOverlap(self: any, target: any): boolean {
        let min: number, max: number;
        //双方的最小值
        min = (self.min < target.min) ? self.min : target.min;
        //双方的最大值
        max = (self.max > target.max) ? self.max : target.max;
        //交集的判断,条件为真则存在交集
        return (self.max - self.min) + (target.max - target.min) >= max - min;
    }


    /** 取得多边形各个顶点的节点位置坐标 */
    getNodeCoord(vertices: Array<any>, node: Laya.Sprite): Array<any> {
        let _arr: Array<any> = [];
        for (let i: number = 0; i < vertices.length; i++) {
            let _point: Laya.Point = Laya.Point.create();
            _point.x = vertices[i].x + node.x + node.hitArea._hit._cmds[0].x;
            _point.y = vertices[i].y + node.y + node.hitArea._hit._cmds[0].y;
            _arr.push(_point);
        }
        return _arr;
    }

    /** 获得多边形的最大与最小投影点
     * @param list 多边形顶点坐标 
     * @param axis 边的法线
    */
    getPolygonProjection(list: Array<any>, axis: Laya.Point): any {
        let min = null, max = null;

        for (let i = 0; i < list.length; i++) {
            /** 投影点的计算 */
            let projection = this.dotProduct(list[i], axis) / this.getLength(axis);

            //投影点小于最小值时，存为新的投影最小值
            (min === null || projection < min) && (min = projection);
            //投影点大于最大值时，存为新的投影最大值
            (max === null || projection > max) && (max = projection);
        }
        //返回投影点最小与最大值
        return { min: min, max: max };
    }

    /** 获得圆形的最大与最小投影点 
     * @param circelCenter 圆心坐标
     * @param axis 边的法线
     * @param circleRadius 圆的半径
    */
    getCircleProjection(circelCenter: Laya.Point, axis: Laya.Point, circleRadius: number): any {
        /** 投影点的计算 */
        let projection = this.dotProduct(circelCenter, axis) / this.getLength(axis);
        //返回投影点最小与最大值
        return { min: projection - circleRadius, max: projection + circleRadius };
    }

    /** 已知矩形边，求相切的同心圆半径 
     *  @param width 矩形宽
     *  @param height 矩形高
     *  @return 半径长度
     * */
    rectToRadius(width: number, height: number): number {
        let radius: number;
        //圆在正方形之内的内切圆，直接取边长的一半作为半径
        if (width == height) {
            radius = width / 2;
        } else {//圆包裹着矩形,以矩形对角线交点为圆心时，取对角线长的一半作为半径
            radius = Math.sqrt(width * width + height * height) / 2;
        }
        return radius;
    }

    /** 圆形碰撞检测 
     * @param p1 本对象圆心坐标
     * @param p2 目标对象圆心坐标
     * @param distance 碰撞距离（两个半径和）
     * @returns boolean true:发生碰撞，false:未碰撞
    */
    circleDetection(p1: Laya.Point, p2: Laya.Point, distance: number): boolean {
        //判断两个圆心的直线距离是否小于或等于两个碰撞圆的半径和
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) <= distance;
    }

    /** 圆形碰撞检测（分离轴） 
     * @param p1 碰撞方的圆心坐标
     * @param p2 被撞方的圆心坐标
     * @param p1Radius 碰撞方的半径
     * @param p2Radius 被撞方的半径
    */
    circlesCollision(p1: Laya.Point, p2: Laya.Point, p1Radius: number, p2Radius: number): boolean {
        let axis = this.subtract(p1, p2),
            s = this.getCircleProjection(p1, axis, p1Radius),
            t = this.getCircleProjection(p2, axis, p2Radius);

        //重叠即碰撞，否则没碰上
        if (this.isOverlap(s, t)) return true;
        return false;
    }

    /** 
     * 把一维数组转换为二维坐标数组
     * @param sp 节点对象
     */
    arrayToPoint(sp: Laya.Sprite): Array<any> {
        let points: Array<any> = [], hitPoints: Array<any> = [];
        hitPoints = sp.hitArea._hit._cmds[0].points;
        if (hitPoints && hitPoints.length > 3) {
            for (let i = 0; i < hitPoints.length / 2; i++) {
                points[i] = Laya.Point.create();
                points[i].x = hitPoints[i * 2];
                points[i].y = hitPoints[i * 2 + 1];
            }
        }
        return points;
    }

    /** 
     * 边的法线
     */
    perpendicular(p: Laya.Point): Laya.Point {
        let _temp: Laya.Point = Laya.Point.create();
        //把y坐标点投到x轴上
        _temp.x = p.y;
        _temp.y = -p.x;
        return _temp;
    }

    /** 获得法向量 
     * @param p 坐标点
    */
    getNormal(p: Laya.Point): Laya.Point {
        //向量大小
        let sum = Math.sqrt(p.x * p.x + p.y * p.y);
        //法向量
        return new Laya.Point(p.y / sum, (0 - p.x) / sum);
    }

    /** 获得多边形的边（向量坐标） 
     * @param vertices 顶点坐标数组
     * @returns Array<any> 边坐标数组
    */
    getSides(vertices: any): Array<any> {
        var list = vertices,
            /** 顶点数量 */
            length = list.length,
            /** 边的数组 */
            sides = new Array();

        //顶点不小于3个即为多边形
        if (length >= 3) {
            for (var i = 1, lastPoint = list[0]; i < length; i++) {
                let nowPoint = list[i];
                //后一个顶点坐标减前一个顶点坐标，得到的值作为边向量坐标
                sides.push(this.subtract(nowPoint, lastPoint));
                //把当前坐标，转存为上一个坐标
                lastPoint = nowPoint;
            }
            //最后一个边，用第0个数组的顶点减去最后一个，形成封闭的边
            sides.push(this.subtract(list[0], list[length - 1]));
        }
        return sides;
    }

    /**
     * 获得坐标的长度，把二维坐标点转换为一维长度
     * @param p 坐标点
     */
    getLength(p: Laya.Point): number {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    /**
     * 点乘运算，把向量降维成标量
     * @param p1 坐标点
     * @param p2 坐标点
     */
    dotProduct(p1: Laya.Point, p2: Laya.Point): number {
        return p1.x * p2.x + p1.y * p2.y;
    }

    /** 坐标相减
     * @param p2 当前坐标
     * @param p1 上一个坐标
     */
    subtract(p2: Laya.Point, p1: Laya.Point): Laya.Point {
        let _point: Laya.Point = Laya.Point.create();
        return _point.setTo(p2.x - p1.x, p2.y - p1.y);
    }

    /** 已知两个坐标点，求两者的距离长度 
     * @param p1 坐标点
     * @param p2 坐标点
    */
    getDistance(p1: Laya.Point, p2: Laya.Point): number {
        let dx = p1.x - p2.x,
            dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

}