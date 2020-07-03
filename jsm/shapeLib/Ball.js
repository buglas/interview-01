import Poly from "../Poly.js"
import Vector2 from "../Vector2.js"

export default class Ball{
    constructor() {
        this.r=5;
        this.fill=true;
        this.orign=new Vector2();
        this.position=new Vector2();
    }
    draw(ctx){
        const {orign,r,position}=this;
        ctx.save();
        ctx.translate(position.x,position.y);
        ctx.beginPath();
        ctx.arc(
            orign.x,orign.y,r,
            0,Math.PI*2,
        );
        ctx.fill();
        ctx.restore();
    }
}