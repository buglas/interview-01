/*修改器的基类
*   poly 图形，Poly对象addModifier添加修改器时，与修改器进行双向绑定
*   init() 初始化方法，添加修改器时执行
*   update() 更新方法，修改器更新时执行
*
* */
export default class Modifier{
    constructor(){
        this.poly=null;
    }
    init(){}
    update(){}
}
