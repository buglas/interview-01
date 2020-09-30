/*
* target 目标对象，一个轨道一个目标对象
* orign 基点位置
* duration 持续时间，具备裁剪特性
* frameSpace 帧间距
* keyframes 关键帧集合[]
*   pos 关键帧位置
*   attr 关键帧属性
* repeat 重复次数，Infinite 重复无数次
* scale 伸缩
* */
const defAttr=()=>({
    target:{},
    orign:0,
    duration:0,
    fps:40,
    keyFrames:[],

})
