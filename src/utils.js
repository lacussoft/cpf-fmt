/* eslint-disable prefer-const */

const DEFAULT_DOT_SYMBOL = '.';
const DEFAULT_DASH_SYMBOL = '-';
const DEFAULT_HIDDEN_START = 3;
const DEFAULT_HIDDEN_END = 10;
const DEFAULT_HIDDEN_KEY = '*';
const DEFAULT_HIDDEN_STATE = false;
const DEFAULT_ESCAPE_STATE = false;

/**
 * Merge custom options to the default ones.
 *
 * @param {CpfFormattingOptions} options
 * @return {CpfFormattingOptions}
 */
export const mergeOptions = (options = {}) => {
  let {
    delimiters: {
      dot = DEFAULT_DOT_SYMBOL,
      dash = DEFAULT_DASH_SYMBOL,
    } = {},
    hiddenRange: {
      start = DEFAULT_HIDDEN_START,
      end = DEFAULT_HIDDEN_END,
    } = {},
    hiddenKey = DEFAULT_HIDDEN_KEY,
    hidden = DEFAULT_HIDDEN_STATE,
    escape = DEFAULT_ESCAPE_STATE,
    onFail = (value) => value,
  } = options;

  if (hidden) {
    if (isNaN(start) || start < 0 || start > 10) {
      throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 10.');
    }

    if (isNaN(end) || end < 0 || end > 10) {
      throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 10.');
    }

    if (start > end) {
      const aux = start;
      start = end;
      end = aux;
    }
  }

  if (typeof onFail !== 'function') {
    throw new TypeError('The option "onFail" must be a callback function.');
  }

  return {
    delimiters: { dot, dash },
    hiddenRange: { start, end },
    hiddenKey,
    hidden,
    escape,
    onFail,
  };
};
