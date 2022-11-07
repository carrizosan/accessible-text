# accessible-text

# Introduction
accessible-text replace non-readable words, abbreviations and symbols from your objects for voice readers, based on a dictionary. 
The module exports a function that receives an object, and returns a new object with the same structure and one additional property, by default called "accessibility", which is a copy of the original object with the replacements applied. 
It applies the replacement to all strings values, strings in nested objects, and string values in any array position, recursively.

This allows voice readers like Voice Over get clean data in your frontend applications in an easy and dynamic way, without changing your original data.

# Starting
```shell
$ npm i accessible-text
$ mkdir config
$ vi config/default.json
```

### default.json file
```json
{
	"dictionary": {
		"hs.": "hours",
		" CA ": "Company's name", 
	},
	"propName": "a11y",
	"excludes": ["id", "unique_name"]
}
```
The dictionary property is required, it represents an object with key/value pairs where the key is the value to replace, and value the final value. e.g.:  all "hs." strings will be replaced by "hours".
*Notice that in " CA " you have to use spaces if the abbreviation it's a word itself, avoiding replace words that includes "CA" like "Car".* 
The *propName* property is optional, the default value is "accessibility" and indicates the name of the property to be created. 
The *excludes* property is optional, and indicates the name of the properties that won't be evaluated.

The module already excludes the following string values:
* UUID
* MongoDB Id's
* URI/URL
* Email's

## Output example
```js
const input = {
	id: "ab1050cd",
	title: "Product title",
	description: "CA offers this amazing product",
	price: 99,
	info: {
		terms: "Valid from 01/01 at 00hs. to 31/01 at 23:59hs.",
		countries: ["Argentina", "United States", "Spain"],	
	},
}
```
```js
const expectedOutput = {
	id: "ab1050cd",
	title: "Product title",
	description: "CA offers this amazing product",
	price: 99,
	info: {
		terms: "Valid from 01/01 at 00hs. to 31/01 at 23:59hs.",
		countries: ["Argentina", "United States", "Spain"],	
	},
	a11y: {
		title: "Product title",
		description: "Company's name offers this amazing product",
		price: 99,
		info: {
			terms: "Valid from 01/01 at 00 hours. to 31/01 at 23:59 hours.",
			countries: ["Argentina", "United States", "Spain"],	
		},
	} 
}
```

# Usage
```js
const { applyAccessibility } = require('accessible-text');

const myObject = {
	someValue: "CA offers this amazing product",
};

const myAccessibleObject = applyAccessibility(myObject);

console.log(myAccessibleObject);
/* 
{ 
	someValue: "CA offers this amazing product", 
	a11y: { 
		someValue: "Company's name offers this amazing product" 
	}
}
*/
```