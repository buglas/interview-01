import Poly from "../Poly.js"
import Vector2 from "../Vector2.js"
import Shape from "./Shape.js"
const defAttr={
    r:5,
    fill:true,
}
export default class Ball extends Shape{
    static single=false;
    constructor(...attrs) {
        console.log('attrs',attrs);
        super(attrs,defAttr);
        console.log(this.orign);
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