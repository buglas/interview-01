import Vector2 from "../core/Vector2.js"
import Modifier from "./Modifier.js"
/*Expand 路径偏移，修改目标对象的vertices，并存储一份原始数据
*   type 路径偏移方式
*       normal 法线偏移，默认
*       angle 夹角偏移
*   d 偏移距离
*   oldVertices 最初的顶点集合
* */
const defAttr=()=>({
    type:'normal',
    d:0,
    oldVertices:null
});
export default class Expand extends Modifier{
    constructor(attr) {
        super(Object.assign(defAttr(),attr));

    }
    init() {
        const {poly:{vertices}}=this;
        this.oldVertices=vertices.map(v=>v.clone());
        this.update();
    }
    update() {
        const {poly:{vertices},oldVertices,d}=this;

        const len=vertices.length;
        if(len===2){
            const [bp0,ep0]=oldVertices;
            const [bp1,ep1]=vertices;
            const delta=ep0.clone().sub(bp0);
            const A1=delta.y;
            const B1=-delta.x;

            const v1=new Vector2(A1,B1);
            const v2=new Vector2(-A1,-B1);

            v1.setLength(d);
            v2.setLength(d);

            bp1.copy(bp0.clone().add(v1));
            ep1.copy(ep0.clone().add(v1));
            console.log('bp0,ep0',bp0,ep0)

        }else if(len>2){
            oldVertices.forEach((v0,i0)=>{
                const [i1,i2]=[
                    (i0+1)%len,
                    (i0+2)%len,
                ];
                const v1=oldVertices[i1];
                const v2=oldVertices[i2];

                const [A1,B1,C1]=this.getABC(v0,v1,d);
                const [A2,B2,C2]=this.getABC(v1,v2,d);

                const x=(B1*C2-C1*B2)/(A1*B2-A2*B1);
                const y=(A2*C1-A1*C2)/(A1*B2-A2*B1);
                vertices[(i0+1)%len].copy(new Vector2(x,y));
            });
        }else{
            console.warn('图形扩展的顶点数不能小于2个。')
        }

    }
    getABC(v1,v2,d=0,n=1){
        const delta=v2.clone().sub(v1);
        const [A,B]=[delta.y,-delta.x];
        const v=new Vector2(A*n,B*n);
        v.setLength(d);
        const p=v1.clone().add(v);
        const C=-(A*p.x+B*p.y);
        return [A,B,C]
    }
    removed(){
        this.poly.vertices=this.oldVertices;

    }
}
