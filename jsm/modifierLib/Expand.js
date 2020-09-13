import Modifier from "./Modifier.js"
/*Expand 路径偏移，基于poly 对象扩展新的路径
*   type 路径偏移方式
*       normal 法线偏移，默认
*       angle 夹角偏移
*   d:偏移距离
*   baseVertices 基础顶点集合
*   expandVertices 扩展后的顶点集合
* */
const defAttr=()=>({
    type:'normal',
    d:0,
    baseVertices:[],
    expandVertices:[],
});
export default class Expand extends Modifier{
    constructor(attr) {
        super();
        Object.assign(this,defAttr(),attr);
    }
    init() {
        this.baseVertices=this.poly.vertices.map(v=>v.clone());
        const len=this.baseVertices.length;
        this.baseVertices.forEach((v0,i0)=>{
            const [i1,i2]=[
                (i0+1)%len,
                (i0+2)%len,
            ];
            const v1=vertices[i1];
            const v2=vertices[i2];

            const [A1,B1,C1]=getABC(v0,v1,d);
            const [A2,B2,C2]=getABC(v1,v2,d);

            const x=(B1*C2-C1*B2)/(A1*B2-A2*B1);
            const y=(A2*C1-A1*C2)/(A1*B2-A2*B1);
            vertices2.push(new Vector2(x,y));
        });
    }
    update() {

    }
}
