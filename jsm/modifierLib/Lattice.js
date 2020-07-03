import ShapeLib from "../shapeLib/ShapeLib.js"

export default class Lattice{
    constructor(option) {
        Object.assign(this,{type:'Ball'},option);
        this.obj=null;
        this.nodes=[];

    }
    update(){
        const {obj,type,nodes}=this;
        obj.vertices.forEach(vertice=>{
            const node=new ShapeLib[type]();
            node.fillStyle=obj.fillStyle;
            node.strokeStyle=obj.strokeStyle;
            node.lineWidth=obj.lineWidth;
            node.lineDash=obj.lineDash;
            node.lineDashOffset=obj.lineDashOffset;
            node.shadowColor=obj.shadowColor;
            node.shadowBlur=obj.shadowBlur;
            node.shadowOffsetX=obj.shadowOffsetX;
            node.shadowOffsetY=obj.shadowOffsetY;
            node.position=vertice;
            nodes.push(node);
        })
    }
    draw(ctx){
        const {nodes}=this;
        nodes.forEach(node=>{
            node.draw(ctx);
        })
    }
}
