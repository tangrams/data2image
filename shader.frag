// Author @patriciogv - 2016
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform float u_time;

const float kCharBlank = 12.0;
const float kCharMinus = 11.0;
const float kCharDecimalPoint = 10.0;

// https://www.shadertoy.com/view/4sf3RN
float SampleDigit(const in float fDigit, const in vec2 vUV) {       
    if(vUV.x < 0.0) return 0.0;
    if(vUV.y < 0.0) return 0.0;
    if(vUV.x >= 1.0) return 0.0;
    if(vUV.y >= 1.0) return 0.0;
    
    // In this version, each digit is made up of a 4x5 array of bits
    float fDigitBinary = 0.0;
    
    if(fDigit < 0.5) { // 0
        fDigitBinary = 7.0 + 5.0 * 16.0 + 5.0 * 256.0 + 5.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 1.5) { // 1
        fDigitBinary = 2.0 + 2.0 * 16.0 + 2.0 * 256.0 + 2.0 * 4096.0 + 2.0 * 65536.0;
    } else if(fDigit < 2.5) { // 2
        fDigitBinary = 7.0 + 1.0 * 16.0 + 7.0 * 256.0 + 4.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 3.5) { // 3
        fDigitBinary = 7.0 + 4.0 * 16.0 + 7.0 * 256.0 + 4.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 4.5) { // 4
        fDigitBinary = 4.0 + 7.0 * 16.0 + 5.0 * 256.0 + 1.0 * 4096.0 + 1.0 * 65536.0;
    } else if(fDigit < 5.5) { // 5
        fDigitBinary = 7.0 + 4.0 * 16.0 + 7.0 * 256.0 + 1.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 6.5) { // 6
        fDigitBinary = 7.0 + 5.0 * 16.0 + 7.0 * 256.0 + 1.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 7.5) { // 7
        fDigitBinary = 4.0 + 4.0 * 16.0 + 4.0 * 256.0 + 4.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 8.5) { // 8
        fDigitBinary = 7.0 + 5.0 * 16.0 + 7.0 * 256.0 + 5.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 9.5) { // 9
        fDigitBinary = 7.0 + 4.0 * 16.0 + 7.0 * 256.0 + 5.0 * 4096.0 + 7.0 * 65536.0;
    } else if(fDigit < 10.5) { // '.'
        fDigitBinary = 2.0 + 0.0 * 16.0 + 0.0 * 256.0 + 0.0 * 4096.0 + 0.0 * 65536.0;
    } else if(fDigit < 11.5) { // '-'
        fDigitBinary = 0.0 + 0.0 * 16.0 + 7.0 * 256.0 + 0.0 * 4096.0 + 0.0 * 65536.0;
    }

    vec2 vPixel = floor(vUV * vec2(4.0, 5.0));
    float fIndex = vPixel.x + (vPixel.y * 4.0);
    return mod(floor(fDigitBinary / pow(2.0, fIndex)), 2.0);
}

float PrintValue(const in vec2 vStringCharCoords, const in float fValue, const in float fMaxDigits, const in float fDecimalPlaces) {
    float fAbsValue = abs(fValue);
    float fStringCharIndex = floor(vStringCharCoords.x);
    float fLog10Value = log2(fAbsValue) / log2(10.0);
    float fBiggestDigitIndex = max(floor(fLog10Value), 0.0);
    
    // This is the character we are going to display for this pixel
    float fDigitCharacter = kCharBlank;
    float fDigitIndex = fMaxDigits - fStringCharIndex;
    if(fDigitIndex > (-fDecimalPlaces - 1.5)) {
        if(fDigitIndex > fBiggestDigitIndex) {
            if(fValue < 0.0) {
                if(fDigitIndex < (fBiggestDigitIndex+1.5)) {
                    fDigitCharacter = kCharMinus;
                }
            }
        } else {        
            if(fDigitIndex == -1.0) {
                if(fDecimalPlaces > 0.0) {
                    fDigitCharacter = kCharDecimalPoint;
                }
            } else {
                if(fDigitIndex < 0.0) {
                    // move along one to account for .
                    fDigitIndex += 1.0;
                }
                float fDigitValue = (fAbsValue / (pow(10.0, fDigitIndex)));

                // This is inaccurate - I think because I treat each digit independently
                // The value 2.0 gets printed as 2.09 :/
                //fDigitCharacter = mod(floor(fDigitValue), 10.0);
                fDigitCharacter = mod(floor(0.0001+fDigitValue), 10.0); // fix from iq
            }       
        }
    }

    vec2 vCharPos = vec2(fract(vStringCharCoords.x), vStringCharCoords.y);
    return SampleDigit(fDigitCharacter, vCharPos);  
}

float PrintValue(in vec2 fragCoord, const in vec2 vPixelCoords, const in vec2 vFontSize, const in float fValue, const in float fMaxDigits, const in float fDecimalPlaces){
    return PrintValue((fragCoord.xy - vPixelCoords) / vFontSize, fValue, fMaxDigits, fDecimalPlaces);
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
    vec3 elements = getElements(u_tex0, coord);
    float value = elements.x * pow(10.,-floor(elements.y)) * elements.z;
    
    // Multiples of 4x5 work best
    vec2 vFontSize = vec2(4.0, 15.0);
    color += PrintValue(fpos*vec2(140.,70.), vec2(110.0,5.0), vFontSize, value, 1., elements.y-1.);

    gl_FragColor = vec4( color , 1.0);
}