import Vector2 from "../core/Vector2.js";
/*获取鼠标位置*/
const getMousePos=function(event,canvas,obj=null){
    //获取鼠标位置
    const {clientX,clientY}=event;
    //获取canvas 边界位置
    const {top,left}=canvas.getBoundingClientRect();
    //计算鼠标在canvas 中的位置
    const x=clientX-left;
    const y=clientY-top;
    const mousePos=new Vector2(x,y);
    obj&&setPosToBottom(mousePos,obj,null);
    return mousePos;
};
/*将坐标点从某个父级坐标系放入某个子坐标系*/
function setPosToBottom(p,bottom,top=null){
    const worlds=[bottom];
    let {parent}=bottom;
    while(parent&&parent!==top){
        worlds.unshift(parent);
        parent=parent.parent;
    }
    worlds.forEach(w=>{
        setPosToSun(p,w);
    })
    return p;
}
/*将坐标点从某个子级坐标系放入某个父坐标系*/
function setPosToTop(p,bottom,top=bottom){
    setPosToParent(p,bottom);
    let {parent}=bottom;
    if(parent&&parent!==top){
        setPosToTop(p,parent,top)
    }
    return p;
}
/*将父级中的坐标点放入下一级坐标系*/
function setPosToSun(p,world){
    const {position,scale,rotation}=world;
    p.sub(position);
    p.rotate(-rotation);
    p.divide(scale);
    return p;
}
/*将子级中的坐标点放入上一级坐标系*/
function setPosToParent(p,world){
    const {position,scale,rotation}=world;
    p.scaleVector(scale);
    p.rotate(rotation);
    p.add(position);
    return p;
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
        })
        this.run();
    }
    run(time=0){
        const {animations,fn}=this;
        animations.forEach(ani=>{
            const diff=time-ani.time;
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

export {getMousePos,setPosToBottom,setPosToTop,parsePoints,run,SupRun};

