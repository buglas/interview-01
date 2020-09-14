import Vector2 from "./Vector2.js";
/*默认属性*/
const defAttr=()=>({
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

    //父级
    parent:null
});



/*Poly 多边形*/
export default class Poly{
    constructor(attr={}){
        Object.assign(this,defAttr(),attr);
        //修改器集合：修改器统一具备draw(ctx) 接口
        this.modifiers=[]
    }
    draw(ctx){
        ctx.save();

        /*变换*/
        this.transform(ctx);

        /*建立路径*/
        this.crtPath(ctx);

        /*投影*/
        this.setShadow(ctx);

        /*描边*/
        this.drawStroke(ctx);

        /*填充*/
        this.drawFill(ctx);

        /*修改器*/
        this.drawModifies(ctx);

        ctx.restore();
    }
    /*变换*/
    transform(ctx){
        const {
            scale,position,rotation,
        }=this;
        ctx.translate(position.x,position.y);
        ctx.rotate(rotation);
        ctx.scale(scale.x,scale.y);
    }
    /*绘制投影*/
    setShadow(ctx){
        const {
            shadow, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY,
        }=this;
        if(shadow){
            ctx.shadowColor=shadowColor;
            ctx.shadowBlur=shadowBlur;
            ctx.shadowOffsetX=shadowOffsetX;
            ctx.shadowOffsetY=shadowOffsetY;
        }
    }
    /*绘制描边*/
    drawStroke(ctx){
        const {
            stroke, close, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit,lineDash,lineDashOffset,
        }=this;
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
    }
    /*绘制填充*/
    drawFill(ctx){
        const {
            fill, fillStyle,
        }=this;
        if(fill){
            ctx.fillStyle=fillStyle;
            ctx.fill();
        }
    }
    /*绘制修改器*/
    drawModifies(ctx){
        const {modifiers}=this;
        modifiers.forEach(modifier=>{
            modifier.draw(ctx);
        })
    }



    /*绘制多边形
    *   draw(ctx,fn) 绘图，fn在创建路径拦截路径的的选择
    *   checkPointInPath(ctx,pos)测试点是否在路径中（基于未变换的数据绘制路径，让鼠标点去变换）
    * */
    crtPath(ctx){
        let {vertices}=this;
        /*连点成线*/
        ctx.beginPath();
        ctx.moveTo(vertices[0].x,vertices[0].y);
        const len=vertices.length;
        for(let i=1;i<len;i++){
            ctx.lineTo(vertices[i].x,vertices[i].y);
        }
    }

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
        const {modifiers}=this;
        modifiers.push(modifier);
        modifiers.sort((a,b)=>a.weight>b.weight?1:-1);
        /*基于修改器的权重做排序*/
        modifier.poly=this;
        modifier.init();
        /*排除当前元素进行更新*/
        this.updateModifies(modifier);
    }

    /*更新修改器*/
    updateModifies(exclude=null){
        this.modifiers.forEach(modifier=>{
            if(exclude!==modifier){
                modifier.update();
            }
        })
    }

    /*删除修改器，基于修改器对象*/
    removeModifier(modifier){
        const {modifiers}=this;
        const i=modifiers.indexOf(modifier);
        if(i!==-1){
            modifiers.splice(i,1);
            modifier.removed();
            this.updateModifies();
        }

    }

    /*删除修改器，基于修改器id*/
    removeModifierById(id){
        const {modifiers}=this;
        const idStr=id.toString();
        const len=modifiers.length;
        for (let i=0;i<len;i++){
            const modifier=modifiers[i];
            const {id}=modifier;
            if(id!==undefined&&id.toString()===idStr){
                modifiers.splice(i,1);
                modifier.removed();
                this.updateModifies();
                break;
            }
        }

    }
}
