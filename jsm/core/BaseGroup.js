import Vector2 from "./Vector2.js"

/*默认属性*/
const defAttr=()=>({
    //父子级
    parent:null,
    children:[],
});

/*Group 数组*/
export default class BaseGroup{
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