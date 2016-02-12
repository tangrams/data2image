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
	position: [-1, 1],
	color: 	[0, 255],
	rgb: 	[0, 255],
	vec2: 	[-1, 1],
	vec3: 	[-1, 1],
	vec4: 	[-1, 1]
};

export function getRangeFor (type) {
	return ranges[type];
}

function clampValue (value, range) {
	if (value < range[0] || value > range[1]) {
		console.warn('Value',value,'is out of range',range,'will be clamped to', clamp(value,range[0],range[1]));
		return clamp(value,range[0],range[1]);
	}
	else {
		return value;
	}
}

function normalizeValue (value, range) {
	return map(value,range[0],range[1],0,1);
}

export function encodeValue (value, type, range) {
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
	else if (type === 'position' || type === 'vec2') {				
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

window.getRangeFor = getRangeFor;