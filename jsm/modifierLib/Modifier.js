/*普通修改器
*   weight 权重，影响修改器渲染顺序
*   poly 图形，Poly对象addModifier添加修改器时，与修改器进行双向绑定
*   updateOther 当前修改器的更新是否会带动其它修改器的更新，用于Poly对象增删修改器时调用
*   init() 初始化方法，添加修改器时执行，并具备更新功能
*   update() 更新方法，修改器更新时执行
*   removed() 被删除，适用于修改了目标对象的修改器还原数据
*   draw() 绘图，适用于添加了新元素的修改器
* */
const defAttr=()=>({
    weight:0,
    poly:null,
    updateOther:false,
});
export default class Modifier{
    constructor(attr){
        Object.assign(this,defAttr(),attr);
    }
    init(){}
    removed(){}
    draw(){}
}
