import Vector2 from "../core/Vector2.js"
import Text from "./Text.js"
import {getNormalExpandLineABC} from "../core/Math2.js"

/*箭头-晶格化修改器的节点
*   single 静态属性，是否一线一节点，默认undefined
*   v0 起点
*   vF 结束点
*   a1|a2 箭头点
*   size 箭头尺寸
*   arrowRadian 箭头夹角
* */

export default class Label extends Text{
    constructor(...attrs) {
        super(...attrs,{textAlign:'center',textBaseline:'middle',fill:true});
        this.update();
    }
    update() {
        const {i0,dir,fontSize,v0,orign,modifier: {labels}} = this;
        this.text = labels[i0];
        const w=this.getWidth();
        const vo=getVo(dir,w,fontSize);
        orign.x=v0.x+vo.x;
        orign.y=v0.y+vo.y;
    }

}
function getVo(dir,w,h){
    const hw=w/2;
    const r=Math.sqrt(hw*hw*2);
    const s=w/h;
    const xOut=Math.cos(dir)*r;
    const yOut=Math.sin(dir)*r/s;
    return new Vector2(xOut,yOut);
}

