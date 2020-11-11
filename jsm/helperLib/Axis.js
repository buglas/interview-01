import Group from "../core/Group.js"
import Vector2 from "../core/Vector2.js"
import Poly from "../core/Poly.js"
import Lattice from "../modifierLib/Lattice.js"
import Text from "../shapeLib/Text.js"

/*Axis 二维直角坐标系
* size 轴长
* arrowSize 箭头大小
* fontSize 标签文字大小
* axisOffset 坐标轴偏移
* labelOffset 标签文字大小
* x|y|o 坐标轴标签文字
* xAxis|yAxis x、y轴对象，主位移
* arc 弧对象，主旋转
* arcShow 弧对象是否显示，默认false，不显示
* */
const defAttr=()=>({
    size:200,
    arrowSize:18,
    fontSize:18,
    axisOffset:48,
    labelOffset:18,
    x:'x',
    y:'y',
    o:'',
    xAxis:null,
    yAxis:null,
    arc:null,
    arcShow:false
})

export default class Axis extends Group{
    constructor(attr){
        super(Object.assign(defAttr(),attr));
        this.init();
    }

    init(){
        this.children=[];
        const {size,axisOffset,labelOffset,x,y,o,fontSize}=this;
        /*建立x、y轴*/
        const [xLen,yLen]=getMutAttr(size);
        const xOpt=xvs(xLen,axisOffset,labelOffset,x);
        const yOpt=yvs(yLen,axisOffset,labelOffset,y);
        this.xAxis=this.crtAxis(xOpt);
        this.yAxis=this.crtAxis(yOpt);
        /*原点标签*/
        const oLabel=new Text({
            orign:new Vector2(-labelOffset,labelOffset),
            text:o,
            fill:true,
            fontSize,
            textAlign:'right',
            textBaseline:'top'
        });
        this.oLabel=oLabel;
        this.add(oLabel);
    }

    update(){
        const {size,axisOffset,labelOffset,x,y,o,children}=this;
        const {
            xAxis:{axis:xAxis,label:xLabel},
            yAxis:{axis:yAxis,label:yLabel},
            oLabel
        }=this;
        /*更新x、y轴*/
        const [xLen,yLen]=getMutAttr(size);
        const xOpt=xvs(xLen,axisOffset,labelOffset,x);
        const yOpt=yvs(yLen,axisOffset,labelOffset,y);
        this.updateAxis(xAxis,xLabel,xOpt);
        this.updateAxis(yAxis,yLabel,yOpt);
        /*更新原点*/
        oLabel.orign.copy(new Vector2(-labelOffset,labelOffset));
        oLabel.text=o;
    }

    crtAxis({vertices,orign,text}){
        const {fontSize,arrowSize}=this;
        const axis=new Poly({
            vertices,
            stroke:true
        });
        axis.addModifier(new Lattice({
            type:'Arrow',
            size:arrowSize
        }));
        const label=new Text({
            orign,
            text,
            fill:true,
            fontSize,
            textAlign:'right',
            textBaseline:'top'
        });
        this.add(axis);
        this.add(label);
        return {axis,label};
    }

    updateAxis(axis,label,{vertices,orign,text}){
        const {arrowSize}=this;
        axis.copyVertices(vertices);
        axis.modifiers[0].size=arrowSize;
        axis.update();
        label.orign=orign;
        label.text=text;
    }
}


function xvs(size,axisOffset=20,labelOffset,text){
    return {
        vertices:[
            new Vector2(-axisOffset,0),
            new Vector2(size,0)
        ],
        orign:new Vector2(size-labelOffset,labelOffset),
        text
    };
}

function yvs(size,axisOffset=20,labelOffset,text){
    return {
        vertices:[
            new Vector2(0,axisOffset),
            new Vector2(0,-size)
        ],
        orign:new Vector2(-labelOffset,-size+labelOffset),
        text
    };
}

function getMutAttr(val){
    let x=val;
    let y=val;
    if(typeof val === 'object'){
        [x,y=x]=val;
    }
    return [x,y];
}











