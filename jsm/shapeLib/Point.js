import Poly from "../Poly.js"
import Vector2 from "../Vector2.js"
import Shape from "./Shape.js"
import Ball from "./Ball.js"

/*Ball 圆点对象
*   single 静态属性，是否一线一点，可默认undefined
* */

const defAttr={
    r:5,
    fill:true,
}
export default class Point extends Ball{
    static single=false;
    constructor(...attrs) {
        super(...attrs,{r:5,fill:true});
    }
}