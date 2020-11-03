import Vector2 from "../core/Vector2.js";

const trs={
    t:(ctx,{position})=>{
        ctx.translate(position.x,position.y);
    },
    r:(ctx,{rotation})=>{
        ctx.rotate(rotation);
    },
    s:(ctx,{scale})=>{
        ctx.scale(scale.x,scale.y);
    }
}
/*变换*/
function transform(ctx){
    for(let ele of this.sorf){
        trs[ele](ctx,this);
    }
}
export {transform};

