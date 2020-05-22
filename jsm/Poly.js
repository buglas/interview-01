import Vector2 from "./Vector2.js";
/*多边形默认属性*/
const defAttr={
    crtPath:crtLinePath,
    vertices:[],

    close:false,
    fill:false,
    stroke:false,
    shadow:false,

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

    scale:new Vector2(1,1),
    position:new Vector2(0,0),
    rotation:0,
};

/*绘制多边形*/
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
export default class Poly{
    constructor(param={}){
        Object.assign(this,defAttr,param);
    }
    draw(ctx){
        const {
            shadow, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY,
            stroke, close, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit,lineDash,lineDashOffset,
            fill, fillStyle,
            scale,position,rotation
        }=this;
        ctx.save();

        /*投影*/
        if(shadow){
            ctx.shadowColor=shadowColor;
            ctx.shadowBlur=shadowBlur;
            ctx.shadowOffsetX=shadowOffsetX;
            ctx.shadowOffsetY=shadowOffsetY;
        }

        /*变换*/
        ctx.translate(position.x,position.y);
        ctx.rotate(rotation);
        ctx.scale(scale.x,scale.y);

        /*建立路径*/
        this.crtPath(ctx);

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

        ctx.restore();
    }
    checkPointInPath(ctx,{x,y}){
        this.crtPath(ctx);
        const bool=ctx.isPointInPath(x,y);
    }
}
