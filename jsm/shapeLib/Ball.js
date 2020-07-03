import Poly from "../Poly.js"

export default class Ball extends Poly{
    constructor() {
        super();
        this.r=5;
        this.fill=true;
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