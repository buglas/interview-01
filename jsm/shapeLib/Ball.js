import Shape from "./Shape.js"
import Vector2 from "../core/Vector2.js"

/*Ball 圆点对象-普通图形|晶格化修改器节点
*   r半径
* */

export default class Ball extends Shape{
    constructor(...attrs) {
        super(...attrs,{r:5,min:new Vector2(),max:new Vector2()});
    }
    getBoundary(){
        const {orign:{x,y},r}=this;
        this.min.copy({
            x:x-r,
            y:y-r,
        });
        this.max.copy({
            x:x+r,
            y:y+r,
        });
        return this;
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
