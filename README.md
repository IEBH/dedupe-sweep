IEBH/Dedupe-Sweep
=================
Deduplicate reference libraries using the sweep method.


Strategies
==========
This module includes a selection of [deduplication strategies](./strategies) which are basic JavaScript objects which expose a list of steps to take to detect duplication.

Each strategy should include a `title`, `description`, optional `mutations` and a collection of `steps` to perform.

A simple example would be the [DOI only strategy](./strategies/doiOnly.js):

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

| Path                 | Type     | Description                                                                               |
|----------------------|----------|-------------------------------------------------------------------------------------------|
| `title`              | `string` | The short human-readable title of the strategy                                            |
| `description`        | `string` | A longer, HTML compatible description of the strategy                                     |
| `mutators`           | `object` | An object of the reference properties to mutate prior to processing, each value should be a known mutator |
| `steps`              | `array`  | A collection of steps for the deduplication process                                       |
| `steps[].fields`     | `array`  | An array of strings, each value should correspond to a known reference field              |
| `steps[].comparison` | `string` | The comparison method to use in this step, should correspond to a known comparison method |


TODO
====

* [x] Basic module implementation
* [x] Basic mutators
* [x] TESTKIT: Mutators
* [x] Basic comparitors
* [x] TESTKIT: comparitors
* [ ] TESTKIT: Exact DOI comparison + detection
* [ ] TESTKIT: Tripple+ duplicate matching
* [ ] TESTKIT: Library input via RefLib
* [ ] Configurable output: full library or filtering by probability
* [ ] Update README with usage example
