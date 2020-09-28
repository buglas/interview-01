import Poly from "../core/Poly.js"
import Vector2 from "../core/Vector2.js"
import Shape from "./Shape.js"

/*Rect 矩形对象-普通图形|晶格化修改器节点
*   align 对齐方式，默认左上角lt，可为center
*       lt 左上角,默认
*       center 居中
*   size 尺寸
*   min 左上点
*   max 右下点
* */

export default class Rect extends Shape{
    constructor(...attrs) {
        super(...attrs,{
            align:'lt',
            size:new Vector2(),
            min:new Vector2(),
            max:new Vector2(),
            close:true
        });
        this.update();
    }
    update() {
        const {min:{x:minX,y:minY},max:{x:maxX,y:maxY}}=this.setBound();
        this.vertices=[
            new Vector2(minX,minY),
            new Vector2(maxX,minY),
            new Vector2(maxX,maxY),
            new Vector2(minX,maxY),
        ]
    }
    /*设置编辑*/
    setBound(){
        const {align,min,max,orign:{x,y},size:{x:w,y:h}}=this;
        let l=0;
        let t=0;
        if(align==='center'){
            l=x-w/2;
            t=y-h/2;
        }else {
            l=x;
            t=y;
        }
        min.x=l;
        min.y=t;
        max.x=l+w;
        max.y=t+h;
        return {min,max}
    }
}
