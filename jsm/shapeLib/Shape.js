/*图形基类*/
import Poly from "../Poly.js"
/*
* constructor 的super中要对默认参数深拷贝
*   传参顺序 attrs=[attr otherAttr] defAttr
*   合并 defAttr otherAttr attr
* */
export default class Shape extends Poly{
    constructor(...attrs){
        // super(Object.assign(defAttr(),otherDefAttr(),attr));
        super(parseAttrs(attrs));
    }
    update(){}
    crtPath(){}
}
function parseAttrs([attrs,defAttr]){
    const objAttrs=[...attrs,defAttr].map(attr=>parseAttr(attr))
    let attrAll=null;
    switch (objAttrs.length) {
        case 0:
            attrAll={};
            break;
        case 1:
            attrAll= objAttrs[0];
            break;
        case 2:
            attrAll= Object.assign(objAttrs[1],objAttrs[0]);
            break;
        default:
            const customAttr=attrs.splice(0,1);
            attrAll= Object.assign(attrs,...objAttrs,customAttr);
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