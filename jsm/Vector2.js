//向量对象
export default class Vector2{
    constructor(x=0,y=0){
        this.x=x;
        this.y=y;
    }
    //加法
    add(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    //获取相对于x轴正方向的弧度
    angle(){
        let angle = Math.atan2( this.y, this.x );
        if ( angle < 0 ) angle += 2 * Math.PI;
        return angle;
    }
    //当前点到另一点的方向
    angleTo(v) {
        const point = this.clone().sub(v);
        return point.angle();
    }
    //向量克隆
    clone(){
        return new Vector2(this.x,this.y);
    }
    //将当前点位调整到极值形成的闭区间中(min,max)
    clamp(min,max){
        this.x = Math.max( min.x, Math.min( max.x, this.x ) );
        this.y = Math.max( min.y, Math.min( max.y, this.y ) );
        return this;
    }
    //x：y=1：1 的clamp
    clampScalar ( minVal, maxVal ) {
        this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
        this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
        return this;
    }
    //将向量长度限定在极值的闭区间中
    clampLength(min, max){
        const length = this.length();
        return this.divideScalar( length || 1 ).scale( Math.max( min, Math.min( max, length ) ) );
    }
    //向量拷贝
    copy(v){
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    //当前点到另一点的距离
    distanceTo(v){
        const [dx,dy] = [this.x - v.x, this.y - v.y];
        return Math.sqrt(dx * dx + dy * dy);
    }

    //当前点到零点再到另一个点的夹角
    includedAngle(v){
        return  Math.acos(this.clone().dot(v) / (this.length() * v.length()));
    }
    //当前点到v1再到v2的夹角
    includedAngleTo(v1,v2){
        const [s1,s2]=[
            this.clone().sub(v1),
            v2.clone().sub(v1),
        ];
        return s1.includedAngle(s2);
    }
    //当前点是否在三角形中，用夹角之和判断
    inTriangle([p0,p1,p2]){
        const [a0,a1,a2]=[
            p0.includedAngleTo(this,p1),
            p1.includedAngleTo(this,p2),
            p2.includedAngleTo(this,p0),
        ];
        const sum=a0+a1+a2;
        return Math.PI*2-sum<=0.01;
    }
    //当前点是否在三角形中，用二元一次不等式
    inTriangle2(points){
        let inPoly=true;
        for(let i=0;i<3;i++){
            const i2=(i+1)%3;
            const [pointStart,pointEnd]=[
                points[i],
                points[i2],
            ];
            const vector=pointEnd.clone().sub(pointStart);
            const pr=this.clone().sub(pointStart);
            const num=vector.y*pr.x-vector.x*pr.y;
            if(num>0){
                inPoly=false;
                break
            }
            const {x,y}=vector;
        }
        return inPoly;
    }
    //向量除法
    divide ( v ) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    //点积
    dot( v ) {
        return this.x * v.x + this.y * v.y ;
    }
    //等比例切割向量，设置向量长度为当前长度的1/scalar
    divideScalar(scalar){
        return this.scale( 1 / scalar );
    }
    //是否相等
    equal(v){
        return this.x===v.x&&this.y===v.y;
    }
    //扩展
    expand(dist){
        this.setLength(this.length()+dist);
        return this;
    }
    //获取面积
    getArea(){
        return this.x*this.y;
    }
    //根据线段，设置位置
    getPosByLine(v1,v2,dist){
        const oldDist=v1.distanceTo(v2);
        const a=v2.clone().sub(v1).normalize();
        return a.setLength(oldDist+dist).add(v1);
    }
    //获取和另一个点相连后的法线
    /*getNormal(v){
        return v.clone().sub(this).normalize();
    }*/
    //法线
    getNormal(v=new Vector2()){
        return new Vector2(this.y,-this.x).normalize();
    }
    getNormalTo(v=new Vector2()){
        return this.clone().sub(v).getNormal();
    }
    //获取长度
    length() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    //设置差值
    lerp(v, alpha){
        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;
        return this;
    }
    //基于一点，在x，y向各取最大值
    max( v ) {
        this.x = Math.max( this.x, v.x );
        this.y = Math.max( this.y, v.y );
        return this;
    }
    //基于一点，在x，y向各取最小值
    min( v ) {
        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );
        return this;
    }
    //向量乘法+数乘，返回向量
    scale(x=1,y=x){
        this.x*=x;
        this.y*=y;
        return this;
    }
    //向量的乘法，返回数字
    multiply( v ) {
        return this.x *v.x+this.y *v.y;
    }
    //向量归一
    normalize(){
        this.setLength(1);
        return this;
    }
    //取反，坐标效果为原点对称
    negate(){
        this.x = - this.x;
        this.y = - this.y;
        return this;
    }
    //计算世界外的一个点位，在一个被变换了的世界中的位置
    setPosFromWorld(obj){
        const {position,scale,rotation}=obj;
        this.sub(position);
        this.rotate(-rotation);
        this.divide(scale);
        return this;
    }

    //基于某一点旋转
    rotateAround(center, angle){
        const c = Math.cos( angle ), s = Math.sin( angle );
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }
    //基于原点旋转
    rotate(angle){
        const c = Math.cos( angle ), s = Math.sin( angle );
        const {x,y}=this;
        this.x = x * c - y * s;
        this.y = x * s + y * c;
        return this;
    }
    //减法
    sub(v){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    set(x,y){
        this.x=x;
        this.y=y;
        return this;
    }
    //设置向量长度
    setLength(n=1){
        const scalar=n/this.length();
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    //根据半径，弧度，设置极坐标
    static polar(r,rad){
        const v=new Vector2();
        v.x=Math.cos(rad)*r;
        v.y=Math.sin(rad)*r;
        return v;
    }
}