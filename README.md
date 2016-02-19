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
```

Interested on playing with this, use [this editor](editor.html), [this timeline](timeline.html) or [both](timeline-editor.html).

## Author

**Patricio Gonzalez Vivo** (Buenos Aires, 1982) is a New York based artist and engineer. He explores interstitial spaces between organic and synthetic, analog and digital, individual and collective.

Patricio studied and practiced psychotherapy and expressive art therapy. He holds an MFA in Design & Technology from Parsons The New School, where he now teaches. Currently he works as a Graphic Engineer at Mapzen making open-source mapping tools.

## Thanks to

* [Jaume Sanchez Elias](https://www.clicktorelease.com/) for helping me with the premultiply alpha problem
* [Bei ZHANG](http://twbs.in/) for [rasterjs](https://bitbucket.org/bzhang/rasterjs) used to encode the binary data
