import { TreeListRTBase } from "./TreeListRT.generated";

const { regClass, property } = Laya;

@regClass()
export default class TreeListRT extends TreeListRTBase {


    onEnable(): void {
        //给tree设置xml数据源
        this.tree1.xml = this.getTreeData(true);
        this.tree2.xml = this.getTreeData(false);
    }

    getTreeData(_static: boolean): any {
        //初始化树状列表的数据源
        let treeData: string = "<data>";
        if (_static) {//写死的模拟数据
            //拼接模拟数据，最多只能是二层结构，不支持层级很深的结构。结合else里的程序创建的模拟数据格式与注释，加深理解xml数据规则
            treeData +=
                "<dir itemLabel='一级目录一' isOpen='false'>" +
                "<file itemLabel='二级子项1 '/>" +
                "<file itemLabel='二级子项2 '/>" +
                "<file itemLabel='二级子项3 '/>" +
                "<file itemLabel='二级子项4 '/>" +
                "<file itemLabel='二级子项5 '/>" +
                "</dir>" +
                "<dir itemLabel='一级目录二' isOpen='true'>" +
                "<file itemLabel='二级子项1 '/>" +
                "<file itemLabel='二级子项2 '/>" +
                "<file itemLabel='二级子项3 '/>" +
                "</dir>" +
                "<dir itemLabel='一级目录三' isOpen='false'>" +
                "<file itemLabel='二级子项1 '/>" +
                "<file itemLabel='二级子项2 '/>" +
                "<file itemLabel='二级子项3 '/>" +
                "<file itemLabel='二级子项4 '/>" +
                "<file itemLabel='二级子项5 '/>" +
                "</dir>" +
                "<file itemLabel='一级子项1 '/>" +
                "<file itemLabel='一级子项2 '/>";//一级子项与一级目录并列，二级子项会相对于一级目录缩进一些
        } else {//程序创建的模拟数据
            //模拟树状列表数据，拼接列表的数据源
            for (let i: number = 0; i < 5; i++) {
                //拼接目录数据结构（item标签这里可以自己定义标签名，用什么开头就用什么结束,但是title这里，一定要对应列表渲染单元的label文本节点name）
                treeData += "<item title='目录" + (i + 1) + "' isOpen='true'>";
                for (let j: number = 0; j < 5; j++) {
                    //拼接子项（即不会再有展开）的结构，(这里的subpage标签也是可以自己任意定义名称，title这里，一定要对应列表渲染单元的label文本节点name）
                    treeData += "<subpage title='子项标题" + (j + 1) + "' />";
                }
                //每一个子项的外层，要有一个完整的结束标签，目录开始用什么标签名就用什么标签名结束。
                treeData += "</item>";
            }
        }
        //数据源data标签，需要拼接一个结束标签；
        treeData += "</data>"
        //把字符串解析为xml对象并返回
        return new Laya.XML(treeData);;
    }
}