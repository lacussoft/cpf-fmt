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

  const {
    delimiters: { dot = '.', dash = '-' } = {},
    hiddenRange: { start = 3, end = 10, } = {},
    hiddenKey = '*',
    hidden = false,
    escape = false,
    onFail = (value: string) => {
      throw new Error(
        `'${value}' cannot be resolved to a CPF numeric sequence (11 digits)`
      )
    },
  } = options

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
