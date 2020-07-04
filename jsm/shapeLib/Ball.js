import Poly from "../Poly.js"

export default class Ball extends Poly{
    constructor(param={r:5}) {
        super(param);
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