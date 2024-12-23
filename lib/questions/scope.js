const fuzzy = require('fuzzy');

/**
 * Searches for the scopes containing the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} scopes Scopes list.
 */
const findScope = function (substring, scopes) {
  return Promise.resolve(fuzzy.filter(substring || '', scopes).map(({ original: scope }) => scope));
};

exports.createQuestion = (state) => {
  const { scopes } = state.config;

  if (!scopes) {
    return null;
  }

  if (!Array.isArray(scopes) && scopes !== "any") {
    throw new TypeError('scopes must be an array of strings.');
  }

  if (scopes.length < 1) {
    return null;
  }

  const question = scopes === "any" ? {
    message: 'Select the scope this component affects:',
    name: 'scope',
    type: 'input'
  } : {
    message: 'Select the scope this component affects:',
    name: 'scope',
    source: (_answers, input) => findScope(input, scopes),
    type: 'autocomplete'
  };

  return question;
};
