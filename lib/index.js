"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); _groups.set(_this, groups || _groups.get(re)); return _setPrototypeOf(_this, BabelRegExp.prototype); } _inherits(BabelRegExp, RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; if (_typeof(args[args.length - 1]) !== "object") { args = [].slice.call(args); args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var EventEmitter = require('events').EventEmitter;

var natural = require('natural');
/**
* Dedupe class
*/


module.exports = (_temp = _class = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Dedupe, _EventEmitter);

  var _super = _createSuper(Dedupe);

  /**
  * Instance settings
  * Can be set using the utility funciton `set(key, val)`
  * @type {Object} The settings to use in this Dedupe instance
  * @property {string} stratergy The stratergy to use on the next `run()` call
  * @property {boolean} validateStratergy Validate the strategy before beginning, only disable this if you are sure the strategy is valid
  * @property {string} action The action to take when detecting a duplicate. ENUM: ACTIONS
  * @property {string} actionField The field to use with actions
  * @property {number} threshold Floating value (between 0 and 1) when marking or deleting refs automatically
  * @property {string|function} markOk String value to set the action field to when `actionField=='mark'` and the ref is a non-dupe, if a function it is called as `(ref)`
  * @property {string|function} markDupe String value to set the action field to when `actionField=='mark'` and the ref is a dupe, if a function it is called as `(ref)`
  * @property {string} dupeRef How to refer to other refs when `actionfield=='stats'`. ENUM: DUPEREF
  */

  /**
  * Available actions for duplicates
  */

  /**
  * Available methods to set the `dupeRef` - which appears as `dupeOf` when `actionfield=='stats'`
  */

  /**
   * Avaliable field weighting systems to use
   */
  // Comparisons {{{

  /**
  * Lookup for all supported comparison methods
  * @type {Object<Object>} Lookup object of comparison methods
  * @property {string} title The short human-readable title of the comparison
  * @property {string} description A longer HTML compatible description of the comparison
  * @property {function} handler A function, called as `(a, b)` which is expected to return a floating value of the input similarity
  */
  // }}}
  // Mutators {{{

  /**
  * Lookup for all supported mutator methods
  * @type {Object<Object>} Lookup object of mutator methods
  * @property {string} title The short human-readable title of the mutator
  * @property {string} description A longer HTML compatible description of the mutator
  * @property {function} handler A function, called as `(v)` which is expected to return a mutated version of the input
  */
  // }}}
  // Strategies {{{
  // }}}

  /**
  * Class constructor
  * @param {Object} [options] Initial options to populate
  */
  function Dedupe(options) {
    var _this;

    _classCallCheck(this, Dedupe);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "settings", {
      strategy: 'clark',
      validateStratergy: true,
      action: 0,
      actionField: 'dedupe',
      threshold: 0.1,
      markOk: 'OK',
      markDupe: 'DUPE',
      dupeRef: 0,
      fieldWeight: 0,
      isTesting: false
    });

    _defineProperty(_assertThisInitialized(_this), "comparisons", {
      exact: {
        title: 'Exact comparison',
        description: 'Simple character-by-character exact comaprison',
        handler: function handler(a, b) {
          return a == b ? 1 : 0;
        }
      },
      exactTruncate: {
        title: 'Exact comparison with truncate',
        description: 'Exact comparison but truncate strings to the shortest',
        handler: function handler(a, b) {
          return a.substr(0, Math.min(a.length, b.length)) == b.substr(0, Math.min(a.length, b.length)) ? 1 : 0;
        }
      },
      jaroWinkler: {
        title: 'Jaro-Winkler',
        description: 'String distance / difference calculator using the [Jaro-Winkler metric](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)',
        handler: function handler(a, b) {
          return natural.JaroWinklerDistance(a, b);
        }
      },
      random: {
        title: 'Random',
        description: 'Ignore comparisons and pick a number between 0 and 1',
        handler: function handler(a, b) {
          return _.random(0, 1, true);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "mutators", {
      alphaNumericOnly: {
        title: 'Alpha-Numeric only',
        description: 'Remove all punctuation except characters and numbers',
        handler: function handler(v) {
          return v.replace(/[^0-9A-Za-z\s]+/g, ' ');
        }
      },
      noSpace: {
        title: 'Remove whitespace',
        description: 'Remove all whitespace e.g " "',
        handler: function handler(v) {
          return v.replace(/[\s]+/g, '');
        }
      },
      authorRewrite: {
        title: 'Rewrite author names',
        description: 'Clean up various author specifications into one standard format',
        handler: function handler(v) {
          if (/;/.test(v)) {
            // Detect semi colon seperators to search `Last, F. M.` format
            return _.chain(v).split(/\s*;\s*/).dropRightWhile(function (name) {
              return /^et\.?\s*al/i.test(name);
            }) // Looks like "Et. Al" from end
            .map(function (name) {
              var format = /*#__PURE__*/_wrapRegExp(/^([A-Z][a-z]+),?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([A-Z])/, {
                last: 1,
                first: 2
              }).exec(name);

              return format ? format.groups.first.substr(0, 1).toUpperCase() + '. ' + _.upperFirst(format.groups.last) : name;
            }).join(', ').value();
          } else {
            return _.chain(v).split(/\s*,\s*/) // Split into names
            .dropRightWhile(function (name) {
              return /^et\.?\s*al/i.test(name);
            }) // Looks like "Et. Al" from end
            .map(function (name) {
              // Reparse all names
              var format = [/*#__PURE__*/_wrapRegExp(/^([A-Z][a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([A-Z][a-z]+)$/, {
                first: 1,
                last: 2
              }),
              /*#__PURE__*/
              //~= First Last
              _wrapRegExp(/^([A-Z])\.?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([A-Z][a-z]+)$/, {
                first: 1,
                middle: 2,
                last: 3
              }),
              /*#__PURE__*/
              //~= F. Last
              _wrapRegExp(/^([A-Z][a-z]+?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([A-Z][a-z]+)$/, {
                first: 1,
                middle: 2,
                last: 3
              }),
              /*#__PURE__*/
              //~= First Middle Last
              _wrapRegExp(/^([A-Z][a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([A-Z]\.?)/, {
                last: 1,
                middle: 2,
                first: 3
              }) //~= Last F.
              ].reduce(function (matchingFormat, re) {
                return matchingFormat // Already found a match
                || re.exec(name);
              } // Attempt to match this element
              , false);
              return format ? format.groups.first.substr(0, 1).toUpperCase() + '. ' + _.upperFirst(format.groups.last) : name;
            }).join(', ') // Join as comma-delimetered strings
            .value();
          }
        }
      },
      authorRewriteSingle: {
        title: 'Rewrite singular author name',
        description: 'Clean up various author specifications into one standard format',
        handler: function handler(v) {
          var name = v;
          var format = [/*#__PURE__*/_wrapRegExp(/^([\t-\r A-Za-z\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+),+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([A-Z])/, {
            last: 1,
            first: 2
          }),
          /*#__PURE__*/
          // Last, F. M.
          _wrapRegExp(/^([A-Z][a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([A-Z][a-z]+)$/, {
            first: 1,
            last: 2
          }),
          /*#__PURE__*/
          //~= First Last
          _wrapRegExp(/^([A-Z])\.?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([A-Z][a-z]+)$/, {
            first: 1,
            middle: 2,
            last: 3
          }),
          /*#__PURE__*/
          //~= F. Last
          _wrapRegExp(/^([A-Z][a-z]+?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([A-Z][a-z]+)$/, {
            first: 1,
            middle: 2,
            last: 3
          }),
          /*#__PURE__*/
          //~= First Middle Last
          _wrapRegExp(/^([A-Z][a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(.*?)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([A-Z]\.?)/, {
            last: 1,
            middle: 2,
            first: 3
          }) //~= Last F.
          ].reduce(function (matchingFormat, re) {
            return matchingFormat // Already found a match
            || re.exec(name);
          } // Attempt to match this element
          , false);
          return format ? format.groups.first.substr(0, 1).toUpperCase() + '. ' + _.upperFirst(format.groups.last) : name;
        }
      },
      deburr: {
        title: 'Deburr',
        description: 'Convert all <a href="https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table">latin-1 supplementary letters</a> to basic latin letters and also remove <a href="https://en.wikipedia.org/wiki/Combining_Diacritical_Marks">combining diacritical marks</a>. e.g. <code>ÕÑÎÔÑ</code> becomes <code>ONION</code>',
        handler: function handler(v) {
          return _.deburr(v);
        }
      },
      noCase: {
        title: 'Case insenstive',
        description: 'Convert all upper-case alpha characters to lower case',
        handler: function handler(v) {
          return v.toLowerCase();
        }
      },
      doiRewrite: {
        title: 'Rewrite DOIs',
        description: 'Attempt to tidy up mangled DOI fields from partial DOIs to full URLs',
        handler: function handler(v, ref) {
          if (v) {
            return /^https:\/\//.test(v) ? v // Already ok
            : /^http:\/\//.test(v) ? v.replace(/^http:/, 'https:') // using HTTP instead of HTTPS
            : 'https://doi.org/' + v;
          } else {
            var _ref$urls;

            // Look in ref.urls to try and find a misfiled DOI
            var foundDoi = ((_ref$urls = ref.urls) !== null && _ref$urls !== void 0 ? _ref$urls : []).find(function (u) {
              return /^https?:\/\/doi.org\//.test(u);
            }); // Find first DOI looking URL

            if (foundDoi) return foundDoi.replace(/^http:/, 'https:');
            return ''; // Give up and return an empty string
          }
        }
      },
      numericOnly: {
        title: 'Numeric only',
        description: 'Remove all non-numeric characters',
        handler: function handler(v) {
          return v.replace(/[^0-9]+/g, '');
        }
      },
      removeEnclosingBrackets: {
        title: 'Remove enclosing brackets',
        description: 'Remove all wrapping brackets or other parenthesis, useful for translated titles',
        handler: function handler(v) {
          return _.trim(v, '()[]{}');
        }
      },
      stripHtmlTags: {
        title: 'Remove html/xml tags from title',
        description: 'Remove html tag',
        handler: function handler(v) {
          return v.replace(/(<([^>]+)>)/ig, "");
        }
      },
      consistentPageNumbering: {
        title: 'Mutate PubMed page numbering into consistent format',
        description: 'E.g. 244-58 => 244-258',
        handler: function handler(v) {
          var _$exec;

          // Find page numbers
          var pages = (_$exec = /*#__PURE__*/_wrapRegExp(/^([0-9]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:[\x2D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D]|\uD803\uDEAD)+([0-9]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?$/, {
            from: 1,
            to: 3
          }).exec(v)) === null || _$exec === void 0 ? void 0 : _$exec.groups;

          if (pages && pages.from && pages.to) {
            // Find the difference in length of the page number strings
            var offset = pages.from.length - pages.to.length; // Take the prefix that is missing from the 2nd page number

            var prefix = pages.from.substring(0, offset); // Prepend the prefix to the page number

            return "".concat(pages.from, "-").concat(prefix + pages.to);
          } else if (pages && pages.from) {
            return pages.from;
          } else {
            return "";
          }
        }
      }
    });

    _this.settings.action = Dedupe.ACTIONS.STATS;
    _this.settings.dedupeRef = Dedupe.DUPEREF.INDEX;

    _this.set(options);

    return _this;
  }
  /**
  * Set class options either via an object merge or key val setter
  * @param {Object|string} option Either a full object to merge or the key of the setting to set
  * @param {*} [value] If `option` is a string, specify the new value
  * @returns {Dedupe} This chainable instance
  */


  _createClass(Dedupe, [{
    key: "set",
    value: function set(option, value) {
      if (_.isPlainObject(option)) {
        Object.assign(this.settings, option);
      } else {
        this.settings[option] = value;
      }

      return this;
    }
    /**
    * Validate a strategy object
    * @param {object} stratergy The stratergy object to validate
    * @returns {boolean|array} Either a boolean True if the stratergy is valid or an array of errors
    */

  }, {
    key: "validateStratergy",
    value: function validateStratergy(stratergy) {
      var errs = [];
      ['title', 'description', 'mutators', 'steps'].forEach(function (f) {
        if (!stratergy[f]) errs.push("Field ".concat(f, " is missing"));
      });
      if (!stratergy.steps.length) errs.push('Should contain at least one step');
      if (stratergy.steps) stratergy.steps.forEach(function (step, stepIndex) {
        if (!step.fields || !step.fields.length) errs.push("Step #".concat(stepIndex + 1, " contains no fields"));
        if (!step.sort) errs.push("Step #".concat(stepIndex + 1, " contains no sort field(s)"));
        if (_.isArray(step.sort) && !step.sort.length) errs.push("Step #".concat(stepIndex + 1, " contains a blank sort field list"));
        if (!step.comparison) errs.push("Step #".concat(stepIndex + 1, " contains no comparison"));
      });
      return errs.length > 0 ? errs : true;
    }
  }, {
    key: "compareViaStepAvg",
    value:
    /**
    * Compare two references at against rules specified in a step
    * @param {Object} a The first reference to compare
    * @param {Object} b The second reference to compare
    * @param {Object} step The step object, specifying the rules for comparison
    * @returns {number} A floating value representing the average similarity between the two references for this steps rules
    */
    function compareViaStepAvg(a, b, step) {
      var _this2 = this;

      return step.fields.reduce(function (result, field) {
        var _step$skipOmitted;

        return ((_step$skipOmitted = step.skipOmitted) !== null && _step$skipOmitted !== void 0 ? _step$skipOmitted : true) && (!a[field] || !b[field]) ? 0 : _this2.comparisons[step.comparison].handler(a[field], b[field]);
      }, 0) / step.fields.length;
    }
  }, {
    key: "compareViaStepMin",
    value:
    /**
    * Compare two references at against rules specified in a step
    * @param {Object} a The first reference to compare
    * @param {Object} b The second reference to compare
    * @param {Object} step The step object, specifying the rules for comparison
    * @returns {number} A floating value representing the minumum similarity between the two references for this steps rules
    */
    function compareViaStepMin(a, b, step) {
      var _this3 = this;

      var minumum = 1;
      step.fields.forEach(function (field) {
        var _step$skipOmitted2;

        var score = ((_step$skipOmitted2 = step.skipOmitted) !== null && _step$skipOmitted2 !== void 0 ? _step$skipOmitted2 : true) && (!a[field] || !b[field]) ? 0 : _this3.comparisons[step.comparison].handler(a[field], b[field]);
        if (score < minumum) minumum = score;
      });
      return minumum;
    }
    /**
    * Run the deduplication process
    * @param {array|string} input Either an existing parsed collection of references or a path to parse
    * @returns {Promise<array>} The output collection with an additional field `dedupe` which is a floating value between 0 - 1
    *
    * @emits runMutated Emitted when the fully mutated library is ready to start deduplicating
    */

  }, {
    key: "run",
    value: function run(input) {
      var _this4 = this;

      var stratergy = Dedupe.strategies[this.settings.strategy];
      var output;
      return Promise.resolve().then(function () {
        if (!Object.values(Dedupe.ACTIONS).includes(_this4.settings.action)) throw new Error("Invalid action \"".concat(_this4.settings.action, "\" - choose one action from Dedupe.ACTIONS"));
        if (!Object.values(Dedupe.DUPEREF).includes(_this4.settings.dupeRef)) throw new Error("Invalid dupeRef \"".concat(_this4.settings.dupeRef, "\" - choose one action from Dedupe.DUPEREF")); // Parse inputs if they look like paths, otherwise assume they are given as arrays

        return _.isString(input) ? reflib.promises.parseFile(input) : input;
      }) // Sanity checks {{{
      .then(function (refs) {
        if (!_.isArray(refs)) throw new Error('Input is not an array');
        if (!_.has(Dedupe, ['strategies', _this4.settings.strategy])) throw new Error('Unknown stratergy specified');
        if (!_.isArray(_.get(Dedupe, ['strategies', _this4.settings.strategy, 'steps']))) throw new Error('Invalid stratergy schema');
        return output = refs;
      }) // }}}
      // Validate stratergy {{{
      .then(function () {
        if (!_this4.settings.validateStratergy) return; // Checking disabled

        var sErrs = _this4.validateStratergy(stratergy);

        if (sErrs === true) return;
        throw new Error('Invalid stratergy - ' + sErrs.join(', '));
      }) // }}}
      .then(function () {
        var refs = output;
        return refs.map(function (original, index) {
          return _objectSpread(_objectSpread({
            original: original,
            index: index,
            recNumber: original.refNumber || index + 1,
            dedupe: {
              steps: []
            }
          }, original), _.mapValues(stratergy.mutators, function (mutators, field) {
            return _.castArray(mutators).reduce(function (value, mutator) {
              return _this4.mutators[mutator].handler(value, original);
            }, original[field] || '');
          }));
        });
      }).then(function (refs) {
        _this4.emit('runMutated', refs);

        var sortedBy; // Keep track of our sort so we don't repeat this

        var sortedRefs; // Current state of refs

        stratergy.steps.forEach(function (step, stepIndex) {
          // For each step
          if (!sortedBy || sortedBy != step.sort) {
            // Sort if needed
            sortedRefs = _.sortBy(refs, step.sort); // Sort by the designated fields

            sortedBy = step.sort;
          }

          var i = 0;
          var n = i + 1;

          while (n < sortedRefs.length) {
            // Walk all elements of the array...
            var dupeScore = _this4.settings.fieldWeight == Dedupe.FIELDWEIGHT.MINUMUM ? _this4.compareViaStepMin(sortedRefs[i], sortedRefs[n], step) : _this4.compareViaStepAvg(sortedRefs[i], sortedRefs[n], step);

            if (dupeScore > 0) {
              // Hit a duplicate, `i` is now the index of the last unique ref
              // If score does not currently exist for record (i.e. original record) assign it a score of 0 (unless testing)
              if (!sortedRefs[i].dedupe.steps[stepIndex]) {
                sortedRefs[i].dedupe.steps[stepIndex] = {
                  score: _this4.settings.isTesting ? dupeScore : 0
                }; // Mark as duplicate if in testing mode
              } // Mark 2nd record as duplicate and link to original


              sortedRefs[n].dedupe.steps[stepIndex] = {
                score: dupeScore,
                dupeOf: _this4.settings.dupeRef == Dedupe.DUPEREF.RECNUMBER ? sortedRefs[i].recNumber : sortedRefs[i].index
              };
              n++; // Increment n by one to compare next record with original to check for multiple dupes

              if (n >= sortedRefs.length) {
                // If at last record increment i for consistent behaviour
                i++;
                n = i + 1;
              }
            } else {
              if (sortedRefs[i][step.sort] === sortedRefs[n][step.sort]) {
                // If still the same value for sorted value
                n++; // Increment n by one to compare next record with original to check for multiple dupes

                if (n >= sortedRefs.length) {
                  // If at last record increment i for consistent behaviour
                  i++;
                  n = i + 1;
                }
              } else {
                // The below may work better if some records are missing data but at the expense of time
                i++;
                n = i + 1; // i = n; // Set the new pointer to be the non-matching reference
                // n += 1; // Increment n to point to next reference
              }
            }
          }
        });
        return refs;
      }).then(function (refs) {
        return refs.map(function (ref) {
          return _objectSpread(_objectSpread({}, ref), {}, {
            dedupe: _objectSpread(_objectSpread({}, ref.dedupe), {}, {
              score: ref.dedupe.steps.length > 0 ? _.sum(ref.dedupe.steps.map(function (s) {
                return s.score;
              })) / ref.dedupe.steps.length : 0
            })
          });
        });
      }).then(function (refs) {
        switch (_this4.settings.action) {
          case Dedupe.ACTIONS.STATS:
            // Decorate refs with stats
            return output.map(function (ref, refIndex) {
              return _objectSpread(_objectSpread({}, ref), {}, _defineProperty({}, _this4.settings.actionField, {
                score: refs[refIndex].dedupe.score,
                dupeOf: _(refs[refIndex].dedupe.steps).map('dupeOf').uniq().filter(function (v) {
                  return v !== undefined;
                }).value()
              }));
            });

          case Dedupe.ACTIONS.MARK:
            // Set a simple field if the ref score is above the threshold
            return output.map(function (ref, refIndex) {
              return _objectSpread(_objectSpread({}, ref), {}, _defineProperty({}, _this4.settings.actionField, refs[refIndex].dedupe.score >= _this4.settings.threshold ? _.isFunction(_this4.settings.markDupe) ? _this4.settings.markDupe(ref) : _this4.settings.markDupe : _.isFunction(_this4.settings.markOk) ? _this4.settings.markOk(ref) : _this4.settings.markOk));
            });

          case Dedupe.ACTIONS.DELETE:
            // Remove all refs above the threshold
            return output.filter(function (ref, refIndex) {
              return refs[refIndex].dedupe.score < _this4.settings.threshold;
            });
        }
      });
    }
  }]);

  return Dedupe;
}(EventEmitter), _defineProperty(_class, "ACTIONS", {
  STATS: 0,
  MARK: 1,
  DELETE: 2
}), _defineProperty(_class, "DUPEREF", {
  INDEX: 0,
  RECNUMBER: 1
}), _defineProperty(_class, "FIELDWEIGHT", {
  MINUMUM: 0,
  AVERAGE: 1
}), _defineProperty(_class, "strategies", {
  clark: require('./strategies/clark'),
  bramer: require('./strategies/bramer'),
  forbes: require('./strategies/forbes'),
  doiOnly: require('./strategies/doiOnly')
}), _temp);