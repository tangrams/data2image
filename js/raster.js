/**
 * @author Bei ZHANG <ikarienator@gmail.com> http://twbs.in/
 *
 * Copyright Â© 2012 Bei ZHANG <ikarienator@gmail.com>. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution.
 *
 * 3. The name of the author may not be used to endorse or promote products derived
 * from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Bei ZHANG "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

var Base64Map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function PNGStream() {
    this.array = new Uint8Array(PNGSignature);
    this.length = this.array.length;
    this.crcStart = 0;
}

PNGStream.prototype = {

    resetCRC: function () {
        this.crcStart = this.length;
    },

    /**
     *
     * @param w
     */
    writeByte: function (w) {
        if (this.length == this.array.length) {
            var oldArray = this.array;
            this.array = new Uint8Array(this.length * 2);
            this.array.set(oldArray, 0);
        }
        this.array[this.length++] = w;
    },

    writeBytes: function (array) {
        var target = this.array,
            actualLength = target.length,
            length = this.length,
            acc = array.length;
        if (length + acc > actualLength) {
            while (length + acc > actualLength) {
                actualLength <<= 1;
            }
            this.array = new Uint8Array(actualLength);
            this.array.set(target, 0);
            target = this.array;
        }
        target.set(array, length);
        this.length += array.length;
    },

    /**
     *
     * @param w
     */
    writeWord: function (w) {
        this.writeByte(w >> 8);
        this.writeByte(w);
    },

    /**
     * Write a 16bit unsigned int in Lowest Significant First order.
     * @param w
     */
    writeWordLSB: function (w) {
        this.writeByte(w);
        this.writeByte(w >> 8);
    },

    writeInt4: function (w) {
        this.writeByte(w >> 24);
        this.writeByte(w >> 16);
        this.writeByte(w >> 8);
        this.writeByte(w);
    },

    writeType: function (type) {
        this.writeByte(type.charCodeAt(0));
        this.writeByte(type.charCodeAt(1));
        this.writeByte(type.charCodeAt(2));
        this.writeByte(type.charCodeAt(3));
    },

    writeCRC: function () {
        var crc = -1,
            array = this.array,
            length = this.length,
            map = PNGStream.__CRCLookupTable;

        for (var i = this.crcStart; i < length; i++) {
            crc = map[(crc ^ array[i]) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
        }

        crc = crc ^ -1;
        this.writeInt4(crc);
    },

    /**
     * Write a general chunk.
     * @param type {String} type name
     * @param data
     */
    writeChunk: function (type, data) {
        this.writeInt4(data.length);
        this.resetCRC();
        this.writeType(type);
        this.writeBytes(data);
        this.writeCRC();
    },

    /**
     * http://www.w3.org/TR/PNG/#11IHDR
     * @param width
     * @param height
     * @param depth
     * @param colorType
     * @param interlaceMethod {Number} 0 (no interlace, default) or 1 (Adam7 interlace)
     */
    writeIHDRChunk: function (width, height, depth, colorType, interlaceMethod) {
        this.writeInt4(13);
        this.resetCRC();
        this.writeType("IHDR");
        if (!(width > 0)) {
            width = 1;
        }
        if (!(height > 0)) {
            height = 1;
        }
        this.writeInt4(width);
        this.writeInt4(height);

        // Available: 1, 2, 4, 8(default), 16
        this.writeByte(depth || 8);

        // Available: 0, 2, 3, 4, 6(default)
        this.writeByte(colorType === undefined ? 6 : colorType);

        // Compression Method.
        this.writeByte(0);

        // Filter Method.
        this.writeByte(0);

        // Interlace Method.
        this.writeByte(interlaceMethod);

        this.writeCRC();
    },

    /**
     * http://www.w3.org/TR/PNG/#11PLTE
     * @param depth
     * @param colorType
     * @param colors
     */
    writePLTEChunk: function (colorType, depth, colors) {
        // Calculate length
        this.writeInt4(colors.length * depth * 3 >> 3);
        this.resetCRC();
        this.writeType("PLTE");
        for (var i = 0; i < colors.length; i++) {
            this.writeByte(colors[i] >> 16);
            this.writeByte(colors[i] >> 8);
            this.writeByte(colors[i]);
        }
        this.writeCRC();
    },

    writeIDATChunk: function (data) {
        this.writeChunk("IDAT", data);
    },

    writeIENDChunk: function () {
        this.writeInt4(0);
        this.resetCRC();
        this.writeType("IEND");
        this.writeCRC();
    },

    /**
     * Return the Base64Encoding of the stream.
     * @return {String}
     */
    getBase64String: function () {
        var a1, a2, a3,
            e3, e4,
            array = this.array,
            l = this.array.length,
            n = l - l % 3,
            r = [],
            k = 0;

        for (var i = 0; i < n; i += 3) {
            a1 = array[i];
            a2 = array[i + 1];
            a3 = array[i + 2];
            r.push(Base64Map.charAt(a1 >> 2) + Base64Map.charAt(((a1 & 3) << 4) | (a2 >> 4)) +
                Base64Map.charAt(((a2 & 0xf) << 2) | (a3 >> 6)) + Base64Map.charAt(a3 & 0x3f));
        }

        a1 = array[i];
        a2 = array[i + 1];
        a3 = array[i + 2];
        if (typeof a2 === 'undefined') {
            e3 = e4 = 64;
        } else {
            e3 = ((a2 & 0xf) << 2) | (a3 >> 6);
            if (typeof a3 === 'undefined') {
                e4 = 64;
            } else {
                e4 = a3 & 0x3f;
            }
        }
        r.push(Base64Map.charAt(a1 >> 2) + Base64Map.charAt(((a1 & 3) << 4) | (a2 >> 4)) +
            Base64Map.charAt(e3) + Base64Map.charAt(e4));

        return r.join('');
    }
};


