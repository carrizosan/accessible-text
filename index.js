process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

const { isArray, isString, isEmpty, isObject } = require('lodash');
const validator = require('validator');
const config = require('config');
const path = require('path');

const defaultConfig = {
  dictionary: {
    "$": "pesos",
    "%": "porciento",
    "hs": "horas",
    "2x1": "dos por uno",
    "asd": "asda"
  },
  propName: "accessibility",
  excludes: ["sarasa"]
}

const ourConfigDir = path.join(__dirname, 'config')
const baseConfig = config.util.loadFileConfigs(ourConfigDir)

config.util.extendDeep(defaultConfig, baseConfig);
config.util.setModuleDefaults('accessibility', defaultConfig);

const dictionary = config.get('accessibility.dictionary');
const excludes = config.get('accessibility.excludes');
const accessiblePropName = config.get('accessibility.propName');

console.log(defaultConfig)

function applyAccessibility(objToApply) {
  const object = JSON.parse(JSON.stringify(objToApply)); // Deep copy of the param
  object[accessiblePropName] = {};
  Object.entries(object).forEach((entry) => {
    const [key, value] = entry;
    if (key !== accessiblePropName && !excludes.includes(key)) {
      object.accessibility[key] = evaluateValue(value);
    }
  });
  return object;
}

function evaluateValue(value) {
  let newValue;
  if (value && !isEmpty(value)) {
    if (isNaN(value)) {
      if (isArray(value)) {
        newValue = evaluateArray(value);
      } else if (isString(value)) {
        newValue = evaluateString(value);
      } else if (isObject(value)) {
        newValue = evaluateObject(value);
      }
    } else {
      return value;
    }
  } else {
    return value;
  }
  return newValue;
}

function evaluateString(stringValue) {
  if (isTranslatable(stringValue)) {
    let words = stringValue.split(' ');
    words = words.map((word) => translateString(word));
    words = words.join(' ');
    return words.replace(/\s+/g, ' ').trim(); // Remove duplicate whitespaces
  } else {
    return stringValue;
  }
}

function evaluateArray(array) {
  const newValue = [];
  array.forEach((element) => {
    const data = evaluateValue(element);
    newValue.push(data);
  });
  return newValue;
}

function evaluateObject(object) {
  const newObject = { ...object };
  Object.entries(object).forEach((entry) => {
    const [key, value] = entry;
    newObject[key] = evaluateValue(value);
  });
  return newObject;
}

function translateString(value) {
  Object.keys(dictionary).forEach((key) => {
    if (value.includes(key)) {
      value = value.replace(key, ` ${dictionary[key]} `);
    }
  });
  return value;
}

function isTranslatable(stringValue) {
  return !(
    validator.isEmpty(stringValue) ||
    validator.isEmail(stringValue) ||
    validator.isURL(stringValue) ||
    validator.isUUID(stringValue) ||
    validator.isMongoId(stringValue)
  );
}

module.exports = { applyAccessibility, defaultConfig };
