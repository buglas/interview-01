import Group from "../core/Group.js"
import Vector2 from "../core/Vector2.js"
import Poly from "../core/Poly.js"
import Lattice from "../modifierLib/Lattice.js"
import Text from "../shapeLib/Text.js"

const defAttr=()=>({
    size:200,
    offset:48,
    labelOffset:24,
    x:'x',
    y:'y',
    o:'0',
})

export default class Axis extends Group{
    constructor(attr){
        super(Object.assign(defAttr(),attr));
        this.init();
    }

    init(){
        this.children=[];
        const {size,offset,labelOffset,x,y,o,children}=this;
        this.crtAxis(xvs(size,offset,labelOffset,x));
        this.crtAxis(yvs(size,offset,labelOffset,y));
        const label=new Text({
            orign:new Vector2(-labelOffset,labelOffset),
            text:o,
            fill:true,
            fontSize:24,
            textAlign:'right',
            textBaseline:'top'
        });
        this.add(label);
    }

    update(){
        const {size,offset,labelOffset,x,y,o,children}=this;
        const [xAxis,xLabel,yAxis,yLabel,oLabel]=children;
        updateAxis(xAxis,xLabel,xvs(size,offset,labelOffset,x));
        updateAxis(yAxis,yLabel,yvs(size,offset,labelOffset,y));
        oLabel.orign.copy(new Vector2(-labelOffset,labelOffset));
        oLabel.text=o;
    }

    crtAxis({vertices,orign,text}){
        const axis=new Poly({
            vertices,
            stroke:true
        });
        axis.addModifier(new Lattice({
            type:'Arrow',
        }))
        const label=new Text({
            orign,
            text,
            fill:true,
            fontSize:24,
            textAlign:'right',
            textBaseline:'top'
        });
        this.add(axis);
        this.add(label);
    }
}

function updateAxis(axis,label,{vertices,orign,text}){
    axis.vertices=vertices;
    axis.update();
    label.orign=orign;
    label.text=text;
}

function xvs(size,offset=20,labelOffset,text){
    return {
        vertices:[
            new Vector2(-offset,0),
            new Vector2(size,0)
        ],
        orign:new Vector2(size-labelOffset,labelOffset),
        text
    };
}

function yvs(size,offset=20,labelOffset,text){
    return {
        vertices:[
            new Vector2(0,offset),
            new Vector2(0,-size)
        ],
        orign:new Vector2(-labelOffset,-size+labelOffset),
        text
    };
}













