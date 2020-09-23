import ShapeLib from "../shapeLib/ShapeLib.js"
import Modifier from "./Modifier.js"
import Vector2 from "../core/Vector2.js"
/*Lattice 晶格化修改器
* type 晶格节点类型
*   Point 圆点
*   Arrow 箭头
*       p1 起点
*       p2 终点
*   Label 文本标签，需对当前边界做扩展
*       v0 标签基点
*       dir 偏移方向
* nodes 初始化时，建立对节点集合
* createNodes()建立节点集合
* updateNodes()节点的更新方法，需在需要的时候手动更新，并对不同的节点执行不同的更新方法
* 节点的奇偶性：节点静态属性single为true，且未闭合，则为true
*
* Text 特定属性
*   label:[],标签集合
*   d：标签偏移距离
* */
const defAttr=()=>({
    type:'Point',
    nodes:[],
    weight:2,
    //适用于Text文本
    labels:[],
    d:20
});
const otherKeys=['fillStyle','strokeStyle','lineWidth','lineDash','lineDashOffset','shadowColor','shadowBlur','shadowOffsetX','shadowOffsetY'];
const otherFontKeys=['textBaseline','textAlign','text','maxWidth','fontStyle','fontVariant','fontWeight','fontSize','lineHeight','fontFamily'];
export default class Lattice extends Modifier{
    constructor(attr) {
        super(Object.assign(defAttr(),attr));
        this.attr=attr;
    }
    init() {
        this.createNodes();
    }
    createNodes(){
        const {type,crtLabel1,crtLabel2,crtLabel3,crtNodes}=this;
        if(type==='Label'){
            const len=this.poly.vertices.length;
            const labelOtherKeys=[...otherKeys,...otherFontKeys];
            if(len>2){
                const ergodic=this.ergodic(labelOtherKeys,crtLabel3.bind(this));
                ergodic();
            }else if(len===2){
                const ergodic=this.ergodic(labelOtherKeys,crtLabel2.bind(this));
                ergodic();
            }else if(len===1){
                const ergodic=this.ergodic(labelOtherKeys,crtLabel1.bind(this));
                ergodic();
            }
        }else{
            const ergodic=this.ergodic(otherKeys,crtNodes.bind(this));
            if(type==='Arrow'){
                ergodic(({v0,vF,i0})=>{
                    return {v0,vF,i0}
                })
            }else{
                ergodic(({v0,i0})=>{
                    return {orign:v0,i0}
                })
            }
        }
    }
    ergodic(otherKeys,crtNodeFn){
        const {poly}=this;
        const otherAttr={modifier:this};
        otherKeys.forEach(key=>{
            otherAttr[key]=poly[key];
        })
        const crtNode=this.crtNode(otherAttr);
        return (parseCustomAttr=null)=>{
            crtNodeFn(crtNode,parseCustomAttr);
        }
    }
    crtLabel1(crtNode){
        const {v0,dir}=this.getLabel1Dt();
        crtNode({i0:0,v0,dir});
    }
    crtLabel2(crtNode){
        this.ergodicLabel2(({i0,v0,dir})=>{
            crtNode({i0,v0,dir});
        });
    }
    crtLabel3(crtNode){
        this.ergodicLabel3((attr1,attr2)=>{
            this.crtBreakPoint((dt)=>{
                crtNode(dt);
            },...attr1);
            this.crtBreakPoint((dt)=>{
                crtNode(dt);
            },...attr2);
        },({i,vertices,len,d})=>{
            console.log(i);
            const i0=i;
            const {v0,dir}=this.getLabel3Dt({v0:vertices[i],i0,vertices,len,d});
            crtNode({i0,v0,dir});
        });
    }
    crtNodes(crtNode,parseCustomAttr){
        const {poly,type}=this;
        const {close,vertices}=poly;
        const single= ShapeLib[type].single&&!close;
        let len=vertices.length;
        let n=single?len-1:len;
        for (let i0=0;i0<n;i0++) {
            const [iB,iF]=[
                (len+i0-1)%len,
                (len+i0+1)%len,
            ];
            const vB=vertices[iB];
            const v0=vertices[i0];
            const vF=vertices[iF];
            const customAttr=parseCustomAttr({iB,i0,iF,vB,v0,vF,n});
            crtNode(customAttr);
        }
    }
    crtNode(otherAttr){
        const {type,nodes}=this;

        return (customAttr)=>{
            nodes[customAttr.i0]=new ShapeLib[type](
                customAttr,
                otherAttr,
                this.attr
            );
        }
    }
    update(){
        const {type,nodes,poly:{vertices}}=this;
        if(type==='Label'){
            const len=vertices.length;
            if(len>2){
                this.updateLabel3();
            }else if(len===2){
                this.updateLabel2();
            }else if(len===1){
                this.updateLabel1();
            }
        }else{
            nodes.forEach(node=>{
                node.update();
            })
        }

    }

