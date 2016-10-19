#!/usr/bin/env python
from PIL import Image
import encode

lut = [[0.8487,0.84751182,0.84479598,0.840213,0.83359314,0.8257851,0.814752,0.80006949,0.78216192,0.76060494,0.73658673,0.7086645,0.67777182,0.64475739,0.60987582,0.57134484,0.52729731,0.48562614,0.45167814],[0,0.0838426,0.1676852,0.2515278,0.3353704,0.419213,0.5030556,0.5868982,0.67182264,0.75336633,0.83518048,0.91537187,0.99339958,1.06872269,1.14066505,1.20841528,1.27035062,1.31998003,1.3523]]

print len(lut[0]),len(lut)

img = Image.new('RGBA', (len(lut[0]), len(lut)), (0,0,0,0))
pixels = img.load()

for y in range(len(lut)):
    for x in range(len(lut[0])):
        pixels[x,y] = encode.toRGBA(lut[y][x],'number')
        pixels[x,y] = encode.toRGBA(lut[y][x],'number')

img.save(open('lut.png', 'w'))