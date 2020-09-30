/*动画基类
* name 名称
* start 起始时间
* time 当前时间
* duration 持续时间，具备裁剪特性
* stretch 持续时间伸缩
* repeat 重复次数，Infinite 重复无数次
* position、rotation、scale 变换
* globalAlpha、globalCompositeOperation 合成
* keyframes 关键帧集合[]
*   pos 关键帧位置
*   attr 关键帧属性
* parent 父级null
* */
const defAttr=()=>({
    name:'',
    orign:0,
    time:0,
    duration:0,
    stretch:1,
    repeat:0,
    keyFrames:[],
    parent:null
})

export default class Animation{
    constructor(attr={}){
        Object.assign(this,defAttr(),attr)
    }

}








