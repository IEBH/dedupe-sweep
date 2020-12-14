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

Stratergy format:

| Path                 | Type     | Description                                                                               |
|----------------------|----------|-------------------------------------------------------------------------------------------|
| `title`              | `string` | The short human-readable title of the strategy                                            |
| `description`        | `string` | A longer, HTML compatible description of the strategy                                     |
| `mutators`           | `object` | An object of the reference properties to mutate prior to processing, each value should be a known mutator |
| `steps`              | `array`  | A collection of steps for the deduplication process                                       |
| `steps[].fields`     | `array`  | An array of strings, each value should correspond to a known reference field              |
| `steps[].comparison` | `string` | The comparison method to use in this step, should correspond to a known comparison method |
