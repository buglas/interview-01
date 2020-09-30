import Vector2 from "./Vector2.js"
import BaseGroup from "./BaseGroup.js"

/*默认属性*/
const defAttr=()=>({
    //变换相关
    scale:new Vector2(1,1),
    position:new Vector2(0,0),
    rotation:0,
});

/*Group 数组*/
export default class Group extends BaseGroup{
    constructor(attr={}){
        super(Object.assign(defAttr(),attr));
    }
    draw(ctx){
        const {children}=this;
        const {
            scale,position,rotation,
        }=this;
        ctx.save();
        ctx.translate(position.x,position.y);
        ctx.rotate(rotation);
        ctx.scale(scale.x,scale.y);
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