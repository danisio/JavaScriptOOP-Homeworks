/* Task description */
/*
 Write a function that finds all the prime numbers in a range
 1) it should return the prime numbers in an array
 2) it must throw an Error if any on the range params is not convertible to `Number`
 3) it must throw an Error if any of the range params is missing
 */

function findPrimes(start, end) {
    var result = [],
        sqrtNum,
        isPrime,
        j,
        i;

    if (isNaN(start) || isNaN(end)) {
        throw new Error();
    }

    start = +start;
    end = +end;

    for (i = start; i <= end; i += 1) {
        sqrtNum = Math.sqrt(i);
        isPrime = true;
        for (j = 2; j <= sqrtNum; j += 1) {
            if (!(i % j)) {
                isPrime = false;
                break;
            }
        }

        if (isPrime && i > 1) {
            result.push(i)
        }
    }

    return result;
}
