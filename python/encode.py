#!/usr/bin/env python
import math, numpy

# Default Ranges
ranges = {
    "number": [-16581375.,16581375.],
    "char":   [-128., 127.],
    "uchar":  [0., 255.],
    "int":    [-8290688., 8290687.],
    "uint":   [0., 16581375.],
    "float":  [-1., 1.],
    "ufloat": [0., 1.],
    "position": [-1., 1.],
    "color":  [0., 255.],
    "rgb":    [0., 255.],
    "vec2":   [-1., 1.],
    "vec3":   [-1., 1.],
    "vec4":   [-1., 1.]
}

def getType(_x):
    if isinstance(_x, list):
        if len(_x) == 2:
            return "vec2"
        elif len(_x) == 3:
            return "vec3"
        elif len(_x) == 4:
            return "vec4"
    elif isinstance(_x, float) and (_x > 1. or _x < -1):
        return "number"
    else:
        return type(_x).__name__ 

def map(_value, _src, _dst):
    return ((_value - _src[0]) / (_src[1]-_src[0])) * (_dst[1]-_dst[0]) + _dst[0]

def clamp (_value, _range):
    return max(_range[0], min(_value, _range[1]))

def fract (_value):
    return _value - int(_value)

def normalize (_value, _range):
    return map(_value,_range,[0,1])

def toRGBA(_value, _type = "undefined"):
    if _type == "undefined":
        _type = getType(_value)

    print "converting",_type,"to RGBA"

    if isinstance(_value, list):
        for val in _value:
            val = clamp(val, ranges[_type])
            val = normalize(val, ranges[_type])
    else:
        _value = clamp(_value, ranges[_type])
        if _type != "number":
            # "Number" type don't need normaliztion because tries to set the presition dinamically
            _value = normalize(_value, ranges[_type])

    # print "After clamping:", _value

    if _type == 'uchar' or _type == 'char': 
        _value *= 255
        return (int(math.floor(_value)), int(math.floor(_value)), int(math.floor(_value)), 255)
    elif _type == 'int' or _type == 'uint'  or _type == 'float' or _type == 'ufloat':
        _value = _value*16581375
        return (int(math.floor(_value%255)), int(math.floor(_value/255)%255), int(math.floor(_value/(255*255))), 255)
    elif (_type == 'number'):
        s = numpy.sign(_value)
        d = fract(_value)+1.
        uint = abs(_value) * math.pow(10.,d) # transform the number into unsigned integers
        pres = 244 + d*s
        # print "_Value:",_value,"S:",s,"D:",d,"Uint:",uint,"Press:",pres
        return (int(math.floor(uint)%255), int(math.floor(uint/255)%255), int(math.floor(uint/65025)%255), int(math.floor(pres)%255))
    elif _type == 'position' or _type == 'vec2':           
        x = _value[0]*65025;
        y = _value[1]*65025;
        return (int(math.floor(x%255)), int(math.floor(x/255)%255), int(math.floor(y%255)), int(math.floor(y/255)%255))
    elif _type == 'color' or _type == 'rgb' or _type == 'vec3' or _type == 'vec4':
        if len(_value) == 3:
            return (int(math.floor(_value[0]*255)), int(math.floor(_value[1]*255)), int(math.floor(_value[2]*255)), 255)
        else:
            return (int(math.floor(_value[0]*255)), int(math.floor(_value[1]*255)), int(math.floor(_value[2]*255)), int(math.floor(_value[3]*255)))
