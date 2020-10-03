import Vector2 from "../core/Vector2.js";
/*获取鼠标位置*/
/*const getMousePos=function(event,canvas,obj=null){
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
};*/

const getMousePos=function(event,canvas,obj=null){
    //获取鼠标位置
    const {clientX,clientY}=event;
    //获取canvas 边界位置
    const {top,left}=canvas.getBoundingClientRect();
    //计算鼠标在canvas 中的位置
    const x=clientX-left;
    const y=clientY-top;
    const mousePos=new Vector2(x,y);
    obj&&setPosInBottomObj(mousePos,obj);
    return mousePos;
};
/*将父级中的坐标点放入n级子坐标系*/
function setPosInBottomObj(p1,p2){
    const worlds=[p2];
    let {parent}=p2;
    while(parent){
        worlds.unshift(parent);
        parent=parent.parent;
    }
    worlds.forEach(p=>{
        setPosInSun(p1,p);
    })
    return p1;
}
/*将父级中的坐标点放入下一级坐标系*/
function setPosInSun(p1,p2){
    const {position,scale,rotation}=p2;
    p1.sub(position);
    p1.rotate(-rotation);
    p1.divide(scale);
    return p1;
}

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

/*动画驱动*/
function run(fn) {
    let time=new Date();
    !(function render(){
        const now=new Date();
        const diff=now-time;
        time=now;
        fn(diff);
        requestAnimationFrame(render);
    })()
}
/*按照时间间隔运行动画
* [
*   {
*       space 时间间隔，默认0
*       delay 时间延迟，默认0
*       time 计时器
*       fn 行为
*
*   }
* ]
* */
const defAttr=()=>({
    animations:[],
    fn:()=>{}
})
class SupRun{
    constructor(attr){
        Object.assign(this,defAttr(),attr);
    }
    add(animal){
        this.children.push(animal)
    }
    start(){
        this.animations.forEach(ani=>{
            ani.space!==undefined||(ani.space=0);
            ani.delay!==undefined||(ani.delay=0);
            ani.time=ani.delay;
            // console.log(ani);
        })
        this.run();
    }
    run(time=0){
        const {animations,fn}=this;
        animations.forEach(ani=>{
            const diff=time-ani.time;
            // console.log('time',time);
            // console.log('diff',diff);
            if(diff>ani.space){
                ani.time=time;
                ani.fn();
            }
        })
        fn();
        requestAnimationFrame(this.run.bind(this));
    }
    remove(animation){
        const {animations}=this;
        const i=animations.indexOf(animation);
        if(i!==-1){
            animations.splice(i,1);
        }
    }
}

export {getMousePos,setPosInBottomObj,parsePoints,run,SupRun};

