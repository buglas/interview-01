import Star from './Star.js'
import Group from "../jsm/core/Group.js"
import Vector2 from "../jsm/core/Vector2.js"

/*星系
*   size 尺寸
*   layer 层级
*      image 图像源
*      num 数量
*      size 尺寸
*      alpha 透明度
*      ratio 高度比例值
* */
const defAttr=()=>({
    size:new Vector2(),
    layer:[],
    filterSize:150,
    twinkleStars:[],
})
export default class Stars extends Group{
    constructor(attr){
        super(Object.assign(defAttr(),attr));
        this.init();
    }
    init(){
        const {layer}=this;
        this.children=[];
        layer.forEach(ele=>{
            this.crtStars(ele);
        })
        this.children.forEach(ele=>{
            ele.init();
        })
    }
    crtStars({image,num=5,size=200,alpha=1,ratio=1}){
        const {filterSize,twinkleStars,size:{x:width,y:height}}=this;
        for(let i=0;i<num;i++){
            const x=Math.random()*width;
            const y=Math.random()*height*ratio;
            const a=Math.random()+alpha;
            const r=Math.random()*size;
            const star=new Star({
                image,
                orign:new Vector2(x,y),
                size:new Vector2(r,r),
                align:'center',
                alpha:a,
                globalCompositeOperation:'color-dodge'
            });
            this.add(star);
            if(r<filterSize){
                twinkleStars.push(star);
            }
        }
    }
    run(time){
        this.twinkleStars.forEach(star=>{
            star.run(time);
        })
    }
}