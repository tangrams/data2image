## Data2Image

Experimental tool to encode data into color. How? Define elements, their ```type``` and a ```function``` of how to populate it's content. Then provide how many instances of those elements you want.

```js
var data = new Data2Image();
var instances = 200;
data.setTotalInstances(instances);
data.addElement('negative_integerx100','number', (instance, element) => {
    return -instance*100;
});
data.addElement('negative_integerx10','number', (instance, element) => {
    return -instance*10;
});
data.addElement('negative_integer','number', (instance, element) => {
    return -instance;
});
data.addElement('float','number', (instance, element) => {
    return instance/instances;
});
data.addElement('integer','number', (instance, element) => {
    return instance;
});
data.addElement('integerx5','number', (instance, element) => {
    return instance*5;
});
data.addElement('integerx10','number', (instance, element) => {
    return instance*10;
});
data.addElement('integerx100','number', (instance, element) => {
    return instance*100;
});
var canvas = data.generate();
```

This construct a database of rows and columns which values are store as color.

<canvas id="shader" data-fragment-url="data/display.frag" width="800" height="600" ></canvas>

To recover the values on the shader you can use the following code:

```glsl
vec2 getCoord(vec2 texture_resolution, float col, float row) {
    return fract(vec2(col,row+.5)/texture_resolution);
}

vec3 getElements(sampler2D texture, vec2 coord) {
    highp vec4 value = texture2D(texture, coord);
    highp float uint = (value.x*255.)+(value.y*65025.)+(value.z*16581375.);
    float press = ceil(value.a*255.)-244.;
    return vec3(uint, abs(press), sign(press));
}

float getNumber(sampler2D texture, vec2 texture_resolution, float col, float row) {
    vec2 coord = getCoord(texture_resolution, col, row);
    highp vec3 elements = getElements(texture, coord);
    return elements.x * pow(10.,-floor(elements.y)) * elements.z;
}
```

Interested on playing with this, use [this editor](editor.html), [this timeline](timeline.html) or [both](timeline-editor.html).
