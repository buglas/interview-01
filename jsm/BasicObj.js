import Vector2 from "./Vector2.js";
/*多边形默认属性*/
const defAttr={
    //顶点集合
    vertices:[],

    //绘图方式相关
    close:false,
    fill:false,
    stroke:false,
    shadow:false,

    //样式相关
    fillStyle:'#000',
    strokeStyle:'#000',
    lineWidth:1,
    lineDash:[],
    lineDashOffset:0,
    lineCap:'butt',
    lineJoin:'miter',
    miterLimit:10,
    shadowColor:'rgba(0,0,0,0)',
    shadowBlur:0,
    shadowOffsetX:0,
    shadowOffsetY:0,

    //图形原点
    orign:new Vector2(0,0),

    //变换相关
    scale:new Vector2(1,1),
    position:new Vector2(0,0),
    rotation:0,

    //修改器集合：修改器统一具备draw(ctx) 接口
    modifiers:[]
};

/*绘制多边形
*   draw(ctx,fn) 绘图，fn在创建路径拦截路径的的选择
*   checkPointInPath(ctx,pos)测试点是否在路径中（基于未变换的数据绘制路径，让鼠标点去变换）
* */
function crtLinePath(ctx){
    const {vertices}=this;
    /*连点成线*/
    ctx.beginPath();
    ctx.moveTo(vertices[0].x,vertices[0].y);
    const len=vertices.length;
    for(let i=1;i<len;i++){
        ctx.lineTo(vertices[i].x,vertices[i].y);
    }
}

/*Poly 多边形*/
export default class BasicObj{
    constructor(param={}){
        Object.assign(this,defAttr,param);
    }
    draw(ctx){
        const {
            shadow, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY,
            stroke, close, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit,lineDash,lineDashOffset,
            fill, fillStyle,
            scale,position,rotation,
            modifiers
        }=this;
        ctx.save();

        /*变换*/
        ctx.translate(position.x,position.y);
        ctx.rotate(rotation);
        ctx.scale(scale.x,scale.y);

        /*建立路径*/
        this.crtPath(ctx);

        /*投影*/
        if(shadow){
            ctx.shadowColor=shadowColor;
            ctx.shadowBlur=shadowBlur;
            ctx.shadowOffsetX=shadowOffsetX;
            ctx.shadowOffsetY=shadowOffsetY;
        }

        /*描边*/
        if(stroke){
            ctx.strokeStyle=strokeStyle;
            ctx.lineWidth=lineWidth;
            ctx.lineCap=lineCap;
            ctx.lineJoin=lineJoin;
            ctx.miterLimit=miterLimit;
            ctx.lineDashOffset=lineDashOffset;
            ctx.setLineDash(lineDash);
            close&&ctx.closePath();
            ctx.stroke();
        }

        /*填充*/
        if(fill){
            ctx.fillStyle=fillStyle;
            ctx.fill();
        }

        /*修改器*/
        console.log('modifiers',modifiers)
        modifiers.forEach(modifier=>{
            modifier.draw(ctx);
        })

        ctx.restore();
    }
    /*创建路径的方法-会被具体图形覆盖*/
    crtPath(){}
    /*检测顶点是否在路径中*/
    checkPointInPath(ctx,{x,y}){
        ctx.save();
        //变换信息归零
        ctx.setTransform(1,0,0,1,0,0);
        //创建路径
        this.crtPath(ctx);
        const bool=ctx.isPointInPath(x,y);
        ctx.restore();
        return bool;
    }
    /*添加修改器*/
    addModifier(modifier){
        this.modifiers.push(modifier);
        modifier.obj=this;
        modifier.update();
    }
}
