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

var datasets = process.env.DATASET
	? process.env.DATASET.split(/\s*,\s*/)
	: [
		`cytology-screening.xml`,
		`haematology.xml`,
		`respiratory.xml`,
		`stroke.xml`,
	];

/**
* Eventual final scores for each stratergy with the key as the stratergy and the value as an array of scores
*/
var scores = {};

strategies.forEach(strategy =>
	describe(`${strategy} strategy`, ()=> {
		datasets.forEach(dataset =>
			it(`${dataset} dataset`, function() {
				this.timeout(1000 * 30); // 30s per dataset

				return Promise.resolve()
					.then(()=> reflib.promises.parseFile(`${__dirname}/data/${dataset}`))
					.then(refs => (new Dedupe())
						.set('validateStratergy', false)
						.set('action', Dedupe.ACTIONS.MARK)
						.set('strategy', strategy)
						.set('actionField', 'result')
						.run(refs)
					)
					.then(refs => {
						var stats = {nonDupeCorrect: 0, nonDupeWrong: 0, dupeCorrect: 0, dupeWrong: 0};
						refs.forEach((ref, index, refs) => {
							/*
							ref.result = ref.result.score > 0.8 ? 'DUPE' : 'OK';
							console.log('FALSE NEGATIVE', {
								ref,
								dupeOf: ref.result.dupeOf.map(i => refs[i]),
							});
							*/

							if (!ref.caption && ref.result == 'OK') {
								stats.nonDupeCorrect++;
							} else if (!ref.caption && ref.result == 'DUPE') {
								stats.nonDupeWrong++;
							} else if (ref.caption == 'Duplicate' && ref.result == 'DUPE') {
								stats.dupeCorrect++;
							} else if (ref.caption == 'Duplicate' && ref.result != 'DUPE') {
								stats.dupeWrong++;
							} else if (ref.result == 'DUPE') { // Lib has ref as nonDupe but we detected dupe
								throw new Error(`Mismatched field comparison: caption=${ref.caption}, result=${ref.result}`);
							}
						});

						mlog.log('Non-Dupe correct (TN)=', chalk.green(stats.nonDupeCorrect));
						mlog.log('Non-Dupe wrong   (FP)=', stats.nonDupeWrong > 0 ? chalk.red(stats.nonDupeWrong) : chalk.green(0));
						mlog.log('Dupe correct     (TP)=', chalk.green(stats.dupeCorrect));
						mlog.log('Dupe wrong       (FN)=', stats.dupeWrong > 0 ? chalk.red(stats.dupeWrong) : chalk.green(0));
						mlog.log(chalk.gray('----------------------------------------'));

						var precision = stats.dupeCorrect / (stats.dupeCorrect + stats.dupeWrong);
						var recall = stats.dupeCorrect / (stats.dupeCorrect + stats.nonDupeWrong) || 1;
						var score = 2 * ((precision * recall) / (precision + recall));
						mlog.log('Precision        =', chalk.yellow(precision));
						mlog.log('Recall           =', chalk.yellow(recall));
						mlog.log('F1 Score         =', chalk.bold.yellow(score));
						mlog.log();

						scores[strategy] = (scores[strategy] ?? []).concat([score]);
					})
			})
		)
	})
);

describe('Summary', ()=> {
	it('Final scores', ()=> {
		Object.keys(scores).forEach(strategy => {
			mlog.log(chalk.white(strategy), '@', chalk.yellow(scores[strategy].reduce((t, v) => t + v, 0) / scores[strategy].length))
		});
	});
});
