
import { encodeValue } from './encode';
import { getDecodeFunctionFor } from './decode';
import { encodeRGBAtoPNG } from './raster';
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

	getUrl () {
		let width = this.getTotalInstances();
		let height = this.getTotalElements();

	    let channels = 4;
	    let rgba = new Array(width * height * channels);
	    let index, r, i, v;	
	    for (let y = 0; y < height; y++) {
	        for (let x = 0; x < width; x++) {
	            index = (y*width+x)*channels;
	            v = this.elements[y].fill(x, this.elements[y]);
				let value = encodeValue(v, this.elements[y].type, this.elements[y].range);
				for (i = 0; i < channels; i++) {
					rgba[index+i] = value[i];
				}
	        }
	    }
	    return encodeRGBAtoPNG(rgba, width, height);
	}

	getImg () {
		let img = document.createElement("IMG");
		img.setAttribute('src', this.getURL());
		return img;
	} 

	version () {
        return '0.0.3';
    }
}

window.Data2Image = Data2Image;