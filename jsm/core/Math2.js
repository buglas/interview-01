import Vector2 from "./Vector2.js"

/*已知两条直线的一般式，取其交点*/
function getIntersectionByABC(A1, B1, C1, A2, B2, C2){
    const x=(B1*C2-C1*B2)/(A1*B2-A2*B1);
    const y=(A2*C1-A1*C2)/(A1*B2-A2*B1);
    return new Vector2(x,y);
}
/*
* 基于vStart、vEnd两点获取直线，让直线沿其法线方向偏移d，返回此直线一般式中的A、B、C
* */
function getNormalExpandLineABC(vStart,vEnd,d=0){
    const delta=vEnd.clone().sub(vStart);
    const [A,B]=[delta.y,-delta.x];
    const v=new Vector2(A,B);
    v.setLength(d);
    const p=vStart.clone().add(v);
    const C=-(A*p.x+B*p.y);
    return [A,B,C]
}

export {getIntersectionByABC,getNormalExpandLineABC}
