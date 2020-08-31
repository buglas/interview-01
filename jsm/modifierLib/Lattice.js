import ShapeLib from "../shapeLib/ShapeLib.js"
import Vector2 from "../Vector2.js"
/*
* createNodes()建立节点集合
* updateNodes()节点的更新方法，需在需要的时候手动更新
* 节点的single特性：节点静态属性single为true，且未闭合，则为true
* createNode() 中的polyAttr 属性会覆盖节点对象的默认属性，之后还会被节点对象的自定义属性覆盖
* polyAttr 可以是函数也可以是对象，其函数形态是避免复合对象的浅拷贝问题，比如lineDash数组对象
* */
const defAttr=()=>({type:'Ball',poly:null, nodes:[]});
export default class Lattice{
    constructor(option) {
        Object.assign(this,defAttr(),option);
    }
    createNodes(){
        const {poly:{close,vertices},type,nodes,fill}=this;
        const single= ShapeLib[type].single&&!close;
        let len=vertices.length;
        if(single){
            len-=1;
        }
        for (let i=0;i<len;i++) {
            this.createNode(vertices[i]);
        }
    }
    createNode(vertice){
        const {poly,type,nodes}=this;
        const {fillStyle,strokeStyle,lineWidth,lineDash,lineDashOffset,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY}=poly;
        const polyAttr=()=>({fillStyle,strokeStyle,lineWidth,lineDash,lineDashOffset,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY});
        const node=new ShapeLib[type]({orign:vertice},polyAttr);
        nodes.push(node);
    }
    updateNodes(){
        const {poly,nodes}=this;
        nodes.forEach((node,ind)=>{
            node.update({ind,poly});
        })
    }
    draw(ctx){
        const {nodes,type}=this;
        nodes.forEach(node=>{
            node.draw(ctx);
        })
    }
}
