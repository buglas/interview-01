import Poly from "../core/Poly.js"
import Shape from "./Shape.js"
const defAttr=()=>({
    textBaseline:'alphabetic',
    textAlign:'start',
    text:'',
    maxWidth:undefined,
    fontStyle:'',
    fontVariant:'',
    fontWeight:'',
    fontSize:14,
    lineHeight:'',
    fontFamily:'arial'

})
/*Text 文本*/
export default class Text extends Shape{
    constructor(...attrs){
        super(...attrs,defAttr);
    }
    draw(ctx){
        ctx.save();

        /*变换*/
        this.transform(ctx);

        /*文字样式*/
        this.setText(ctx);

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

    /*设置文字样式*/
    setText(ctx){
        const {
            fontStyle,fontVariant,fontWeight,fontSize,lineHeight,fontFamily,
            textBaseline,textAlign
        }=this;
        ctx.font=`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${lineHeight} ${fontFamily}`;
        ctx.textBaseline=textBaseline;
        ctx.textAlign=textAlign;
    }

    /*获取文本宽度*/
    getWidth(){
        const {
            text,
            fontStyle,fontVariant,fontWeight,fontSize,lineHeight,fontFamily,
        }=this;
        const canvas=document.createElement('canvas');
        const ctx=canvas.getContext('2d');
        ctx.font=`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${lineHeight} ${fontFamily}`;
        return ctx.measureText(text).width;
    }

    /*绘制描边*/
    drawStroke(ctx){
        const {
            stroke, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit,lineDash,lineDashOffset,
            text,orign:{x,y},maxWidth
        }=this;
        if(stroke){
            ctx.strokeStyle=strokeStyle;
            ctx.lineWidth=lineWidth;
            ctx.lineCap=lineCap;
            ctx.lineJoin=lineJoin;
            ctx.miterLimit=miterLimit;
            ctx.lineDashOffset=lineDashOffset;
            ctx.setLineDash(lineDash);
            ctx.strokeText(text,x,y,maxWidth);
        }
    }
    /*绘制填充*/
    drawFill(ctx){
        const {
            fill, fillStyle,
            text,orign:{x,y},maxWidth
        }=this;
        if(fill){
            ctx.fillStyle=fillStyle;
            ctx.fillText(text,x,y,maxWidth);
        }
    }
}
