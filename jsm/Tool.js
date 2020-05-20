import Vector2 from "./Vector2.js";
/*获取鼠标位置*/
const getMousePos=function(event){
    //获取鼠标位置
    const {clientX,clientY}=event;
    //获取canvas 边界位置
    const {top,left}=canvas.getBoundingClientRect();
    //计算鼠标在canvas 中的位置
    const x=clientX-left;
    const y=clientY-top;
    return new Vector2(x,y);
};
/*判断鼠标是否选择某个路径*/
function isPointInPath(ctx,mousePos,poly){
    const {position,scale,rotation}=poly;
    const {x,y}=mousePos;
    poly.crtPath(ctx);
    let nx=x-position.x;
    let ny=y-position.y;
    const dir=Math.atan2(ny,nx)-rotation;
    const len=Math.sqrt(nx*nx+ny*ny);
    nx=Math.cos(dir)*len;
    ny=Math.sin(dir)*len;
    /*console.log('rotation',rotation);
    console.log('nx,ny',nx,ny);
    console.log('tx,ty',tx,ty);*/
    nx=nx/scale.x;
    ny=ny/scale.y;
    return ctx.isPointInPath(nx,ny);
}
/*解析顶点*/
function parsePoints(dom){
    const points=[];
    let pointsAttr=dom.getAttribute('points').split(' ');
    for(let ele of pointsAttr){
        if(ele){
            const arr=ele.split(',');
            const [x,y]=[
                Math.round(arr[0]),
                Math.round(arr[1]),
            ];
            points.push(new Vector2(x,y));
        }
    }
    return points;
}
export {getMousePos,isPointInPath,parsePoints};

