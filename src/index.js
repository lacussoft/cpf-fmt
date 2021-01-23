/* eslint-env node */
const cpfFmt = require('./cpf-fmt').default;

module.exports = cpfFmt;

// Allow use of default import with ES module syntax
module.exports.default = cpfFmt;
