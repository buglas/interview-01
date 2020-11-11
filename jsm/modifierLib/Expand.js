import Vector2 from "../core/Vector2.js"
import Modifier from "./Modifier.js"
import {getIntersectionByABC,getNormalExpandLineABC} from "../core/Math2.js"
/*Expand 路径偏移，修改目标对象的vertices，并存储一份原始数据
*   type 路径偏移方式
*       normal 法线偏移，默认
*       angle 夹角偏移
*   d 偏移距离
*   oldVertices 最初的顶点集合
*   init() 初始方法，在添加修改器时执行，对顶点数据做备份，方便多次更新和数据还原
*   update() 数据更新
* */
const defAttr=()=>({
    type:'normal',
    d:0,
    oldVertices:null,
    weight:1,
    updateOther:true
});
export default class Expand extends Modifier{
    constructor(attr) {
        super(Object.assign(defAttr(),attr));

    }
    init() {
        this.oldVertices=this.parent.vertices.map(v=>v.clone());
        this.update();
    }
    update() {
        const {oldVertices,parent:{vertices},d,type}=this;
        const len=vertices.length;
        if(len===2){
            update1(oldVertices,vertices,d);
        }else if(len>2){
            if(type==='normal'){
                update2(oldVertices,vertices,d,len);
            }else if(type==='angle'){
                update3(oldVertices,vertices,d,len);
            }
        }else{
            console.warn('图形扩展的顶点数不能小于2个。')
        }
    }
    removed(){
        const {oldVertices,parent:{vertices}}=this;
        vertices.forEach((vertice,ind)=>{
            vertice.copy(oldVertices[ind]);
        })
    }
}

/*两点情况的更新*/
function update1(oldVertices,vertices,d){
    const [bp0,ep0]=oldVertices;
    const [bp1,ep1]=vertices;
    const [bp2,ep2]=getLineMoveByNormal(bp0,ep0,d);
    bp1.copy(bp2);
    ep1.copy(ep2);
}
/*边界的法线偏移*/
function update2(oldVertices,vertices,d){
    ergodic(oldVertices,vertices,(vB,v0,vF)=>{
        const [A1,B1,C1]=getNormalExpandLineABC(vB,v0,d);
        const [A2,B2,C2]=getNormalExpandLineABC(v0,vF,d);
        return getIntersectionByABC(A1,B1,C1,A2,B2,C2);
    });
}
/*边界的夹角偏移*/
function update3(oldVertices,vertices,d){
    ergodic(oldVertices,vertices,(vB,v0,vF)=>{
        const a=v0.clone().sub(vB).normalize();
        const b=vF.clone().sub(v0).multiplyScalar(-1).normalize();
        return a.add(b).setLength(d).add(v0);
    });
}
/*遍历初始顶点集合,暴露点位的计算接口，更新点位*/
function ergodic(oldVertices,vertices,fn) {
    const len=oldVertices.length;
    oldVertices.forEach((v0,i0)=>{
        const [iB,iF]=[
            (len+i0-1)%len,
            (len+i0+1)%len,
        ];
        const vB=oldVertices[iB];
        const vF=oldVertices[iF];
        const p=fn(vB,v0,vF);
        const v=vertices[i0];
        v.copy(p);
    });
}

/*让直线基于法线偏移*/
function getLineMoveByNormal(bp0,ep0,d){
    const delta=ep0.clone().sub(bp0);
    const A1=delta.y;
    const B1=-delta.x;
    const vB=new Vector2(A1,B1);
    vB.setLength(d);
    return [
        bp0.clone().add(vB),
        ep0.clone().add(vB)
    ]
}




