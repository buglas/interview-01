/*图形基类*/
import Poly from "../Poly.js"
/*
* constructor 的super中要对默认参数深拷贝
* */
export default class Shape extends Poly{
    constructor({defAttr={},attr={}}){
        super(Object.assign(JSON.parse(JSON.stringify(defAttr)),attr));
    }
    update(){}
    crtPath(){}
}
