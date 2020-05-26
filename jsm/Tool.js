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
    //用空格将points 属性切割为数组，如['x,y',...]
    let pointsAttr=dom.getAttribute('points').split(' ');
    for(let ele of pointsAttr){
        //如果ele存在
        if(ele){
            //将字符串类型的点位转化为整数集合，如 '1.2,2.8' → [1,3]
            const arr=ele.split(',').map((num)=>{
                return Math.round(num);
            });
            //将点位封装成Vector2 对象，放到points里
            points.push(new Vector2(...arr));
        }
    }
    return points;
}
export {getMousePos,parsePoints};

