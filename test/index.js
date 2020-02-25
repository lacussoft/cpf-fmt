/* eslint-disable max-len */
const cpfFmt = require('../index')

/**
 * Assert whether 2 values are identical
 *
 * @param {string} target Value intended as result
 * @param {any} source Value to be sumitted to transformation
 * @param {Object} options Options to modify transformation
 */
function assertEquals(target, source, options = {}) {
  const result = cpfFmt(source, options)
  if (target === result) {
    console.log('.')
  } else {
    console.log(`Expected '${target}' but got '${result}'`)
  }
}

/**
 * Assert if the execution of 'cpfFmt()' throws a type error
 *
 * @param {any} source Value to be sumitted to transformation
 * @param {Object} options Options to modify transformation
 */
function assertThrowsTypeError(source, options = {}) {
  let msg = 'No error thrown'
  try {
    cpfFmt(source, options)
  } catch (err) {
    if (err instanceof TypeError) {
      msg = '.'
    } else {
      msg = `'${err.constructor.name}' thrown. Expected 'TypeError'.`
    }
  } finally {
    console.log(msg)
  }
}

/**
 * Assert if the execution of 'cpfFmt()' throws a evaluation error
 *
 * @param {any} source Value to be sumitted to transformation
 * @param {Object} options Options to modify transformation
 */
function assertThrowsEvalError(source, options = {}) {
  let msg = 'No error thrown'
  try {
    cpfFmt(source, options)
  } catch (err) {
    if (err instanceof EvalError) {
      msg = '.'
    } else {
      msg = `'${err.constructor.name}' thrown. Expected 'EvalError'.`
    }
  } finally {
    console.log(msg)
  }
}

assertThrowsEvalError('')
assertThrowsEvalError('abc')
assertThrowsEvalError('1234567890')
assertThrowsEvalError('123456789100')
assertThrowsEvalError(null)
assertThrowsEvalError(false)
assertThrowsEvalError(Infinity)
assertThrowsEvalError({ testing: 'As object' })
assertThrowsEvalError(['testing', 'As array'])

assertEquals('809.765.110-61', '809.765.110-61')
assertEquals('809.765.110-61', '80976511061')
assertEquals('809.765.110-61', '809-765-110-61')
assertEquals('809.765.110-61', '809 765 110 61')
assertEquals('809.765.110-61', '80976511061 ')
assertEquals('809.765.110-61', ' 80976511061')
assertEquals('809.765.110-61', '8.0.9.7.6.5.1.1.0.6.1')
assertEquals('809.765.110-61', '8-0-9-7-6-5-1-1-0-6-1')
assertEquals('809.765.110-61', '8 0 9 7 6 5 1 1 0 6 1')
assertEquals('809.765.110-61', '80976511061abc')
assertEquals('809.765.110-61', '809765110 dv 61')
assertEquals('809765110-61', '80976511061', { delimiters: { dot: '' } })
assertEquals('809.765.110.61', '80976511061', { delimiters: { dash: '.' } })
assertEquals('80976511061', '809.765.110-61', { delimiters: { dot: '', dash: '' } })
assertEquals('809&lt;765&lt;110&gt;61', '80976511061', { delimiters: { dot: '<', dash: '>' }, escape: true })
assertEquals('809.***.***-**', '80976511061', { hidden: true })
assertEquals('809.765.***-**', '80976511061', { hidden: true, hiddenRange: { start: 6 } })
assertEquals('809.***.***-61', '80976511061', { hidden: true, hiddenRange: { end: 8 } })
assertEquals('***.***.***-61', '80976511061', { hidden: true, hiddenRange: { start: 0, end: 8 } })
assertEquals('809.***.***-*1', '80976511061', { hidden: true, hiddenRange: { start: 9, end: 3 } })
assertEquals('809.###.###-##', '80976511061', { hidden: true, hiddenKey: '#' })
assertEquals('809.765.###-##', '80976511061', { hidden: true, hiddenKey: '#', hiddenRange: { start: 6 } })
assertEquals('ABC', 'abc', { onFail: (value) => String(value).toUpperCase() })

assertThrowsTypeError('80976511061', { hidden: true, hiddenRange: { start: -1 } })
assertThrowsTypeError('80976511061', { hidden: true, hiddenRange: { start: 11 } })
assertThrowsTypeError('80976511061', { hidden: true, hiddenRange: { end: -1 } })
assertThrowsTypeError('80976511061', { hidden: true, hiddenRange: { end: 11 } })
assertThrowsTypeError('80976511061', { onFail: 'testing' })
