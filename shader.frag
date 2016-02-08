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
    float remain = mod(n,33554430.);
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

    n = floor(mod(n,10.));
    float digit = 0.0;
    if (n < 1. ) { digit = 31600.; } 
    else if (n < 2. ) { digit = 9363.0; } 
    else if (n < 3. ) { digit = 31184.0; } 
    else if (n < 4. ) { digit = 31208.0; } 
    else if (n < 5. ) { digit = 23525.0; } 
    else if (n < 6. ) { digit = 29672.0; } 
    else if (n < 7. ) { digit = 29680.0; } 
    else if (n < 8. ) { digit = 31013.0; } 
    else if (n < 9. ) { digit = 31728.0; } 
    else if (n < 10. ) { digit = 31717.0; }
    float pct = binChar(ipos, digit);

    vec2 borders = vec2(1.);
    // borders *= step(0.01,fpos.x) * step(0.01,fpos.y);   // inner
    borders *= step(0.0,st)*step(0.0,1.-st);            // outer

    return step(.5,1.0-pct) * borders.x * borders.y;
}

float writeValue(vec2 st, vec2 size, float value) {
    size = ceil(size);
    
    vec2 ipos = floor(st*size);
    vec2 fpos = fract(st*size);

    value = (value)*pow(10.,ipos.x)*0.000000001+0.0000001;
    if (ipos.y == 0.0) {
        return char(fpos,value)*(ipos.x<size.x-3.?1.:.5);
    } else {
        return 0.0;
    }
}

vec2 getCoord(vec2 res, float col, float row) {
    return fract(vec2(col,row+.5)/res);
}

float getNumber(sampler2D tex, vec2 res, float col, float row) {
    vec4 value = texture2D(tex, getCoord(res, col, row));
    float unsigned_int = (value.x*255.)+(value.y*65025.)+(value.z*16581375.);
    float press = value.a*255.-127.;
    float s = sign(press);
    press = pow(10.,-floor(press));
    return unsigned_int * press * s;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    vec2 pixel = 1./u_tex0Resolution;
    
    vec2 pos = vec2(floor(u_time),floor(st.y*u_tex0Resolution.y));
    float value = getNumber(u_tex0,u_tex0Resolution,pos.x,pos.y);
    vec4 tex = texture2D(u_tex0,st);
    vec2 coord = getCoord(u_tex0Resolution,pos.x,pos.y);
    vec2 zone = step(coord-vec2(pixel.x*.5,0.025),st)-step(coord+vec2(pixel.x*.5,0.025),st);
    tex.rgb += zone.x*zone.y;

    st.y *= u_tex0Resolution.y;

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec3 color = tex.rgb;
    color += writeValue(fpos,vec2(13.,3.),value);

    gl_FragColor = vec4( color , 1.0);
}