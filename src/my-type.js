/*
      The resulting api surface area from this is

      baseTypes: [
        "boolean"
        "number"
        "string"
        "object"
        "date"
        "function"
        "null"
        "undefined"
        "nullOrUndef"
      }

      isType:{
        boolean: v => typeCheck(t, v)
        custom: v => !!!getType(v)
        date: v => whoMadeMe(v) === 'date' && typeof v === 'object'
        falsey: v => !v
        function: v => typeCheck(t, v)
        null: v => typeCheck(t, v)
        nullOrUndef: v => typeCheck(t, v)
        number: v => typeCheck(t, v)
        object: v => typeCheck(t, v)
        primitive: v => {…}
        string: v => typeCheck(t, v)
        truthy: v => !!v
        undefined: v => typeCheck(t, v)
      }
      all functions return boolean

      typeCheck(type,value) returns boolean response

      valueTests = you can add your own values in the embedded test module for experimentation

      This is a work in progress...
      */
const whoMadeMe = v => {
  try {
    return v !== null && v !== undefined && (v).constructor && (v).constructor.name.toLowerCase();
  } catch (ex) {
    console.warn({noonemadeyou: v});
    return 'undefinable';
  }
};
const typeCheck = (t, v) => // brace yourself for the punchline
  v === null ?
    t === 'null' || t === 'nullOrUndef' :
    v === undefined ?
      t === 'undefined' || t === 'nullOrUndef' :
      typeof v === t && whoMadeMe(v) === t; // look mom, no braces!

const baseTypes = ['boolean', 'number', 'string', 'array', 'object', 'date', 'function', 'null', 'undefined', 'nullOrUndef'];

export const isType = {
  boolean: v => typeCheck('boolean', v),
  bool: v => typeCheck('boolean', v),
  number: v => typeCheck('number', v),
  string: v => typeCheck('string', v),
  array: v => Array.isArray(v),
  object: v => typeCheck('object', v),
  date: v => whoMadeMe(v) === 'date' && typeof v === 'object',
  'function': v => typeCheck('function', v),
  'null': v => typeCheck('null', v),
  'undefined': v => typeCheck('undefined', v),
  'nullOrUndef': v => typeCheck('nullOrUndef', v),
  primitive: v => baseTypes.slice(0, 3).includes(typeof v),
  custom: v => !getType(v),
  snum: v => v !== null && v !== undefined && v !== '' && !isNaN(Number(v))
};
export const getType = v => baseTypes.find(t => isType[t](v));

const valueTests = function () {
  // easy embedded tests!
  // no test framework needed
  class foo {
    constructor() {
    }
  }

  const noop = () => null;
  const testObj = {a: 1, b: 2};
  const testValues = {
    boolean: [true, false],
    number: [3.14, Math.PI, Infinity, NaN],
    string: ['bar', 'pretzel'],
    array:[[1, 2, 3], Object.entries(testObj)],
    function: [function () {
    }, noop],
    object: [{}, {bar: 'baz'}],
    date: [new Date()],
    'null': [null, noop()],
    'undefined': [undefined, testObj.c],
    nullOrUndef: [undefined, null, testObj.c],
    primitive: ['abc', 123, true, false],
    custom: [new foo()],
    truthy: [1, 2, 'abc', -1],
    falsey: [0, '', null, undefined, false],
    snum:['1', 1, 'Infinity', Math.PI.toFixed(9)]
  };
  const allTypes = Object.keys(testValues);

  const typeTest = (v, targetType) => {
    try {
      let result = {
        testValue: v,
        passed: isType[targetType](v),
        isAlso: allTypes.filter(t => t !== targetType && isType[t](v))
      };

      if (!result.passed) {
        console.warn({
          testValue: v,
          typeof: typeof v,
          targetType,
          constructor: whoMadeMe(v)
        });
      }
      return result;
    } catch (ex) {
      console.error({v, targetType, ex});
    }
  };

  const results = Object.fromEntries(allTypes.map(t => [t, {}]));
  allTypes.forEach(t => {
    results[t] = testValues[t].map(testVal => typeTest(testVal, t));
  });

  console.log({results});
};



