import Poly from "../core/Poly.js"
import Vector2 from "../core/Vector2.js"
import Shape from "./Shape.js"

/*Ball 圆点对象
*   single 静态属性，是否一线一点，可默认undefined
*   具备特有属性r
* */

export default class Ball extends Shape{
    constructor(...attrs) {
        super(...attrs,{r:5});
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