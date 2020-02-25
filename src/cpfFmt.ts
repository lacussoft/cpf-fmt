// eslint-disable-next-line no-unused-vars
import { CpfFormatingOptions } from './CpfFormatingOptions'
import mergeOptions from './mergeOptions'
import numOnly from '@lacussoft/num-only'


/**
 * Validate a given CPF (Brazilian ID document) char sequence
 *
 * @param {string} cpfString
 * @param {object} options
 * @return {string}
 */
export default function(cpfString: string, options?: CpfFormatingOptions) {
  const finalOptions = mergeOptions(options)
  console.log(finalOptions)
  // finalOptions.onFail('kkk')
  return numOnly(cpfString)
}
