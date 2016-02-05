function clamp(value, min, max) {
	// return Math.max(min, Math.min(max, value)); // faster??
	return (value > max ? max : value < min ? min : value);
}

var ranges = {
	char: [-128, 127],
	uchar: [0, 255],
	int: [-8290688, 8290687],
	uint: [0, 16581375],
	float: [-1, 1],
	ufloat: [0, 1],
	lon: [-180,180],
	lat: [-90,90],
	rgb: [0, 255],
	vec2: [0, 1],
	vec3: [0, 1],
	vec4: [0, 1],
};

export function getRangeFor(type) {
	return ranges[type];
}
window.getRangeFor = getRangeFor;

export function encodeValue (value, type) {
	if (value < getRangeFor(type)[0] || value > getRangeFor(type)[1]) {
		// console.error (type + ' value ' + value + ' is out of range ' + getRangeFor(type));
		value = clamp(value,getRangeFor(type)[0],getRangeFor(type)[1]);
	}

	if (type === 'uchar') {
	    return [
	        Math.floor(value%255),
	        Math.floor(value%255),
	        Math.floor(value%255),
	        255
	    ];
	}
	else if (type === 'char') {
		return encodeValue(value - getRangeFor(type)[0],'uchar');
	}
	else if (type === 'uint') {
	    return [
	        Math.floor(value%255),
	        Math.floor(value/255)%255,
	        Math.floor(value/(255*255)),
	        255
	    ];
	}
	else if (type === 'int') {
		return encodeValue(value - getRangeFor(type)[0],'uint');
	}
	else if (type === 'float') {
		return encodeValue(.5+value*.5,'ufloat');
	}
	else if (type === 'ufloat') {
		return encodeValue(value*16581375,'uint');
	}
	else if (type === 'pos') {
		return encodeValue(value, 'xy');
	}
	else if (type === 'xy' | type === 'vec2') {
		return [
			Math.floor(value[0]%255),
	        Math.floor(value[0]/255)%255,
	        Math.floor(value[1]%255),
	        Math.floor(value[1]/255)%255
	    ];
	}
	else if (type === 'color') {
		return encodeValue(value, 'rgb');
	}
	else if (type === 'rgb' || type === 'vec3' || type === 'vec4') {
		return [
	        Math.floor((value[0]/getRangeFor(type)[1])*255),
	        Math.floor((value[1]/getRangeFor(type)[1])*255),
	        Math.floor((value[2]/getRangeFor(type)[1])*255),
	        value[3]? Math.floor(value[3]/255): 255
	    ];
	}
}