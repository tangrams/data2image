// Author @patriciogv - 2016
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_frame;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 st, in vec2 size){
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(in vec2 st, float size){
    return  box(st, vec2(size,size/4.)) + 
            box(st, vec2(size/4.,size));
}

vec2 getCoord(vec2 res, float col, float row) {
    vec2 st = fract(vec2(col+.5,row+.5)/res);
    st.y = 1.0-st.y;
    return st;
}

vec3 getElements(sampler2D tex, vec2 coord) {
    vec4 value = texture2D(tex, coord);
    float uint = dot(value.rgb,vec3(255.,65025.,16581375.));
    float press = floor(value.a*256.)-244.;
    return vec3(floor(uint), abs(press), sign(press));
}

float getNumber(sampler2D tex, vec2 res, float col, float row) {
    vec2 coord = getCoord(res, col, row);
    vec3 elements = getElements(tex, coord);
    return elements.x * pow(10.,-floor(elements.y)) * elements.z;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    float t = u_time*100.;
    t = u_frame;
    float a = getNumber(u_tex0,u_tex0Resolution, t, 0.);
    float b = getNumber(u_tex0,u_tex0Resolution, t, 1.);
    float c = getNumber(u_tex0,u_tex0Resolution, t, 2.);
    float d = getNumber(u_tex0,u_tex0Resolution, t, 3.);
    
    vec2 translate = vec2(a,b)*0.005;

    st += translate;
    
    st -= .5;
    st = rotate2d(c*0.1) * st;
    st += .5;
    
    color += vec3(cross(st,0.1+d*0.01));

    gl_FragColor = vec4(color,1.0);
}