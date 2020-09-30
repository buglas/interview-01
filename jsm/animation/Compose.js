/*
* 合成，继承自Track
*   space 帧间距
*   size 视口宽高
*   children 子对象集合[]
*       Track 动画轨对象
*       shape 静态帧对象
*       ease 和前一帧的插值算法，默认为线性line，插值值域是{0.1}
*
* run(now) 基于时间插值进行运算的方法,只做数据运算
* draw(now)变量子级的target 对象进行渲染
*
* */
import Vector2 from "../core/Vector2.js"
import Animation from "./Animation.js"

const defAttr=()=>({
    space:40,
    size:new Vector2(),
    children:[]
})
export default class Compose extends Animation{
    constructor(attr={}){
        super(Object.assign(defAttr(),attr));
    }
    /*run 时间跑起
    * now 父级合成的当前时间
    * -基于帧间距做节流
    * -查找当前时间穿过的child集合
    *   start<now<start+duration
    * 遍历child集合
    *   查找此时间前后的关键帧，有三种情况，
    *       前无后有，前有后无：不做属性改变
    *       前有后有：对属性做插值运算
    *           若此child为Compose，child.run(now反伸缩)
    *
    *
    */
    run(now){
        const {time,space}=this;
        const diff=now-time;
        if(diff<space){return}
        // console.log(now-this.time);
        this.time=now;
    }



    /*集合操作*/
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
        const i = children.indexOf(obj);
        if (i!==-1) {
            children.splice(i, 1);
        }
    }
    removeModifierById(id){
        const {modifiers}=this;
        const idStr=id.toString();
        const len=modifiers.length;
        for (let i=0;i<len;i++){
            const modifier=modifiers[i];
            const {id}=modifier;
            if(id!==undefined&&id.toString()===idStr){
                children.splice(i, 1);
                break;
            }
        }
    }
}