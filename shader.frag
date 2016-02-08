// Author @patriciogv - 2016
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform float u_time;

float binChar (vec2 ipos, float n) {
    highp float remain = mod(n,35000.)+1.;
    for (float i = 0.0; i < 15.0; i++) {
        if ( floor(i/3.) == ipos.y && mod(i,3.) == ipos.x ) {
            return step(1.0,mod(remain,2.));
        }
        remain = ceil(remain/2.);
    }
    return 0.0;
}

float char (vec2 st, float n) {
    st.x = st.x*2.-0.5;
    st.y = st.y*1.2-0.1;

    vec2 grid = vec2(3.,5.);

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);
    
    highp float digit = 0.0;
    if (n == -1.) { 
        digit = 448.0; 
    } else {
        n = floor(mod(n,10.));
        if (n == 0. ) { digit = 31599.; } 
        else if (n == 1. ) { digit = 9362.0; } 
        else if (n == 2. ) { digit = 31183.0; } 
        else if (n == 3. ) { digit = 31207.0; } 
        else if (n == 4. ) { digit = 23524.0; } 
        else if (n == 5. ) { digit = 29671.0; } 
        else if (n == 6. ) { digit = 29679.0; } 
        else if (n == 7. ) { digit = 31012.0; } 
        else if (n == 8. ) { digit = 31727.0; } 
        else if (n == 9. ) { digit = 31716.0; }
    }
    

    highp float pct = binChar(ipos, digit);

    vec2 borders = vec2(1.);
    borders *= step(0.01,fpos.x) * step(0.01,fpos.y);   // inner
    borders *= step(0.0,st)*step(0.0,1.-st);            // outer

    return (1.0-pct) * borders.x * borders.y;
}

float writeValue(vec2 st, vec2 size, sampler2D tex, vec2 coord) {
    size = ceil(size);
    
    highp vec2 ipos = floor(st*size);
    highp vec2 fpos = fract(st*size);

    highp vec4 value = texture2D(tex, coord);
    highp float uint = floor(value.x*255.)+floor(value.y*65025.)+floor(value.z*16581375.);
    float press = ceil(value.a*255.)-127.;
    float s = sign(press);
    press = abs(press);
    uint = mod(floor(uint*pow(10.,-ceil(size.x-ipos.x-1.))),10.);
    
    float rta = 0.0;
    if (ipos.y == 0.0) {
        if (ipos.x == 0.0) {   
            if (s < 0.) {
                rta = char(fpos,-1.);
            } else {
                rta = 0.;
            }
        } else {
            rta = char(fpos,floor(uint))*(ipos.x<size.x-press?1.:.5);
        }
    }
    
    return rta;
}

vec2 getCoord(vec2 res, float col, float row) {
    return fract(vec2(col,row+.5)/res);
}

float getNumber(sampler2D tex, vec2 res, float col, float row) {
    vec2 coord = getCoord(res, col, row);
    highp vec4 value = texture2D(tex, coord);
    highp float uint = (value.x*255.)+(value.y*65025.)+(value.z*16581375.);
    float press = ceil(value.a*255.)-127.;
    float s = mod(sign(press),127.);
    press = pow(10.,-floor(press));
    return uint * press * s;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    vec2 pixel = 1./u_tex0Resolution;
    vec4 tex = texture2D(u_tex0,st);
    
    vec2 pos = vec2(u_time,floor(st.y*u_tex0Resolution.y));
    vec2 coord = getCoord(u_tex0Resolution,pos.x,pos.y);
    vec2 header = step(coord-vec2(pixel.x*.5,0.025),st)-step(coord+vec2(pixel.x*.5,0.025),st);
    
    st.y *= u_tex0Resolution.y;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec3 color = tex.rgb;
    color += header.x*header.y;
    color += writeValue(fpos,vec2(10.,3.),u_tex0, coord);

    gl_FragColor = vec4( color , 1.0);
}