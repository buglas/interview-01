import Vector2 from "./Vector2.js"

/*默认属性*/
const defAttr=()=>({
    //父子级
    parent:null,
    children:[],
    //变换相关
    scale:new Vector2(1,1),
    position:new Vector2(0,0),
    rotation:0,
});

/*Group 数组*/
export default class Group{
    constructor(attr={}){
        Object.assign(this,defAttr(),attr);
    }
    add(obj){
        const {children}=this;
        children.push(obj);
        obj.parent=this;
    }
    unshift(obj){
        const {children}=this;
        children.unshift(obj);
        obj.parent=this;
    }
    remove(obj){
        const {children}=this;
        const index = children.indexOf(obj);
        if (index!==-1) {
            children.splice(index, 1);
        }
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
        children.forEach(obj=>{
            obj.draw(ctx);
        })
        ctx.restore();
    }
}