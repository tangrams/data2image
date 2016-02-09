export function clamp(value, min, max) {
	// return Math.max(min, Math.min(max, value)); // faster??
	return (value > max ? max : value < min ? min : value);
}

export function getDecimals(number) {
	let match = (Math.abs(number) + '').match(/\d+\.(\d+)/);
	return match? match[1].length : 0;
}