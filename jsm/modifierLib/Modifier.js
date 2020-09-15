/*普通修改器
*   weight 权重，影响修改器渲染顺序
*   poly 图形，Poly对象addModifier添加修改器时，与修改器进行双向绑定
*   updateOther 当前修改器的更新是否会带动其它修改器的更新，用于Poly对象增删修改器时调用
*   init() 初始化方法，添加修改器时执行，并具备更新功能
*   update() 更新方法，修改器更新时执行
*   removed() 被删除，适用于修改了目标对象的修改器还原数据
*   draw() 绘图，适用于添加了新元素的修改器
*   注：修改器在被添加或删除时，会自动更新。在修改了节点数据后，需手动更新。
*       晶格化修改器：
*           球形：点位更新，无需更新
*           箭头：点位更新，需更新
*       边界扩展修改器：
*           单线的法线偏移
*           法线偏移：可用limit 实现智能倒角
*           夹角偏移：可指定夹角偏移度数，默认为中线
*           倒角偏移
*
*
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
