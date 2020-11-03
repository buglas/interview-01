import Vector2 from "./Vector2.js"
import {transform} from '../utils/ShapeTool.js'


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
    //变换顺序
    sorf:'trs',

    //合成相关
    globalAlpha:1,
    globalCompositeOperation:'source-over',

    //可见性
    visible:true,

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
        if(!this.visible){return}
        ctx.save();
        this.drawPoly(ctx);
        ctx.restore();
    }
    drawPoly(ctx){
        /*变换*/
        transform.call(this,ctx);

        /*合成*/
        this.composite(ctx);

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

    /*合成*/
    composite(ctx){
        const {
            globalAlpha,globalCompositeOperation,
        }=this;
        let {parent}=this;
        // ctx.globalAlpha=parent ? parent.globalAlpha * globalAlpha : globalAlpha;
        let a=globalAlpha;
        while(parent){
            const pa=parent.globalAlpha||1;
            a*=pa;
            parent=parent.parent;
        }
        ctx.globalAlpha=a;
        ctx.globalCompositeOperation=globalCompositeOperation;
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
    *   isPointInPath(ctx,pos)测试点是否在路径中（基于未变换的数据绘制路径，让鼠标点去变换）
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
    isPointInPath(ctx,{x,y}){
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
        modifier.parent=this;
        modifier.init();
        /*排除当前元素进行更新*/
        modifier.updateOther&&this.update(modifier);
    }

    /*更新修改器*/
    update(exclude=null){
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
            this.removeModifierByIndex(i,modifiers,modifier);
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
                this.removeModifierByIndex(i,modifiers,modifier);
                break;
            }
        }
    }

    /*基于索引位置删除修改器*/
    removeModifierByIndex(i,modifiers,modifier){
        modifiers.splice(i,1);
        modifier.removed();
        modifier.updateOther&&this.update();
    }

    //拷贝顶点集合
    copyVertices(vs){
        const {vertices}=this;
        vs.forEach((v,i)=>{
            const curV=vertices[i];
            if(curV){
                curV.copy(v);
            }else{
                vertices[i]=v;
            }
        })
    }
}
