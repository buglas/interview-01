import Vector2 from "../core/Vector2.js"
import Shape from "./Shape.js"

function defAttr(){
    return {
        p1:new Vector2(),
        p2:new Vector2(),
        a1:new Vector2(),
        a2:new Vector2(),
        size:24,
        stroke:true,
        arrowRadian:Math.PI/6
    }
}

/*箭头
*   single 静态属性，是否一线一节点，默认undefined
* */
export default class Arrow extends Shape{
    static single=true;
    constructor(...attrs) {
        super(...attrs,defAttr);
        this.update();
    }
    update(){
        const {p1,p2,a1,a2,size,arrowRadian}=this;
        console.log('p1,p2',p1,p2)
        const delta=p1.clone().sub(p2);
        delta.setLength(size);
        const dir=delta.angle();
        a1.copy(delta.clone().rotate(arrowRadian).add(p2));
        a2.copy(delta.clone().rotate(-arrowRadian).add(p2));
    }
    crtPath(ctx){
        const {p1,p2,a1,a2}=this;
        ctx.beginPath();
        ctx.moveTo(a1.x,a1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.moveTo(a2.x,a2.y);
        ctx.lineTo(p2.x,p2.y);
    }
}
