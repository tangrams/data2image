import { getRangeFor } from './encode';

var common = `
vec2 getCoord(vec2 res, float col, float row) {
    return fract(vec2(col,row+.5)/res);
}`+'\n';

var uint = common + `
float getUInt(sampler2D tex, vec2 res, float col, float row) {
    highp vec4 value = texture2D(tex, coord);
    return (value.x*255.)+(value.y*65025.)+(value.z*16581375.);
}`;

var ufloat = common + `
float getUFloat(sampler2D tex, vec2 res, float col, float row) {
    highp vec4 value = texture2D(tex, coord);
    return ((value.x*255.)+(value.y*65025.)+(value.z*16581375.))/16581375.;
}`;

var position = common + `
vec2 getPosition(sampler2D tex, vec2 res, float col, float row) {
    vec2 coord = getCoord(res, col, row);
    highp vec4 value = texture2D(tex, coord);
    float x = (value.r*255+value.g*65025.)/65025.;
    float y = (value.b*255.+value.a*65025.)/65025.;
    return vec2(x,y);
}`+'\n';

var color = common + `
vec4 getColor(sampler2D tex, vec2 res, float col, float row) {
    vec2 coord = getCoord(res, col, row);
    return texture2D(tex, coord);
}`+'\n';

var decode = {
    uint: uint,
    int: uint + `
float getInt(sampler2D tex, vec2 res, float col, float row) {
    return getUInt(tex,res,col,row)-8290688.;
}`,
    ufloat: ufloat,
    float: ufloat + `
float getUFloat(sampler2D tex, vec2 res, float col, float row) {
    return (getUFloat(tex,res,col,row)-.5)*2.;
}`,
    number: common + `
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
}`+'\n',
    position: position,
    color: color,
    rgb: color,
    vec2: position,
    vec3: color,
    vec4: color
}

export function getDecodeFunctionFor (type) {
    return decode[type];
}

window.getDecodeFunctionFor = getDecodeFunctionFor;