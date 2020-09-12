import ShapeLib from "../shapeLib/ShapeLib.js"
/*Expand 路径偏移，基于poly 对象扩展新的路径
*   type 路径偏移方式
*       normal 法线偏移，默认
*       angle 夹角偏移
*   d:偏移距离
* */
const defAttr=()=>({type:'normal',d:0});
export default class Expand{
    constructor(attr) {
        Object.assign(this,defAttr(),attr);
    }

}
