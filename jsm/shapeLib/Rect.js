import Poly from "../core/Poly.js"
import Vector2 from "../core/Vector2.js"
import Shape from "./Shape.js"

/*Rect 矩形对象-普通图形|晶格化修改器节点
*   orign 定原点,可为center，基点在中心
*   size 尺寸
* */

export default class Rect extends Shape{
    constructor(...attrs) {
        super(...attrs,{
            size:new Vector2(),
            min:new Vector2(),
            close:true
        });
        this.update();
    }
    update() {
        const {min,size:{x:w,y:h}}=this;
        const {x:l,y:t}=this.getMin();
        this.vertices=[
            new Vector2(-l,-t),
            new Vector2(w-l,-t),
            new Vector2(w-l,h-t),
            new Vector2(-l,h-t),
        ]
        min.x=l;
        min.y=t;
    }
    getMin(){
        const {min,orign,size:{x:w,y:h}}=this;
        let l=0;
        let t=0;
        if(orign==='center'){
            l=w/2;
            t=h/2;
        }else {
            l=orign.x;
            t=orign.y;
        }
        return new Vector2(l,t);
    }
}
