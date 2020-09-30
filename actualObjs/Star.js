import ImgObj from '../jsm/imgLib/ImgObj.js'

/*星星
* 抽离补间动画基类
* 时间轨，具备时间总长度，可裁剪，伸缩
* 关键帧集合[]
* 循环 yoyo
* 抽离插值算法
* */
const defAttr=()=>({
    time:0,
    space:4000*Math.random()+1000,
    twinkling:true,
    twinkleSpace:500*Math.random()+200,
    twinkleTime:0,
})
export default class Star extends ImgObj{
    constructor(attr){
        super(Object.assign(attr,defAttr()));
        this.init();
    }
    init(){
        this.baseGlobalAlpha=this.globalAlpha;
    }
    /*now 是请求动画帧里返回的时间*/
    run(now){
        const {time,space,twinkleSpace,baseGlobalAlpha}=this;
        const diff=now-time;
        if(diff>=space){
            this.time=now;
            this.twinkling=true;
            this.twinkleTime=now;
        }
        if(this.twinkling){
            const twinkleDiff=now-this.twinkleTime;
            const ratio=twinkleDiff/twinkleSpace;
            const a=baseGlobalAlpha*Math.sin(Math.PI*ratio);
            this.globalAlpha=baseGlobalAlpha-a;
            if(ratio>1){
                this.twinkling=false;
            }
        }
    }
}
