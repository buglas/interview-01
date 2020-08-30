import ShapeLib from "../shapeLib/ShapeLib.js"
/*
* createNodes()建立节点集合
* updateNodes()节点的更新方法，需在需要的时候手动更新
* 节点的single特性：节点静态属性single为true，且未闭合，则为true
* */
export default class Lattice{
    static defAttr={
        type:'Ball',
        poly:null,
        nodes:[]
    }
    constructor(option) {
        Object.assign(this,Lattice.defAttr,option);
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
        const polyAttr={fillStyle,strokeStyle,lineWidth,lineDash,lineDashOffset,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY}
        const defAttr=ShapeLib[type].defAttr;
        ShapeLib[type].defAttr=Object.assign(polyAttr,defAttr);
        const node=new ShapeLib[type]({
            orign:vertice
        });
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
