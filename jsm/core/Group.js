import Vector2 from "./Vector2.js"
import BaseGroup from "./BaseGroup.js"
import {transform} from '../utils/ShapeTool.js'

/*默认属性*/
const defAttr=()=>({
    //变换相关
    scale:new Vector2(1,1),
    position:new Vector2(0,0),
    rotation:0,
    sorf:'trs'
});

/*Group 数组*/
export default class Group extends BaseGroup{
    constructor(attr={}){
        super(Object.assign(defAttr(),attr));
    }
    draw(ctx){
        const {children}=this;
        ctx.save();
        transform.call(this,ctx);
        children&&children.forEach(obj=>{
            obj.draw(ctx);
        })
        ctx.restore();
    }
    update(){
        this.children.forEach(obj=>{
            obj.update();
        })
    }


}