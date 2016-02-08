export function clamp(value, min, max) {
	// return Math.max(min, Math.min(max, value)); // faster??
	return (value > max ? max : value < min ? min : value);
}

export function getDecimals(number) {
	let match = (Math.abs(number) + '').match(/\d+\.(\d+)/);
	return match? match[1].length : 0;
}

var ranges = {
	number: [-16581375,16581375],
	color: [0, 255],
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
		console.log('Value',value,'of type', type,'is out of range',getRangeFor(type),'will be clamped to',value);
		value = clamp(value,getRangeFor(type)[0],getRangeFor(type)[1]);
	}

	if (type === 'number') {
		let s = Math.sign(value);
		let d = getDecimals(value)+1.;
		let uint = Math.abs(value) * Math.pow(10,d);	// transform the number into unsigned integers
		let pres = 127 + d*s;
		console.log("Value:",value,"S:",s,"D:",d,"Uint:",uint,"Press:",pres);
	    return [
	        Math.floor(uint%255),
	        Math.floor(uint/255)%255,
	        Math.floor(uint/(255*255)),
	        pres
	    ];
	}
	else if (type === 'position') {
		// Values have to be normalized [-1,1]
		return encodeValue(value, 'vec2');
	}
	else if (type === 'vec2') {				
		let x = value[0];
		let y = value[1];
		x = .5+x*.5;;
		y = .5+y*.5;
		x *= 65025;
		y *= 65025;
		return [
			Math.floor(x%255),
	        Math.floor(x/255)%255,
	        Math.floor(y%255),
	        Math.floor(y/255)%255
	    ];
	}
	else if (type === 'color') {
		// Values between [0,255]
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