    updateLabel1(){
        const {nodes}=this;
        const [node]=nodes;
        const {v0,dir}=this.getLabel1Dt();
        node.dir=dir;
        node.v0.copy(v0);
        node.update();
    }
    updateLabel2(){
        const {nodes}=this;
        this.ergodicLabel2(({i0,v0,dir})=>{
            const node=nodes[i0];
            node.v0=v0;
            node.dir=dir;
            node.update();
        });
    }
    ergodicLabel2(fn){
        const {vs,dir}=this.getLabel2Dt();
        vs.forEach((v0,i0)=>{
            fn({i0,v0,dir});
        })
    }
    ergodicLabel3(fn1,fn2){
        const {nodes,d,poly:{vertices,close}}=this;
        const len=vertices.length;
        let start=0;
        let n=len;
        if(!close){
            start=1;
            n=len-1;
            fn1([0,0],[len-2,1])
        }
        for(let i=start;i<n;i++){
            fn2({i,vertices,len,d,nodes});

        }
    }
    updateLabel3(){
        this.ergodicLabel3((attr1,attr2)=>{
            this.updateBreakPoint(...attr1);
            this.updateBreakPoint(...attr2);
        },({i,vertices,len,d,nodes})=>{
            const node=nodes[i];
            const {i0}=node;
            const {v0,dir}=this.getLabel3Dt({i0,vertices,len,d});
            node.v0.copy(v0);
            node.dir=dir;
            node.update();
        });
    }
    updateBreakPoint(i0,i){
        const {poly:{vertices},nodes}=this;
        const {vs,dir}=this.getLabel2Dt([vertices[i0],vertices[i0+1]]);
        const curI=i0+i;
        const node=nodes[curI];
        node.v0.copy(vs[i]);
        node.dir=dir;
        node.update();
    }
    crtBreakPoint(fn,i0,i){
        const {poly:{vertices}}=this;
        const {vs,dir}=this.getLabel2Dt([vertices[i0],vertices[i0+1]]);
        const curI=i0+i;
        fn({i0:curI,v0:vs[i],dir});
    }
    getLabel1Dt(){
        const {poly:{vertices},d}=this;
        const v0=vertices[0];
        return {
            v0:new Vector2(v0.x,v0.y-d),
            dir:-Math.PI/2
        }
    }
    getLabel2Dt(vertices=this.poly.vertices){
        const {d}=this;
        const [v0,vF]=vertices;
        const delta=v0.clone().sub(vF);
        const [A,B]=[-delta.y,delta.x];
        const v=new Vector2(A,B).setLength(d);
        const c1=v0.clone().add(v);
        const c2=vF.clone().add(v);
        const dir=v.angle();
        return {vs:[c1,c2],dir};
    }
    getLabel3Dt({i0,vertices,len,d}){
        const [iB,iF]=[
            (len+i0-1)%len,
            (len+i0+1)%len,
        ];
        const vB=vertices[iB];
        const v0=vertices[i0];
        const vF=vertices[iF];

        const a=v0.clone().sub(vB).normalize();
        const b=vF.clone().sub(v0).scale(-1).normalize();
        const aAddb=a.add(b);
        let v=null;
        if(aAddb.length()===0){
            v=new Vector2(-b.y,b.x).setLength(d);
        }else{
            v=aAddb.setLength(d);
        }
        const c=v0.clone().add(v);
        const dir=v.angle();
        return {v0:c,dir}
    }
    draw(ctx){
        const {nodes,type}=this;
        nodes.forEach(node=>{
            node.draw(ctx);
        })
    }
}
