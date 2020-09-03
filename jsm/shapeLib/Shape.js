/*图形基类*/
import Poly from "../Poly.js"
/*
* constructor 的super中要对默认参数深拷贝
*   传参顺序 [attr otherAttr] defAttr
*   传参顺序 customAttr otherAttr defAttr
*   合并顺序 otherAttr defAttr customAttr
*   customAttr 自定义属性，权重3
*   otherAttr 其它属性，如父级属性，权重1
*   defAttr 默认属性，权重2
* */
export default class Shape extends Poly{
    constructor(...attrs){
        super(parseAttrs(attrs));
    }
    update(){}
    crtPath(){}
}
function parseAttrs(attrs){
    attrs=attrs.map(attr=>parseAttr(attr))
    let attrAll=null;
    switch (attrs.length) {
        case 0:
            attrAll={};
            break;
        case 1:
            attrAll= attrs[0];
            break;
        case 2:
            attrAll= Object.assign(attrs[1],attrs[0]);
            break;
        default:
            const [customAttr]=attrs.splice(0,1);
            attrAll= Object.assign(...attrs,customAttr);
    }
    return attrAll;
}
function parseAttr(attr){
    if(attr instanceof Function){
        return attr();
    }else{
        return attr;
    }
}