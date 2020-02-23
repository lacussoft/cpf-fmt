import numOnly from '@lacussoft/num-only'

/**
 * Validate a given CPF (Brazilian ID document) char sequence
 *
 * @param {string} cpfString
 * @param {object} options
 * @return {string}
 */
export default function(cpfString: string, options: {} = {}): string {
  return numOnly(cpfString)
}
