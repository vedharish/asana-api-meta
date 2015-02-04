var inflect = require('inflect');
var _ = require('lodash');

/**
 * Helpers for code-generation templates
 */

function _repeat(char, times) {
  var s = '';
  for (var i = 0; i < times; i++) {
    s += char;
  }
  return s;
}

/**
 * Wrap the interior of a multi-line comment at the 80-column boundary.
 *
 * @param {String} text
 * @param {String?} prefix
 * @param {Number?} maxChars
 * @returns {*}
 */
function wrapComment(text, prefix, maxChars) {
  // TODO: actually wrap :)
  prefix = prefix || "";
  maxChars = maxChars || 78;
  return prefix + text.trim().replace(/\n/g, "\n" + prefix);
}

function wrapStarComment(text, indent) {
  return wrapComment(text, _repeat(' ', indent || 0) + ' * ');
}

function wrapHashComment(text, indent) {
  return wrapComment(text, _repeat(' ', indent || 0) + '# ');
}

function typeNameTranslator(lang) {
  return ({
    js: function(name) {
      return ({
        Id: 'Number',
        Enum: 'String'
      })[name] || name;
    }
  })[lang] || function(x) { return x; };
}

module.exports = function(lang) {
  return {
    typeName: typeNameTranslator(lang),
    comment: wrapStarComment,
    plural: inflect.pluralize,
    single: inflect.singularize,
    camel: inflect.camelize,
    cap: inflect.capitalize,
    decap: inflect.decapitalize,
    snake: inflect.underscore,
    dash: inflect.dasherize,
    param: inflect.parameterize,
    human: inflect.humanize
  };
};
