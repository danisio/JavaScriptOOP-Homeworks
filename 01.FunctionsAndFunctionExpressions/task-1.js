/* Task Description */
/*
 Write a function that sums an array of numbers:
 numbers must be always of type Number
 returns `null` if the array is empty
 throws Error if the parameter is not passed (undefined)
 throws if any of the elements is not convertible to Number
 */

function sum(arr) {
    var i,
        len,
        result;

    if (!arr) {
        throw new Error();
    }

    if (!arr.length) {
        return null;
    }

    for (i = 0, len = arr.length; i < len; i += 1) {
        if (isNaN(arr[i])) {
            throw new Error();
        }
    }

    result = arr.map(Number).reduce(function (sum, item) {
        return sum + item;
    }, 0);

    return result;
}