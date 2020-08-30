import Poly from "../Poly.js"
import Vector2 from "../Vector2.js"
import Shape from "./Shape.js"


export default class Arrow extends Shape{
    static single=true;
    static defAttr={
        p1:new Vector2(),
        p2:new Vector2(),
        a1:new Vector2(),
        a2:new Vector2(),
        size:24,
        stroke:true,
        arrowRadian:Math.PI/6
    };
    constructor(attr={}) {
        super({defAttr:Arrow.defAttr,attr});

    }
    update({ind,poly:{vertices}}){
        const len=vertices.length;
        this.p1=vertices[ind];
        this.p2=vertices[(ind+1)%len];
        const {p1,p2,a1,a2,size,arrowRadian}=this;
        const delta=p1.clone().sub(p2);
        delta.setLength(size);
        const dir=delta.angle();
        this.a1=delta.clone().rotate(arrowRadian).add(p2);
        this.a2=delta.clone().rotate(-arrowRadian).add(p2);
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