import ShapeLib from "../shapeLib/ShapeLib.js"
/*Expand 扩展时，将原顶点深拷贝一份
*   扩展思路，基于直线的法线扩展
* */
const defAttr=()=>({type:'Point',poly:null, nodes:[]});
export default class Expand{
    constructor(option) {
        Object.assign(this,defAttr(),option);
    }

}
