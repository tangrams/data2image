// Author @patriciogv - 2016
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform float u_time;

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
    return fract(vec2(col,row+.5)/res);
}

vec3 getElements(sampler2D tex, vec2 coord) {
    highp vec4 value = texture2D(tex, coord);
    highp float uint = (value.x*255.)+(value.y*65025.)+(value.z*16581375.);
    float press = ceil(value.a*255.)-244.;
    return vec3(uint, abs(press), sign(press));
}

float getNumber(sampler2D tex, vec2 res, float col, float row) {
    vec2 coord = getCoord(res, col, row);
    highp vec3 elements = getElements(tex, coord);
    return elements.x * pow(10.,-floor(elements.y)) * elements.z;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    vec3 color = vec3(0.0);
        
    // To move the cross we move the space
    float t = u_time*20.;
    float a = getNumber(u_tex0,u_tex0Resolution, t, 1.);
    float b = getNumber(u_tex0,u_tex0Resolution, t, 2.);
    float c = getNumber(u_tex0,u_tex0Resolution, t, 3.);
    float d = getNumber(u_tex0,u_tex0Resolution, t, 4.);
    
    vec2 translate = vec2(a,b);

    color += vec3(cross(st+translate*0.02,0.25));

    gl_FragColor = vec4(color,1.0);
}