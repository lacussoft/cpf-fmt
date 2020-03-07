/* eslint-disable indent */
// eslint-disable-next-line no-unused-vars
import { CpfFormatingOptions } from './CpfFormatingOptions'
import html from 'html-escaper'
import mergeOptions from './mergeOptions'
import numOnly from '@lacussoft/num-only'

/**
 * Validate a given CPF (Brazilian ID document) char sequence
 *
 * @param {string} cpfString
 * @param {object} options
 * @return {string}
 */
export default function(cpfString: string, options: CpfFormatingOptions = {}) {

  const cpfNumbers: string = numOnly(cpfString)
  const finalOptions = mergeOptions(options)

  if (cpfNumbers.length !== 11) {
    return finalOptions.onFail(cpfString)
  }

  const cpfArray: string[] = [...cpfNumbers]

  if (finalOptions.hidden) {
    // eslint-disable-next-line max-len
    for (let i = finalOptions.hiddenRange.start; i <= finalOptions.hiddenRange.end; i++) {
      cpfArray[i] = finalOptions.hiddenKey
    }
  }

  cpfArray.splice(9, 0, finalOptions.delimiters.dash)
  cpfArray.splice(6, 0, finalOptions.delimiters.dot)
  cpfArray.splice(3, 0, finalOptions.delimiters.dot)
  const cpfFormat = cpfArray.join('')

  if (finalOptions.escape) {
    return html.escape(cpfFormat)
  }

  return cpfFormat
}
