import {getRangeFor, encodeValue } from './common';

export default class Data2Image {
	constructor (options) {
		this.options = options || {};
		this.elements = [];
		this.instances = 0;
	}

	addElement(name, type, populate_callback) {
		this.elements.push({ name: name, type: type, fill: populate_callback, id: this.elements.length });
	}

	getTotalElements() {
		return this.elements.length;
	}

	setTotalInstances(number) {
		this.instances = number;
	}

	getTotalInstances() {
		return this.instances;
	}

	getTableSize() {
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
				value = encodeValue(v, this.elements[y].type);
				for (i = 0; i < channels; i++) {
					data[index+i] = value[i];
				}
	        }
	    }
	    ctx.putImageData(imageData, 0, 0);
	    return canvas;
	}

	version () {
        return '0.0.1';
    }
}

window.encodeValue = encodeValue;
window.Data2Image = Data2Image;