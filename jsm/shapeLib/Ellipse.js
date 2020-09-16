import Poly from "../core/Poly.js"
import Vector2 from "../core/Vector2.js"
import Shape from "./Shape.js"

/*Ellipse 椭圆对象-普通图形|晶格化修改器节点
*   segNum 段数，默认24
*   r1半径1
*   r2半径2
* */

export default class Ellipse extends Shape{
    constructor(...attrs) {
        super(...attrs,{r1:0,r2:0,segNum:24,close:true});
        this.update();
    }
    update() {
        const {r1, r2,segNum} = this;
        const radian=Math.PI*2/segNum;
        const vertices=[];
        for(let i=0;i<segNum;i++){
            const dir=radian*i;
            const [x,y]=[
                Math.cos(dir)*r1,
                Math.sin(dir)*r2
            ];
            vertices.push(new Vector2(x,y));
        }
        this.vertices=vertices;
    }
}
