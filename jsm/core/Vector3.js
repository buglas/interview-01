//向量对象
export default class Vector3{
    constructor(x=0,y=x,z=x){
        this.x=x
        this.y=y
        this.z=z
    }
    set(x=this.x,y=this.y,z=this.z){
        this.x=x
        this.y=y
        this.z=z
        return this
    }
    clone(){
        return new Vector3(this.x,this.y,this.z)
    }
    sub({x,y,z}){
        this.x-=x
        this.y-=y
        this.z-=z
        return this
    }
    length(){
        const {x,y,z}=this
        return Math.sqrt(x*x+y*y+z*z)
    }
    applyMatrix4({elements:m}){
        const { x, y, z} = this
        this.x=m[0]*x+m[4]*y+m[8]*z
        this.y=m[1]*x+m[5]*y+m[9]*z
        this.z=m[2]*x+m[6]*y+m[10]*z
        return this
    }
}
