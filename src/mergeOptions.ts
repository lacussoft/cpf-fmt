/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { CpfFormatingOptions } from './CpfFormatingOptions'

/**
 * Merge custom options to default ones
 *
 * @param {CpfFormatingOptions} options
 * @return {CpfFormatingOptions}
 */
export default function mergeOptions(options: CpfFormatingOptions) {

  let {
    delimiters: { dot = '.', dash = '-' } = {},
    hiddenRange: { start = 3, end = 10, } = {},
    hiddenKey = '*',
    hidden = false,
    escape = false,
    onFail = (value: string) => {
      throw new EvalError(`'${value}' cannot be resolved to a CPF numeric sequence (11 digits)`)
    },
  } = options

  if (hidden) {

    if (Number(start) === NaN || start < 0 || start > 10) {
      throw new TypeError('Option \'hiddenRange.start\' must be a callbacknumber between 0 and 10.')
    }

    if (Number(end) === NaN || end < 0 || end > 10) {
      throw new TypeError('Option \'hiddenRange.end\' must be a callbacknumber between 0 and 10.')
    }

    if (start > end) {
      start = start ^end
      end = start ^end
      start = start ^end
    }
  }

  if (typeof(onFail) !== 'function') {
    throw new TypeError('The option \'onFail\' must be a callback function.')
  }

  return {
    delimiters: { dot, dash },
    hiddenRange: { start, end },
    hiddenKey,
    hidden,
    escape,
    onFail,
  }
}
