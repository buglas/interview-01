import Vector2 from "./Vector2.js";
/*获取鼠标位置*/
const getMousePos=function(event,obj=null){
    //获取鼠标位置
    const {clientX,clientY}=event;
    //获取canvas 边界位置
    const {top,left}=canvas.getBoundingClientRect();
    //计算鼠标在canvas 中的位置
    const x=clientX-left;
    const y=clientY-top;
    const mousePos=new Vector2(x,y);
    if(obj){
        const {position,scale,rotation}=obj;
        mousePos.sub(position);
        mousePos.rotate(-rotation);
        mousePos.divide(scale);
    }
    return mousePos;
};

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
export {getMousePos,parsePoints};

