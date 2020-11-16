import Vector2 from "../../core/Vector2.js"
import Text from "../../shapeLib/Text.js"
import {getNormalExpandLineABC} from "../../core/Math2.js"

/*文本*/

export default class Label extends Text{
    constructor(...attrs) {
        super(...attrs,{textAlign:'center',textBaseline:'middle',fill:true,fontSize:16});
        this.update();
    }
    update() {
        const {i0,dir,fontSize,v0,orign,parent:{labels}} = this;
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

