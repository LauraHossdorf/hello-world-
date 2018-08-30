!function(t){function e(a){if(o[a])return o[a].exports;var r=o[a]={exports:{},id:a,loaded:!1};return t[a].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register beforeAFRAME was available.");AFRAME.registerComponent("rain",{schema:{color:{type:"color",default:"#ddf"},count:{type:"int",default:5e3},depthDensity:{type:"number",default:.05},dropHeight:{type:"number",default:1},dropRadius:{type:"number",default:.005},height:{type:"number",default:15},opacity:{type:"number",default:.4},splash:{type:"boolean",default:!1},splashBounce:{type:"number",default:4},splashGravity:{type:"number",default:39.2},vector:{type:"vec3",default:"0, -40.0 0"},width:{type:"number",default:35}},init:function(){this.model=null},update:function(){this.remove(),this.initMeshes()},remove:function(){null!==this.model&&this.el.removeObject3D("mesh")},tick:function(t,e){null!==this.model&&(this.model.material.uniforms.time.value+=e/1e3)},initMeshes:function(){function t(){var t=new THREE.InstancedBufferGeometry,e=new THREE.Mesh(new THREE.CylinderGeometry(0,s.dropRadius,s.dropHeight,void 0,void 0,!0)),o=new THREE.Mesh(new THREE.SphereGeometry(s.dropRadius,void 0,void 0,void 0,void 0,Math.PI/2,Math.PI/2));o.position.y=.5*-s.dropHeight;var a=new THREE.Vector3(0,-1,0),r=new THREE.Vector3(s.vector.x,s.vector.y,s.vector.z);return e.geometry.mergeMesh(o),e.geometry.lookAt(a.sub(r.normalize())),t.copy((new THREE.BufferGeometry).fromGeometry(e.geometry)),t}function e(){return s.height/-s.vector.y}function o(t){for(var o=t.attributes.position.array,a=s.count,r=s.vector,i=s.width,n=s.height,f=new Float32Array(3*a),d=new Float32Array(3*a),l=new Float32Array(a),c=new Float32Array(o.length/3),u=e(),m=0;m<a;m++)d[3*m+0]=r.x+Math.max(1,r.x)*(Math.random()-.5)*.1,d[3*m+1]=r.y*(1+.2*Math.random()),d[3*m+2]=r.z+Math.max(1,r.z)*(Math.random()-.5)*.1,f[3*m+0]=(Math.random()-.5)*i,f[3*m+1]=n,f[3*m+2]=(Math.random()-.5)*i,l[m]=u*Math.random();for(var p=o[1],v=o[1],m=1,h=o.length/3;m<h;m++){var y=o[3*m+1];p=Math.min(y,p),v=Math.max(y,v)}for(var E=0,m=0,h=o.length/3;m<h;m++){var y=o[3*m+1];c[m]=E+(v-y)/(v-p)*(1-E)}t.addAttribute("translate",new THREE.InstancedBufferAttribute(f,3,1)),t.addAttribute("vector",new THREE.InstancedBufferAttribute(d,3,1)),t.addAttribute("timeOffset",new THREE.InstancedBufferAttribute(l,1,1)),t.addAttribute("opacity2",new THREE.BufferAttribute(c,1,1))}function a(){var t=new THREE.InstancedBufferGeometry;return t.copy(new THREE.SphereBufferGeometry(s.dropRadius)),t}function r(){return s.splashBounce/(.5*s.splashGravity)*2.3}function i(t){for(var o=s.count,a=s.width,i=s.vector,n=new Float32Array(3*o),f=new Float32Array(3*o),d=new Float32Array(o),l=0;l<o;l++){var c=2*Math.random()*Math.PI;n[3*l+0]=Math.sin(c),n[3*l+1]=s.splashBounce*(1+.2*Math.random()),n[3*l+2]=Math.cos(c)}for(var u,m,p,v=1,h=e(),y=r(),l=0;l<o;l++)l%v===0&&(u=h*i.x+(Math.random()-.5)*a,m=h*i.z+(Math.random()-.5)*a,p=y*Math.random()),f[3*l+0]=u,f[3*l+1]=0,f[3*l+2]=m,d[l]=p;t.addAttribute("vector",new THREE.InstancedBufferAttribute(n,3,1)),t.addAttribute("translate",new THREE.InstancedBufferAttribute(f,3,1)),t.addAttribute("timeOffset",new THREE.InstancedBufferAttribute(d,1,1))}var n=this.el,s=this.data,f=t(),d=a();o(f),i(d);var l={time:{value:0},color:{value:new THREE.Color(s.color)},opacity:{value:s.opacity}},c=["#define LOG2 1.442695","attribute float opacity2;","attribute vec3 translate;","attribute vec3 vector;","attribute float timeOffset;","uniform float time;","varying float vOpacity;","varying float vDepthFactor;","varying float vPositionY;","const float duration = float("+e()+");","const float depthDensity = float("+s.depthDensity+");","const float depthDensity2 = depthDensity * depthDensity;","void main() {","  float time2 = mod(time + timeOffset, duration);","  vec3 offset = vector * time2;","  vec3 pos = position + translate + offset;","  vec3 pCenter = translate + offset;","  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);","  float depth = mvPosition.z;","  //float depth = length(mvPosition.xyz);","  float depthFactor = clamp(exp2(-depthDensity2 * depth * depth * LOG2), 0.0, 1.0);","  float sizeFactor = 1.0 - depthFactor * 0.5;","  pos.y = pos.y * sizeFactor + pCenter.y * (1.0 - sizeFactor);","  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);","  vOpacity = opacity2;","  vDepthFactor = depthFactor;","  vPositionY = pos.y;","}"].join("\n"),u=["uniform vec3 color;","uniform float opacity;","varying float vOpacity;","varying float vDepthFactor;","varying float vPositionY;","void main() {","  if (vPositionY < 0.0) { discard; }","  float transparentFactor = 0.5 + vDepthFactor * 0.5;","  gl_FragColor = vec4(color, opacity * vOpacity * transparentFactor);","}"].join("\n"),m={time:l.time,color:l.color,opacity:{value:.8*s.opacity}},p=["attribute vec3 vector;","attribute vec3 translate;","attribute float timeOffset;","uniform float time;","varying float vPositionY;","const float g = float("+s.splashGravity+");","const float duration = float("+r()+");","void main() {","  float time2 = mod(time + timeOffset, duration);","  vec3 offset;","  offset.xz = vector.xz * time2;","  offset.y = vector.y * time2 - 0.5 * g * time2 * time2;","  vec3 pos = vec3(position.x * 2.0, position.y, position.z * 2.0) + offset + translate;","  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);","  vPositionY = pos.y;","}"].join("\n"),v=["uniform vec3 color;","uniform float opacity;","varying float vPositionY;","void main() {","  if (vPositionY < 0.0) { discard; }","  gl_FragColor = vec4(color, opacity);","}"].join("\n"),h=new THREE.ShaderMaterial({uniforms:l,vertexShader:c,fragmentShader:u,transparent:!0}),y=new THREE.ShaderMaterial({uniforms:m,vertexShader:p,fragmentShader:v,transparent:!0}),E=new THREE.Mesh(f,h),w=new THREE.Mesh(d,y);E.add(w),E.frustumCulled=!1,w.frustumCulled=!1,w.visible=s.splash,this.model=E,n.setObject3D("mesh",E),n.emit("model-loaded",{format:"mesh",model:E})}})}]);