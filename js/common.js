export function clamp(value, min, max) {
	// return Math.max(min, Math.min(max, value)); // faster??
	return (value > max ? max : value < min ? min : value);
}

export function map(value, inputMin, inputMax, outputMin, outputMax, clamp = true ) {
    if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
        return outputMin;
    } else {
        var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
        if (clamp) {
            if (outputMax < outputMin) {
                if (outVal < outputMax) {
                	outVal = outputMax;
                }
                else if( outVal > outputMin ) {
                	outVal = outputMin;
                }
            } 
            else {
                if (outVal > outputMax) {
                	outVal = outputMax;
                }
                else if( outVal < outputMin ) {
                	outVal = outputMin;
                }
            }
        }
        return outVal;
    }
}

export function decimals(number) {
	let match = (Math.abs(number) + '').match(/\d+\.(\d+)/);
	return match? match[1].length : 0;
}