/**
 *
 * @type {Array}
 * @private
 */
PNGStream.__CRCLookupTable = (function () {
    var _crc32 = new Uint32Array(256);
    /* Create crc32 lookup table */
    for (var i = 0; i < 256; i++) {
        var c = i;
        for (var j = 0; j < 8; j++) {
            if (c & 1) {
                c = -306674912 ^ ((c >> 1) & 0x7fffffff);
            } else {
                c = (c >> 1) & 0x7fffffff;
            }
        }
        _crc32[i] = c;
    }
    return _crc32;
})();

var PNGSignature = [137, 80, 78, 71, 13, 10, 26, 10];

function adler32(data, length) {
    // compute adler32 of output pixels + row filter bytes
    var MOD_ADLER = 65521;
    /* largest prime smaller than 65536 */
    var NMAX = 5552;
    /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
    var a = 1;
    var b = 0;
    var n = NMAX;

    for (var i = 0; i < length; i++) {
        a += data[i];
        b += a;
        if ((n -= 1) == 0) {
            a %= MOD_ADLER;
            b %= MOD_ADLER;
            n = NMAX;
        }
    }
    a %= MOD_ADLER;
    b %= MOD_ADLER;
    return (b << 16) | a;
}

/**
 * http://tools.ietf.org/html/rfc1950
 * http://tools.ietf.org/html/rfc1951 3.2.4
 * @param data
 */
function zlibNoCompression(data, length) {
    var buffer = new Uint8Array(2 + 4 + 5 * Math.ceil(length / 0xffff) + length),
        header = ((8 + (7 << 4)) << 8) | (3 << 6),
        continueHeader = [0, 0xff, 0xff, 0, 0],
        pos = 0, rest;
    header += 31 - (header % 31);
    buffer[pos++] = header >> 8;
    buffer[pos++] = header;
    for (var i = 0; i + 0xffff < length; i += 0xffff) {
        buffer.set(continueHeader, pos);
        pos += 5;
        buffer.set(data.subarray(i, i + 0xffff), pos);
        pos += 0xffff;
    }
    rest = length - i;
    if (rest) {
        buffer[pos++] = 1;
        buffer[pos++] = rest & 0xff;
        buffer[pos++] = (rest >> 8) & 0xff;
        rest = ~rest;
        buffer[pos++] = rest & 0xff;
        buffer[pos++] = (rest >> 8) & 0xff;
        buffer.set(data.subarray(i), pos);
        pos += ~rest;
    }

    var checksum = adler32(data, length);
    buffer[pos++] = checksum >> 24;
    buffer[pos++] = checksum >> 16;
    buffer[pos++] = checksum >> 8;
    buffer[pos++] = checksum;
    return buffer;
}

function rowFilter(width, height, samples, image) {
    var result = new Uint8Array((width * samples + 1) * height),
        w = width * samples,
        pos = 0;
    for (var y = 0, j = 0; y < height; y++, j += w) {
        result[pos++] = 0;
        result.set(image.slice(j, j + w), pos);
        pos += w;
    }
    return result;
}

/**
 * Encode an RGBA list into UTF-8 PNG.
 *
 * @param image
 * @param width
 * @param height
 */
export function encodeRGBAtoPNG(image, width, height) {
    var stream = new PNGStream();
    stream.writeIHDRChunk(width, height, 8/* 8 bit depth*/, 6 /* True-color with alpha */, 0 /* No interlace */);
    image = rowFilter(width, height, 4, image);
    image = zlibNoCompression(image, image.length);
    stream.writeIDATChunk(image);
    stream.writeIENDChunk();
    return 'data:image/png;base64,' + stream.getBase64String();
}

// raster.encodeRGBAtoPNG = encodeRGBAtoPNG;