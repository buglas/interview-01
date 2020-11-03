import Group from "../core/Group.js"
import Vector2 from "../core/Vector2.js"
import Poly from "../core/Poly.js"
import Lattice from "../modifierLib/Lattice.js"
import Text from "../shapeLib/Text.js"

const defAttr=()=>({
    size:200,
    arrowSize:18,
    fontSize:18,
    offset:48,
    labelOffset:18,
    x:'x',
    y:'y',
    o:'',
})

export default class Axis extends Group{
    constructor(attr){
        super(Object.assign(defAttr(),attr));
        this.init();
    }

    init(){
        this.children=[];
        const {size,offset,labelOffset,x,y,o,fontSize,children}=this;
        const [xLen,yLen]=getMutAttr(size);
        this.crtAxis(xvs(xLen,offset,labelOffset,x));
        this.crtAxis(yvs(yLen,offset,labelOffset,y));
        const label=new Text({
            orign:new Vector2(-labelOffset,labelOffset),
            text:o,
            fill:true,
            fontSize,
            textAlign:'right',
            textBaseline:'top'
        });
        this.add(label);
    }

    update(){
        const {size,offset,labelOffset,x,y,o,children}=this;
        const [xAxis,xLabel,yAxis,yLabel,oLabel]=children;
        const [xLen,yLen]=getMutAttr(size);
        this.updateAxis(xAxis,xLabel,xvs(xLen,offset,labelOffset,x));
        this.updateAxis(yAxis,yLabel,yvs(yLen,offset,labelOffset,y));
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
        }))
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
    }

    updateAxis(axis,label,{vertices,orign,text}){
        const {arrowSize}=this;
        axis.copyVertices(vertices);
        console.log(axis.modifiers[0]);
        axis.modifiers[0].size=arrowSize;
        axis.update();
        label.orign=orign;
        label.text=text;
    }
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

function getMutAttr(val){
    let x=val;
    let y=val;
    if(typeof val === 'object'){
        [x,y=x]=val;
    }
    return [x,y];
}











