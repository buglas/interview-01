import Vector2 from "../core/Vector2.js"
import Modifier from "./Modifier.js"
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
        this.oldVertices=this.poly.vertices.map(v=>v.clone());
        this.update();
    }
    update() {
        const {oldVertices,poly:{vertices},d}=this;
        const len=vertices.length;
        if(len===2){
            update1(oldVertices,vertices,d);
        }else if(len>2){
            update2(oldVertices,vertices,d,len);
        }else{
            console.warn('图形扩展的顶点数不能小于2个。')
        }
    }
    removed(){
        const {oldVertices,poly:{vertices}}=this;
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
function update2(oldVertices,vertices,d,len){
    oldVertices.forEach((v0,i0)=>{
        const [i1,i2]=[
            (i0+1)%len,
            (i0+2)%len,
        ];
        const v1=oldVertices[i1];
        const v2=oldVertices[i2];
        const [A1,B1,C1]=getNormalExpandLineABC(v0,v1,d);
        const [A2,B2,C2]=getNormalExpandLineABC(v1,v2,d);
        const intersection=getIntersectionByABC(A1,B1,C1,A2,B2,C2);
        const v=vertices[(i0+1)%len];
        v.copy(intersection);
    });
}




/*让直线基于法线偏移*/
function getLineMoveByNormal(bp0,ep0,d){
    const delta=ep0.clone().sub(bp0);
    const A1=delta.y;
    const B1=-delta.x;
    const v1=new Vector2(A1,B1);
    v1.setLength(d);
    return [
        bp0.clone().add(v1),
        ep0.clone().add(v1)
    ]
}

/*已知两条直线的一般式，取其交点*/
function getIntersectionByABC(A1,B1,C1,A2,B2,C2){
    const x=(B1*C2-C1*B2)/(A1*B2-A2*B1);
    const y=(A2*C1-A1*C2)/(A1*B2-A2*B1);
    return new Vector2(x,y);
}

/*
* 基于v1、v2两点获取直线，让直线沿其法线方向偏移d，返回此直线一般式中的A、B、C
* */
function getNormalExpandLineABC(v1,v2,d=0){
    const delta=v2.clone().sub(v1);
    const [A,B]=[delta.y,-delta.x];
    const v=new Vector2(A,B);
    v.setLength(d);
    const p=v1.clone().add(v);
    const C=-(A*p.x+B*p.y);
    return [A,B,C]
}
