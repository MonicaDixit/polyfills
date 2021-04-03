//********************************************//
//polyfil for Array map function
/******************************************** */

// remember the resultant array of the map method has the same length as the original array given to it
// for sparse arrays, the callback is only called for an index with value in it
//callback is invoked only for indexes of the array which have assigned values (including undefined ).

Array.prototype.myMap = function (cb, thisArg) {
  // remember to capture the array length in a variable
  // to avoid the infinite loop problem u saw in bfe
  const length = this.length;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    // this step is needed to  check the presence of an element
    // since in a sparse array we might not have any element at a particular index and we dont want to
    // call the callback for those indexes
    if (arr.indexOf(arr[i]) > -1) {
      //   if (i in this) {
      result[i] = cb.call(thisArg, this[i], i, this);
    }
  }

  return result;
};

/**************************************************************************************** */
// Polyfill for array reduce function
/***************************************************************************************** */
// couple of things abt the reduce function
// the arguments to be passed are a callback and an initial value
// initial value is optional
// the callback is called with the following arguments :
//1. accumulator : if an initial value is provided,accumulator becomes that value , if an initialvalue is
// not provided, then the accumulator becomes the first elment of the array
// 2. currentvalue: if an initial value is provided, the current value starts with the value at index 0;
// if an initial value is not provided, then accumulator is the first element of the array and the
// current value is the second value of the array
// if no initial value is provided and the array is empty then throw a type error
// if initial value is provided and empty array, return the initial value

Array.prototype.myReduce = function (callback, initialvalue) {
  if (!initialvalue && !this.length) {
    throw new Error("canot do this");
  }

  let hasInitialValue = arguments.length === 2;
  let accumulator = hasInitialValue ? arguments[1] : this[0];
  let startIdx = hasInitialValue ? 0 : 1;

  for (let i = startIdx; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

/**************************************************************************************** */
// Polyfill for array filter function
// array filter function takes in a callback and an optional param for this
// the callback gets three arguments, curr element, curr index and the entire array
/***************************************************************************************** */
Array.prototype.myFilter = function (cb, context) {
  let arr = this;
  let result = [];

  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let val = cb.call(context, arr[i], i, arr);
    if (val) {
      result.push(val);
    }
  }

  return val;
};

/************************************************************************* */
// polyfill for arr forEach method forEach isnt called for indexes that dont have
// a value. dont have a value is not the same thing as having null or undefined
// for the value
/********************************** */

Array.prototype.myForEach = function (callback, context) {
  let arr = this;
  let len = arr.length;

  for (let i = 0; i < arr.length; i++) {
    // this check is done to make sure we dont run the callback on an index that doest
    //contain a value, in the case of sparse array
    // the index will only be -1 if the array index isnt filled
    if (arr.indexOf(arr[i]) > -1) {
      callback.call(context, arr[i], i, arr);
    }
  }
};

// example
const words = ["adam", "ate", "an", "apple"];
const upperCaseList = [];
words.myForEach((word, index, context) => {
  upperCaseList.push(word.toUpperCase());
});
console.log(upperCaseList);

/**************************************************************************************** */
// Polyfill for bind function
/***************************************************************************************** */

Function.prototype.myBind = function (context, ...args1) {
  let savedcontext = context;
  let fn = this;
  return function (...args2) {
    let concatArgs = [...args1, ...args2];
    return fn.apply(savedcontext, concatArgs);
  };
};

this.x = 9; // this refers to global "window" object here in the browser
var module = {
  x: 81,
  getX: function () {
    return this.x;
  },
};
let res1 = module.getX(); // 81
const retrieveX = module.getX;
let res2 = retrieveX();
// returns 9 - The function gets invoked at the global scope
// Create a new function with 'this' bound to module
// New programmers might confuse the
// global const x with module's property x
const boundGetX = retrieveX.myBind(module);
let res3 = boundGetX();
console.log(res3); // 81

/********************************************************************
 * polyfill for Object.is
 */

function is(a, b) {
  let aisNegZero = isNegZero(a);
  let bisNegZero = isNegZero(b);

  if (aisNegZero || bisNegZero) {
    return aisNegZero && bisNegZero;
  }

  // check for NAN
  if (isNotANum(a) && isNotANum(b)) return true;
  else return a === b;
}

function isNegZero(x) {
  // we are using double equals with x == 0, coz this will make sure its either of the two zeros
  // +0 or -0 and its not actually infinity;
  if (x == 0 && 1 / x === -Infinity) return true;
  return false;
}

function isNotANum(x) {
  // the only value that is not equal to itself is NaN, therefor to check for NaN we can say x !==x
  if (x !== x) return true;
  return false;
}
