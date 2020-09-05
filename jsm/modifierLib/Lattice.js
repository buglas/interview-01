import ShapeLib from "../shapeLib/ShapeLib.js"
/*Lattice 晶格化修改器
* createNodes()建立节点集合
* updateNodes()节点的更新方法，需在需要的时候手动更新，并对不同的节点执行不同的更新方法
* 节点的single特性：节点静态属性single为true，且未闭合，则为true
* createNode() 中的polyAttr 属性会覆盖节点对象的默认属性，之后还会被节点对象的自定义属性覆盖
* polyAttr 可以是函数也可以是对象，其函数形态是避免复合对象的浅拷贝问题，比如lineDash数组对象
* */
const defAttr=()=>({type:'Point',poly:null, nodes:[]});
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
        const node=new ShapeLib[type](
            {orign:vertice},
            {fillStyle,strokeStyle,lineWidth,lineDash,lineDashOffset,shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY}
        );
        nodes.push(node);
    }
    updateNodes(){
        const {type,poly:{vertices},nodes}=this;
        console.log('vertices',vertices);
        switch (type) {
            case 'Arrow':
                const len=vertices.length;
                nodes.forEach((node,ind)=>{
                    console.log('node',node);
                    const p1=vertices[ind];
                    const p2=vertices[(ind+1)%len];
                    node.p1=p1;
                    node.p2=p2;
                    node.update();
                })
                break;
            default:
                //do sth
        }

    }
    draw(ctx){
        const {nodes,type}=this;
        nodes.forEach(node=>{
            node.draw(ctx);
        })
    }
}
