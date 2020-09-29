import Rect from '../shapeLib/Rect.js'
import Vector2 from '../core/Vector2.js'

/*drawImg() 绘制的对象
*   image 图像源
*   camera 相机
*       position
*       size
*   orign 基点位置，默认0
*   size 视口尺寸
*   globalCompositeOperation 合成方式
*   min 左上角，视口位置
*   draw 绘图方法
* */
const defAttr=({image:{width,height}})=>({
    image:null,
    camera:null,
    size:new Vector2(width,height),
    min:new Vector2(),
    drawImage:null
})
export default class ImgObj extends Rect{
    constructor(attr){
        super(Object.assign(defAttr(attr),attr));
    }
    update(){
        /*设置左上角的极小值*/
        super.update();
        /*设置绘图方法*/
        this.setDrawImg();
    }

    /*绘图方法的重新*/
    draw(ctx){
        if(!this.visible){return}
        ctx.save();
        /*绘制多边形*/
        this.drawPoly(ctx);
        /*绘图*/
        this.drawImage(ctx);
        ctx.restore();
    }

    /*设置绘图方法*/
    setDrawImg(){
        const {camera,size,draw1,draw2}=this;
        if(camera){
            this.drawImage=draw1;
        }else{
            this.drawImage=draw2;
        }
    }

    /*裁剪+位移+缩放*/
    draw1(ctx){
        const {
            image,
            min:{x,y},size:{x:w,y:h},
            camera:{
                position:{x:cx,y:cy},
                size:{x:cw,y:ch}
            }
        }=this;
        ctx.drawImage(
            image,
            x,y,w,h,
            cx,cy,cw,ch
        );
    }

    /*位移+缩放*/
    draw2(ctx){
        const {image,min:{x,y},size:{x:w,y:h}}=this;
        ctx.drawImage(image,x,y,w,h);
    }
}