import Poly from "../core/Poly.js"
import Vector2 from "../core/Vector2.js"
import Shape from "./Shape.js"

/*Rect 矩形对象-普通图形|晶格化修改器节点
*   single 静态属性，是否一线一点，可默认undefined
*   orign 定原点,可为center，基点在中心
*   width 宽度，默认0
*   height 高度，默认0
* */

export default class Rect extends Shape{
    constructor(...attrs) {
        super(...attrs,{width:0,height:0,close:true});
        this.update();
    }
    update() {
        const {orign,width,height}=this;
        let x=0;
        let y=0;
        if(orign==='center'){
            x=width/2;
            y=height/2;
        }else {
            x=orign.x;
            y=orign.y;
        }
        this.vertices=[
            new Vector2(-x,-y),
            new Vector2(width-x,-y),
            new Vector2(width-x,height-y),
            new Vector2(-x,height-y),
        ]
    }
}
