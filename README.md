IEBH/Dedupe-Sweep
=================
Deduplicate reference libraries using the sweep method.

This library is intended to be used with [Reflib](https://github.com/hash-bang/Reflib-Node) compatible references.


```javascript
// Simple example with an array of references
var Dedupe = require('@iebh/dedupe-sweep');

(new Dedupe())
	.set('strategy', 'doiOnly')
	.run([
		{doi: 'https://doi.org/10.1000/182'},
		{doi: '10.1000/182'},
	])
	.then(deduped => { /* ... */ })
```


```javascript
// More complex example reading in a reference library with RefLib, deduping it and saving as another file
var Dedupe = require('@iebh/dedupe-sweep');
var reflib = require('reflib');

// Read in the library
var refs = await reflib.promises.parseFile('my-large-reference-library.xml');

// Dedupe
var deduper = new Dedupe()
deduper.set('strategy', 'clark')
var dedupedRefs = await deduper.run(refs);

// Save the deduped library
await reflib.promises.outputFile('my-large-reference-library-deduped.xml', dedupedRefs);
```


API
===

Constructor: Dedupe(options)
----------------------------
Returns a Dedupe class which extends a basic EventEmitter.


Dedupe.settings
---------------
Object storing all local settings for the class.

| Setting           | Type              | Default    | Description                                                                                                                         |
|-------------------|-------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------|
| stratergy         | string            | `'clark'`  | The stratergy to use on the next `run()` call                                                                                       |
| validateStratergy | boolean           | `true`     | Validate the strategy before beginning, only disable this if you are sure the strategy is valid                                     |
| action            | string            | '`0`'      | The action to take when detecting a duplicate. ENUM: ACTIONS                                                                        |
| actionField       | string            | `'dedupe'` | The field to use with actions                                                                                                       |
| threshold         | number            | `0.1`      | Floating value (between 0 and 1) when marking or deleting refs automatically                                                        |
| markOk            | string / function | `'OK'`     | String value to set the action field to when `actionField=='mark'` and the ref is a non-dupe, if a function it is called as `(ref)` |
| markDupe          | string / function | `'DUPE'`   | String value to set the action field to when `actionField=='mark'` and the ref is a dupe, if a function it is called as `(ref)`     |
| dupeRef           | string            | `0`        | How to refer to other refs when `actionfield=='stats'`. ENUM: DUPEREF                                                               |


Static: Dedupe.ACTIONS
----------------------
Actions to take when detecting duplicates

| Value | Setting    | Description                                                                                                                               |
|-------|------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `0`   | `'STATS'`  | Add the field field in `Dedupe.settings.actionField` with the deduplicate chance to the input                                             |
| `1`   | `'MARK'`   | Set the field in `Dedupe.settings.actionField` to `Dedupe.settings.mark{Ok,Dupe}` depending on duplicate status but leave input unchanged |
| `2`   | `'DELETE'` | Remove duplicates from input and return sliced output                                                                                     |


Static: Dedupe.DUPEREF
----------------------
How to refer to other references.

| Value | Setting       | Description                                                  |
|-------|---------------|--------------------------------------------------------------|
| `0`   | `'INDEX'`     | Refer to other references by their offset in the input array |
| `1`   | `'RECNUMBER'` | Refer to other references by their `recnumber` field         |


Dedupe.comparisons
------------------
A lookup object of comparison functions used within strategies.

Each comparison is made up of:


| Setting       | Type     | Description                                                                                            |
|---------------|----------|--------------------------------------------------------------------------------------------------------|
| key           | string   | Internal short name of the comparison in camelCase                                                     |
| `title`       | string   | Human friendly title of the comparison                                                                 |
| `description` | string   | Longer description of what the comparison does                                                         |
| `handler`     | function | Function, called as `(a, b)` for fields which is expected to return a floating value of duplicate-ness |


Dedupe.mutators
---------------
A lookup object of field mutators used within strategies.

Each mutator is made up of:


| Setting       | Type     | Description                                                                 |
|---------------|----------|-----------------------------------------------------------------------------|
| key           | string   | Internal short name of the mutator in camelCase                             |
| `title`       | string   | Human friendly title of the mutator                                         |
| `description` | string   | Longer description of what the mutator does                                 |
| `handler`     | function | Function, called as `(value)` which is expected to return the mutated input |


Static: Dedupe.strategies
-------------------------
A lookup object of strategies.

Each strategy is made up of:


| Setting         | Type       | Description                                                                   |
|-----------------|------------|-------------------------------------------------------------------------------|
| key             | string     | Internal short name of the strategy in camelCase                              |
| `title`         | string     | Human friendly title of the strategy                                          |
| `description`   | string     | Longer description of the strategy                                            |
| `mutators`      | object     | List of fields which will be mutated and how, prior to the strategy being run |
| `steps`         | array      | Array of steps to take when running the strategy                              |


Dedupe.set(option, value)
-------------------------
Convenience function to quickly set a single option, or merge an object of options.
Returns the original Dedupe instance.


Dedupe.run(input)
-----------------
Takes an array of input references applying the action specified in `Dedupe.settings.action`.
Returns a promise.


Strategies
==========
This module includes a selection of [deduplication strategies](./strategies) which are basic JavaScript objects which detail steps to take to detect reference duplication.

Each strategy should include a `title`, `description`, optional `mutations` and a collection of `steps` to perform.

A simple example of the [DOI only strategy](./strategies/doiOnly.js):

```javascript
module.exports = {
	title: 'DOI only',
	description: 'Compare references against DOI fields only',
	mutations: {
		doi: 'doiRewrite',
	},
	steps: [
		{
			fields: ['doi'],
			comparison: 'exact',
		},
	],
};
```

**Strategy format:**

| Path                 | Type     | Description                                                                               |
|----------------------|----------|-------------------------------------------------------------------------------------------|
| `title`              | `string` | The short human-readable title of the strategy                                            |
| `description`        | `string` | A longer, HTML compatible description of the strategy                                     |
| `mutators`           | `object` | An object of the reference properties to mutate prior to processing, each value should be a known mutator |
| `steps`              | `array`  | A collection of steps for the deduplication process                                       |
| `steps[].fields`     | `array`  | An array of strings, each value should correspond to a known reference field              |
| `steps[].comparison` | `string` | The comparison method to use in this step, should correspond to a known comparison method |
