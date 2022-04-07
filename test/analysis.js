var _ = require('lodash');
var Dedupe = require('..');
var chalk = require('chalk');
var expect = require('chai').expect;
var mlog = require('mocha-logger');
var reflib = require('reflib');


/**
* Compute a side-by-side analysis of internal strategies using a known data set
*
* @param {string} [process.env.STRATEGY] CSV of strategies to use, if omitted all internal ones are used
* @param {string} [process.env.DATASET] CSV of data sets to use, must match file basename in test/data
*/
var strategies = process.env.STRATEGY
	? process.env.STRATEGY.split(/\s*,\s*/)
	: Object.keys(Dedupe.strategies);

strategies = ['forbes', 'forbesMinFN', 'forbesMinFP'];

var datasets = process.env.DATASET
	? process.env.DATASET.split(/\s*,\s*/)
	: [
		// `old/cytology-screening.xml`,
		// `old/haematology.xml`,
		// `old/respiratory.xml`,
		// `old/stroke.xml`,
		// The below blue light library is verified as an accurate dataset by JC and CF
		`blue-light.xml`,
		// The below libraries are verified as accurate by JC and HG
		'copper.xml',
		'diabetes.xml',
		'tafenoquine.xml',
		'uti.xml',
	];

/**
* Eventual final scores for each stratergy with the key as the stratergy and the value as an array of scores
*/
var accuracies = {};
var precisions = {};
var recalls = {};
var scores = {};

/** Threshold for dupe */
const threshold = 0.01

strategies.forEach(strategy =>
	describe(`${strategy} strategy`, ()=> {
		datasets.forEach(dataset =>
			it(`${dataset} dataset`, function() {
				this.timeout(1000 * 30); // 30s per dataset

				return Promise.resolve()
					.then(()=> reflib.promises.parseFile(`${__dirname}/data/${dataset}`))
					.then(refs => (new Dedupe())
						.set('validateStratergy', false)
						.set('action', Dedupe.ACTIONS.STATS)
						.set('strategy', strategy)
						.set('actionField', 'result')
						.set('fieldWeight', Dedupe.FIELDWEIGHT.MINUMUM)
						.set('threshold', threshold)
						.set('markOriginal', true)
						.run(refs)
					)
					.then(refs => {
						var stats = {nonDupeCorrect: 0, nonDupeWrong: 0, dupeCorrect: 0, dupeWrong: 0};
						refs.forEach((ref, index, refs) => {
							// Log false negative {{{
							// ref.result = ref.result.score > 0.8 ? 'DUPE' : 'OK';
							// console.log('FALSE NEGATIVE', {
							// 	ref,
							// 	dupeOf: ref.result.dupeOf.map(i => refs[i]),
							// });
							// }}}

							if (ref.caption == 'Duplicate' && ref.result.score > threshold) {
								stats.dupeCorrect++;
							} else if (!ref.caption && ref.result.score > threshold) {
								// Print false positive dupe along with its dupeOf
								var dupeOf = null;
								if (ref.result.dupeOf && ref.result.dupeOf[0]) {
									dupeOf = refs[ref.result.dupeOf[0]]
								}
								else {
									dupeOf = refs.find(reference => reference.result.dupeOf && (reference.result.dupeOf[0] == index));
								}
								// Log False Positive {{{
								// console.log("False positive")
								// console.log("Ref:", ref.title);
								// console.log(ref);
								// if (dupeOf) {
								// 	console.log("Dupe:", dupeOf.title);
								// 	console.log(dupeOf);
								// }
								// console.log("\n");
								// }}}
								stats.nonDupeWrong++;
							} else if (!ref.caption && ref.result.score < threshold) {
								stats.nonDupeCorrect++;
							} else if (ref.caption == 'Duplicate' && ref.result.score < threshold) {
								stats.dupeWrong++;
							} else if (ref.result == 'DUPE') { // Lib has ref as nonDupe but we detected dupe
								throw new Error(`Mismatched field comparison: caption=${ref.caption}, result=${ref.result}`);
							}
						});

						mlog.log('Dupe correct     (TP)=', chalk.green(stats.dupeCorrect));
						mlog.log('Non-Dupe wrong   (FP)=', stats.nonDupeWrong > 0 ? chalk.red(stats.nonDupeWrong) : chalk.green(0));
						mlog.log('Non-Dupe correct (TN)=', chalk.green(stats.nonDupeCorrect));
						mlog.log('Dupe wrong       (FN)=', stats.dupeWrong > 0 ? chalk.red(stats.dupeWrong) : chalk.green(0));
						mlog.log(chalk.gray('----------------------------------------'));

						var accuracy = (stats.dupeCorrect + stats.nonDupeCorrect) / (stats.dupeCorrect + stats.nonDupeCorrect + stats.dupeWrong + stats.nonDupeWrong) || 0;
						var precision = stats.dupeCorrect / (stats.dupeCorrect + stats.nonDupeWrong) || 0;
						var recall = stats.dupeCorrect / (stats.dupeCorrect + stats.dupeWrong) || 0;
						var score = 2 * ((precision * recall) / (precision + recall)) || 0;
						mlog.log('Accuracy        =', chalk.yellow(accuracy));
						mlog.log('Precision        =', chalk.yellow(precision));
						mlog.log('Recall           =', chalk.yellow(recall));
						mlog.log('F1 Score         =', chalk.bold.yellow(score));
						mlog.log();

						accuracies[strategy] = (accuracies[strategy] ?? []).concat([accuracy]);
						precisions[strategy] = (precisions[strategy] ?? []).concat([precision]);
						recalls[strategy] = (recalls[strategy] ?? []).concat([recall]);
						scores[strategy] = (scores[strategy] ?? []).concat([score]);
					})
			})
		)
	})
);

describe('Summary', ()=> {
	it('Final scores', ()=> {
		Object.keys(scores).forEach(strategy => {
			mlog.log(chalk.white(strategy), '@accuracy', chalk.blue(accuracies[strategy].reduce((t, v) => t + v, 0) / accuracies[strategy].length))
			mlog.log(chalk.white(strategy), '@precision', chalk.blue(precisions[strategy].reduce((t, v) => t + v, 0) / precisions[strategy].length))
			mlog.log(chalk.white(strategy), '@recall', chalk.blue(recalls[strategy].reduce((t, v) => t + v, 0) / recalls[strategy].length))
			mlog.log(chalk.white(strategy), '@f1', chalk.yellow(scores[strategy].reduce((t, v) => t + v, 0) / scores[strategy].length))
			mlog.log("\n")
		});
	});
});
