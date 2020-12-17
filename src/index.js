import html from 'html-escaper';
import numOnly from '@lacussoft/num-only';
import mergeOptions from './merge-options';

/**
 * Validate a given CPF char sequence.
 *
 * @param {string} cpfString
 * @param {CpfFormattingOptions} [options]
 * @return {string}
 */
const cpfFmt = (cpfString, options = {}) => {
  const CPF_LENGTH = 11;
  const cpfArray = numOnly(cpfString).split('');
  const userOptions = mergeOptions(options);

  if (cpfArray.length !== CPF_LENGTH) {
    return userOptions.onFail(cpfString);
  }

  if (userOptions.hidden) {
    for (let i = userOptions.hiddenRange.start; i <= userOptions.hiddenRange.end; i++) {
      cpfArray[i] = userOptions.hiddenKey;
    }
  }

  cpfArray.splice(9, 0, userOptions.delimiters.dash);
  cpfArray.splice(6, 0, userOptions.delimiters.dot);
  cpfArray.splice(3, 0, userOptions.delimiters.dot);
  const cpfPretty = cpfArray.join('');

  if (userOptions.escape) {
    return html.escape(cpfPretty);
  }

  return cpfPretty;
};

export default cpfFmt;
