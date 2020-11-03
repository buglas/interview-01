import Vector2 from "../../core/Vector2.js"
import Shape from "../../shapeLib/Shape.js"

/*箭头-晶格化修改器的节点
*   single 静态属性，是否一线一节点，默认undefined
*   v0 起点
*   vF 结束点
*   a1|a2 箭头点
*   size 箭头尺寸
*   arrowRadian 箭头夹角
* */

function defAttr(){
    return {
        v0:new Vector2(),
        vF:new Vector2(),
        a1:new Vector2(),
        a2:new Vector2(),
        size:24,
        arrowRadian:Math.PI/6,
        stroke:true
    }
}

export default class Arrow extends Shape{
    static single=true;
    constructor(...attrs) {
        super(...attrs,defAttr);
        this.update();
    }
    update(){
        const {v0,vF,a1,a2,arrowRadian,parent}=this;
        const {size}=parent;
        const delta=v0.clone().sub(vF);
        delta.setLength(size);
        a1.copy(delta.clone().rotate(arrowRadian).add(vF));
        a2.copy(delta.clone().rotate(-arrowRadian).add(vF));
    }
    crtPath(ctx){
        const {vF,a1,a2}=this;
        ctx.beginPath();
        ctx.moveTo(a1.x,a1.y);
        ctx.lineTo(vF.x,vF.y);
        ctx.moveTo(a2.x,a2.y);
        ctx.lineTo(vF.x,vF.y);
    }
}
