import Ball from "./Ball.js"

/*Point 点对象-普通图形|晶格化修改器节点
*   single 静态属性，是否一线一点，可默认undefined
* */
export default class Point extends Ball{
    static single=false;
    constructor(...attrs) {
        super(...attrs,{r:5,fill:true});
    }
}
