import ShapeLib from "../shapeLib/ShapeLib.js"
import Modifier from "./Modifier.js"
/*Lattice 晶格化修改器
* createNodes()建立节点集合
* updateNodes()节点的更新方法，需在需要的时候手动更新，并对不同的节点执行不同的更新方法
* 节点的奇偶性：节点静态属性single为true，且未闭合，则为true
* createNode() 中的polyAttr 属性会覆盖节点对象的默认属性，之后还会被节点对象的自定义属性覆盖
* polyAttr 可以是函数也可以是对象，其函数形态是避免复合对象的浅拷贝问题，比如lineDash数组对象
* */
const defAttr=()=>({type:'Point',poly:null, nodes:[]});
export default class Lattice extends Modifier{
    constructor(attr) {
        super(Object.assign(defAttr(),attr));
    }
    init() {
        this.createNodes();
    }

    createNodes(){
        const {poly:{close,vertices},type,nodes,fill}=this;
        const single= ShapeLib[type].single&&!close;
        let len=vertices.length;
        if(single){
            len-=1;
        }
        for (let i=0;i<len;i++) {
            this.createNode(i);
        }
    }
    createNode(ind){
        const {poly,type,nodes}=this;
        const {fillStyle,strokeStyle,lineWidth,lineDash,lineDashOffset,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY}=poly;
        const customAttr=this.getCustomAttr(ind);
        const node=new ShapeLib[type](
            customAttr,
            {fillStyle,strokeStyle,lineWidth,lineDash,lineDashOffset,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY}
        );
        nodes.push(node);
    }
    getCustomAttr(ind){
        const {type,poly:{vertices},nodes}=this;
        const len=vertices.length;
        const p1=vertices[ind];
        const p2=vertices[(ind+1)%len];
        console.log('-p1,p2',p1,p2)
        const attr={orign:vertices[ind]};
        switch (type) {
            case 'Arrow':
                attr.p1=p1;
                attr.p2=p2;
                break;
            default:
                //do sth
        }
        return attr;
    }
    update(){
        this.nodes.forEach(node=>{
            console.log('-----node',node)
            console.log('on update',node.p1,node.p2)
            node.update();
        })
    }
    draw(ctx){
        const {nodes,type}=this;
        nodes.forEach(node=>{
            node.draw(ctx);
        })
    }
}
