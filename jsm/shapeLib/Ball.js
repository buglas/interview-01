import Poly from "../Poly.js"
import Vector2 from "../Vector2.js"
import Shape from "./Shape.js"

export default class Ball extends Shape{
    static single=false;
    static defAttr={
        r:5,
        fill:true,
    };
    constructor(attr={}) {
        super({defAttr:Ball.defAttr,attr});
    }
    crtPath(ctx){
        const {orign,r}=this;
        ctx.beginPath();
        ctx.arc(
            orign.x,orign.y,r,
            0,Math.PI*2,
        )
    }
}