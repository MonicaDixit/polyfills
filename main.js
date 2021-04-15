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

/********************************************************************
 * polyfill for Array.isArray
 */

function myIsArray(arraylist) {
  if (Object.prototype.toString.call(arraylist) === '[Object Array]') {
    return true;
  }
}

function isArray(value) {
	return value.constructor.name === "Array";
}

function isArray(value) {
	return value instanceof Array;
}
/********************************************************************
 * Object deep clone
 */


function deepClone(obj) {
  var newObject = {};
  for (let key in obj) {
    if (typeof key === 'object' && object[key] !== null) {
      newObject[key] = deepClone(object[key]);
    }
    else {
      newObject[key] = object[key]
    }
  }
  
  return newObject;
}

/***********************************************************************************************
* About NaN

console.log(Number.isNaN(NaN));            // true
console.log(Number.isNaN(Math.sqrt(-2)));  // true
 
console.log(Number.isNaN('hello'));        // false
console.log(Number.isNaN(['x']));          // false
console.log(Number.isNaN({}));             // false

NaN === NaN // false


/***********************************************************************************************
*. Object.create and delete operator
/*************************************************************************************************/


Why does delete operator does not work on an Object created with Object.create() method?
	
	Object.create() method is used to create a new object which extends the existing object which you have passed, in your case it's Dog object.


var Dog = {
  name: 'tommy',
  height: '4'
};

var newDog = Object.create(Dog);

delete newDog.name; // It deletes the property in the newDog, but still the Dog property contains the name property so when you console.log(newDog.name) it prints Dog.name property.

console.log(newDog.name)

delete Dog.name;

console.log(newDog.name); // now it's deleted


When you delete the name property in your newDog object, it deletes perfectly, but the inherited name property from the Dog object is still there. so you should delete that too.



/*******************************************************************************************************************
*Object.seal vs object.freeze
*********************************************************************************************************************

Both dont allow addition of new properties
both dont allow deletion of existing properties
the diff is that object.seal allows changing the values of existing properties, whereas object.freeze doesnt allow 
changing the values of existing properties as well

Nothing can be added to or removed from the properties set of a frozen object. Any attempt to do so will fail, either silently or by throwing a TypeError exception (most commonly, but not exclusively, when in strict mode).
Objects sealed with Object.seal() can have their existing properties changed. Existing properties in objects frozen with Object.freeze() are made immutable.

/***********************************************************************************************************************
* Object.defineProperty
/***********************************************************************************************************************

the properties added thru Object.defineProprty are immutable and not enumerable.

/***********************************************************************************************************************
* forEach, for in, map in a sparse arr
/***********************************************************************************************************************


forEach ignores the empty indexes
map takes into account the empty indexes
for in also takes into account the empty indexes

const arr = [1,,,2]

// forEach
arr.forEach(i => console.log(i)) // 1 2


// map
console.log(arr.map(i => i * 2)) // [2, empty x 2, 4]

// for ... of
for (const i of arr) {
  console.log(i) // 1 undefined undefined 2
}


/***********************************************************************************************************************
*throttle
/***********************************************************************************************************************

/**
 * @param {Function} func
 * @param {number} wait
 */
function throttle(func, wait) {
  let waiting = false;
  let lastargs;

  function wrapper() {
    if (!waiting) {
      waiting = true;
      func.apply(this, arguments);
      setTimeout(() => {
        if (lastargs) {
          waiting = false;
          func.apply(this, lastargs);
        }
        
      }, wait)
    }
    else {
      lastargs = [...arguments];
    }
  }

  return wrapper;
    
  }

/***********************************************************************************************************************
*throttle
/***********************************************************************************************************************

/**
 * @param {Function} func
 * @param {number} wait
 */
function debounce(func, wait) {
  let timer = null;

  function wrapper(arguments) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, [...arguments]);
    }, wait)
  }


  return wrapper;
}

/***********************************************************************************************************************
*throttle with leading and trailing options
/***********************************************************************************************************************

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 */
function throttle(func, wait, option = {leading: true, trailing: true}) {

  // if both are false then do no thing
  if(!option.leading && !option.trailing) {
    return () => null;
  }

  let timer = null;
  let lastArgs = null;
  let lastContext = null;

  return function throttled(...args) {

    // firs time `timer` will be null
    // subsequently, it will just store last function's data
    if(timer) {
      lastArgs = args;
      lastContext = this;
      return;
    } else {
      // whenn `timer` is null and if `leading` is true then invoke function.
      // else don't do anything.
      if(option.leading) {
        func.apply(this, args);
      }
    }

    const timeup = () => {
      // if `trailing` is false then it won't run last function ever
      // if you subsequently call function within `wait`
      
      // if `trailing` is true and you call function within `wait` then it will invoke here
      if (option.trailing && lastArgs) {
        func.apply(lastContext, lastArgs);
        lastContext = null;
        lastArgs = null;
        // works only if you have called or stored last function call
        timer = setTimeout(timeup, wait);
      } else {
        timer = null;
      }
    }

    timer = setTimeout(timeup, wait)
  }
}

/***********************************************************************************************************************
*Array flatten
/***********************************************************************************************************************
/**
 * @param { Array } arr
 * @param { number } depth
 */
function flat(arr, depth = 1) {
 
 let result = [];

 arr.forEach(ele => {
   if (Array.isArray(ele) && depth > 0) {
     result = result.concat(flat(ele, depth - 1));
     return result;
   }

   else {
     result.push(ele);
   }
 })

 return result
}

/***********************************************************************************************************************
*Own implementation of extends function
/***********************************************************************************************************************
const myExtends = (SuperType, SubType) => {
    function ExtendedType(...args) {
      SuperType.call(this, ...args);
      SubType.call(this, ...args);
      Object.setPrototypeOf(this, SubType.prototype);
    }
  
    Object.setPrototypeOf(SubType.prototype, SuperType.prototype);
    Object.setPrototypeOf(ExtendedType.prototype, SubType.prototype);
    Object.setPrototypeOf(ExtendedType, SuperType);
  
   return ExtendedType;
}
