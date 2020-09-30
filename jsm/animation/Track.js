/*
* 动画轨
* target 目标对象，一个轨道一个目标对象
* parent 父对象，合成
*
*
* */
import Animation from "./Animation"

const defAttr=()=>({
    target:{},
    repeat:0,
    stretch:1
})
export default class Track  extends Animation{
    constructor(attr){
        super(Object.assign(defAttr(),attr));
    }

}
