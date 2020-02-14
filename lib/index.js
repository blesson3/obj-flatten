"use strict";

const iterateObject = require("iterate-object")
    , typpy = require("typpy")
    ;

/**
 * flattenObject
 * Converts nested objects into flattened ones.
 * For properties with array values, each array element is flattened in turn.
 *
 * @name flattenObject
 * @function
 * @param {Object} obj    The object that should be converted.
 * @param {String} del    The delimiter string (default: ".").
 * @param {Bool}   flnArr Whether or not to flatten arrays (Default: false)
 * @return {Object} Flattened object
 */
module.exports = function flattenObject (obj, del, flnArr) {
    if (typpy(obj, String)) return obj;
    let result = {};
    del = del || ".";
    flnArr = flnArr || false;

    iterateObject(obj, (value, key) => {
        if (typpy(value, Object) || (flnArr && typpy(value, Array) && value.length > 0)) {
            iterateObject(
                flattenObject(value, del, flnArr)
                , (flatValue, xkey) => { result[key + del + xkey] = flatValue; }
            );
        } else if (!flnArr && typpy(value, Array)) {
            result[key] = value.map(item => flattenObject(item, del, flnArr));
        } else {
            result[key] = obj[key];
        }
    });

    return result;
};
