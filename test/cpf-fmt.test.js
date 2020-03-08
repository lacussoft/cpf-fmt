/* eslint-disable no-multiple-empty-lines */
/* eslint-disable max-len */
const cpfFmt = require('../src')



/*
 * Assert produced value is as expected
 */

test('"809.765.110-61" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('809.765.110-61')
  expect(cpf).toBe('809.765.110-61')
})

test('"80976511061" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('80976511061')
  expect(cpf).toBe('809.765.110-61')
})

test('"809-765-110-61" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('809-765-110-61')
  expect(cpf).toBe('809.765.110-61')
})

test('"809 765 110 61" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('809 765 110 61')
  expect(cpf).toBe('809.765.110-61')
})

test('"80976511061 " formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('80976511061 ')
  expect(cpf).toBe('809.765.110-61')
})

test('" 80976511061" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt(' 80976511061')
  expect(cpf).toBe('809.765.110-61')
})

test('"8.0.9.7.6.5.1.1.0.6.1" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('8.0.9.7.6.5.1.1.0.6.1')
  expect(cpf).toBe('809.765.110-61')
})

test('"8-0-9-7-6-5-1-1-0-6-1" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('8-0-9-7-6-5-1-1-0-6-1')
  expect(cpf).toBe('809.765.110-61')
})

test('"8 0 9 7 6 5 1 1 0 6 1" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('8 0 9 7 6 5 1 1 0 6 1')
  expect(cpf).toBe('809.765.110-61')
})

test('"80976511061abc" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('80976511061abc')
  expect(cpf).toBe('809.765.110-61')
})

test('"809765110 dv 61" formats to "809.765.110-61"', () => {
  const cpf = cpfFmt('809765110 dv 61')
  expect(cpf).toBe('809.765.110-61')
})

test('"80976511061" formats to "809765110-61"', () => {
  const cpf = cpfFmt('80976511061', {
    delimiters: { dot: '' },
  })
  expect(cpf).toBe('809765110-61')
})

test('"80976511061" formats to "809.765.110.61"', () => {
  const cpf = cpfFmt('80976511061', {
    delimiters: { dash: '.' },
  })
  expect(cpf).toBe('809.765.110.61')
})

test('"809.765.110-61" formats to "80976511061"', () => {
  const cpf = cpfFmt('809.765.110-61', {
    delimiters: {
      dot: '',
      dash: '',
    },
  })
  expect(cpf).toBe('80976511061')
})

test('"80976511061" formats to "809&lt;765&lt;110&gt;61"', () => {
  const cpf = cpfFmt('80976511061', {
    delimiters: {
      dot: '<',
      dash: '>',
    },
    escape: true
  })
  expect(cpf).toBe('809&lt;765&lt;110&gt;61')
})

test('"80976511061" formats to "809.***.***-**"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
  })
  expect(cpf).toBe('809.***.***-**')
})

test('"80976511061" formats to "809.765.***-**"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: { start: 6 },
  })
  expect(cpf).toBe('809.765.***-**')
})

test('"80976511061" formats to "809.***.***-61"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: { end: 8 },
  })
  expect(cpf).toBe('809.***.***-61')
})

test('"80976511061" formats to "***.***.***-61"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: {
      start: 0,
      end: 8,
    },
  })
  expect(cpf).toBe('***.***.***-61')
})

test('"80976511061" formats to "809.***.***-*1"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: {
      start: 9,
      end: 3,
    },
  })
  expect(cpf).toBe('809.***.***-*1')
})

test('"80976511061" formats to "809.###.###-##"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
    hiddenKey: '#',
  })
  expect(cpf).toBe('809.###.###-##')
})

test('"80976511061" formats to "809.765.###-##"', () => {
  const cpf = cpfFmt('80976511061', {
    hidden: true,
    hiddenKey: '#',
    hiddenRange: { start: 6 },
  })
  expect(cpf).toBe('809.765.###-##')
})

test('"abc" falls back to "ABC"', () => {
  const cpf = cpfFmt('abc', {
    onFail: (value) => String(value).toUpperCase(),
  })
  expect(cpf).toBe('ABC')
})



/*
 * Assert TypeError is thrown
 */

test('Option with range start -1 throws TypeError', () => {
  const cpf = () => cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: { start: -1 },
  })
  expect(cpf).toThrow(TypeError)
})

test('Option with range start greater than 10 throws TypeError', () => {
  const cpf = () => cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: { start: 11 },
  })
  expect(cpf).toThrow(TypeError)
})

test('Option with range end -1 throws TypeError', () => {
  const cpf = () => cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: { end: -1 },
  })
  expect(cpf).toThrow(TypeError)
})

test('Option with range end greater than 10 throws TypeError', () => {
  const cpf = () => cpfFmt('80976511061', {
    hidden: true,
    hiddenRange: { end: 11 },
  })
  expect(cpf).toThrow(TypeError)
})

test('Option with onfail as not a function throws TypeError', () => {
  const cpf = () => cpfFmt('80976511061', { onFail: 'testing' })
  expect(cpf).toThrow(TypeError)
})




/*
 * Assert EvalError is thrown
 */

test('Arg "" throws EvalError', () => {
  const cpf = () => cpfFmt('')
  expect(cpf).toThrow(EvalError)
})

test('Arg "abc" throws EvalError', () => {
  const cpf = () => cpfFmt('abc')
  expect(cpf).toThrow(EvalError)
})

test('Arg "1234567890" throws EvalError', () => {
  const cpf = () => cpfFmt('1234567890')
  expect(cpf).toThrow(EvalError)
})

test('Arg "123456789100" throws EvalError', () => {
  const cpf = () => cpfFmt('123456789100')
  expect(cpf).toThrow(EvalError)
})

test('Arg null throws EvalError', () => {
  const cpf = () => cpfFmt(null)
  expect(cpf).toThrow(EvalError)
})

test('Arg false throws EvalError', () => {
  const cpf = () => cpfFmt(false)
  expect(cpf).toThrow(EvalError)
})

test('Arg Infinity throws EvalError', () => {
  const cpf = () => cpfFmt(Infinity)
  expect(cpf).toThrow(EvalError)
})

test('Arg { testing: "As object" } throws EvalError', () => {
  const cpf = () => cpfFmt({ testing: 'As object' })
  expect(cpf).toThrow(EvalError)
})

test('Arg ["testing", "As array"] throws EvalError', () => {
  const cpf = () => cpfFmt(['testing', 'As array'])
  expect(cpf).toThrow(EvalError)
})
