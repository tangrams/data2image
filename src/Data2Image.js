import { clamp, map, decimals } from './common';

// Default Ranges
var ranges = {
	number: [-16581375,16581375],
	char: 	[-128, 127],
	uchar: 	[0, 255],
	int: 	[-8290688, 8290687],
	uint: 	[0, 16581375],
	float: 	[-1, 1],
	ufloat: [0, 1],
	color: 	[0, 255],
	rgb: 	[0, 255],
	position: [-1, 1],
	vec2: 	[-1, 1],
	vec3: 	[-1, 1],
	vec4: 	[-1, 1]
};

// Class
export default class Data2Image {
	constructor (options) {
		this.options = options || {};
		this.elements = [];
		this.instances = 0;
	}

	addElement (name, type, populate_callback, range) {
		this.elements.push({ id: this.elements.length, name: name, type: type, range: range, fill: populate_callback });
	}

	getTotalElements () {
		return this.elements.length;
	}

	setTotalInstances (number) {
		this.instances = number;
	}

	getTotalInstances () {
		return this.instances;
	}

	getTableSize () {
		return [this.getTotalInstances(), this.getTotalElements()];
	}

	generate () {
		let width = this.getTotalInstances();
		let height = this.getTotalElements();

		let canvas = document.createElement("canvas");
	    canvas.width = width;
	    canvas.height = height;

		let ctx = canvas.getContext('2d');
	    let imageData = ctx.createImageData(width, height);
	    let data = imageData.data;
	    let index, y, x, r, i;	    	
	    let channels = 4;
	    let value;

	    for (y = 0; y < height; y++) {
	        for (x = 0; x < width; x++) {
	            index = (y*width+x)*channels;
	            let v = this.elements[y].fill(x, this.elements[y]);
				value = encodeValue(v, this.elements[y].type, this.elements[y].range);
				for (i = 0; i < channels; i++) {
					data[index+i] = value[i];
				}
	        }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    return canvas;
	}

	version () {
        return '0.0.2';
    }
}

function getRangeFor (type) {
	return ranges[type];
}

function clampValue (value, range) {
	if (value < range[0] || value > range[1]) {
		console.log('Value',value,'is out of range',range,'will be clamped to',value);
		return clamp(value,range[0],range[1]);
	}
	else {
		return value;
	}
}

function normalizeValue (value, range) {
	return map(value,range[0],range[1],0,1);
}

function encodeValue (value, type, range) {
	if (!range) {
		range = getRangeFor(type);
	}

	if (typeof value === 'number') {
		value = clampValue(value, range);
		if (type !== 'number') {
			// "Number" type don't need normaliztion because tries to set the presition dinamically
			value = normalizeValue(value, range);
		}
	} 
	else if (Array.isArray(value)) {
		for (let i in value) {
			value[i] = clampValue(value[i], range);
			if (type !== 'number') {
				// "Number" type don't need normaliztion because tries to set the presition dinamically
				value[i] = normalizeValue(value[i], range);
			}
		}
	} 
	else {
		console.log('Value type could not be read', value, type, range);
		return;
	}
	
	if (type === 'uchar' || type === 'char') {
		value *= 255;
	    return [
	        Math.floor(value),
	        Math.floor(value),
	        Math.floor(value),
	        255
	    ];
	}
	else if (type === 'int' || type === 'uint'  || type === 'float' || type === 'ufloat') {
		value = value*16581375;
	    return [
	        Math.floor(value%255),
	        Math.floor(value/255)%255,
	        Math.floor(value/(255*255)),
	        255
	    ];
	}
	else if (type === 'number') {
		let s = Math.sign(value);
		let d = decimals(value)+1.;
		let uint = Math.abs(value) * Math.pow(10,d);	// transform the number into unsigned integers
		let pres = 244 + d*s;
		// console.log("Value:",value,"S:",s,"D:",d,"Uint:",uint,"Press:",pres);
	    return [
	        Math.floor(uint%255),
	        Math.floor(uint/255)%255,
	        Math.floor(uint/(255*255)),
	        pres
	    ];
	}
	else if (type === position || type === 'vec2') {				
		let x = value[0]*65025;
		let y = value[1]*65025;
		return [
			Math.floor(x%255),
	        Math.floor(x/255)%255,
	        Math.floor(y%255),
	        Math.floor(y/255)%255
	    ];
	}
	else if (type === 'color' || type === 'rgb' || type === 'vec3' || type === 'vec4') {
		return [
	        Math.floor(value[0]*255),
	        Math.floor(value[1]*255),
	        Math.floor(value[2]*255),
	        value[3] ? Math.floor(value[3]*255): 255
	    ];
	}
}

window.Data2Image = Data2Image;