# LacusSoft :: cpf-fmt

[![npm version](https://img.shields.io/npm/v/@lacussoft/cpf-fmt.svg?style=flat-square)](https://www.npmjs.org/package/@lacussoft/cpf-fmt)
[![install size](https://packagephobia.now.sh/badge?p=@lacussoft/cpf-fmt)](https://packagephobia.now.sh/result?p=@lacussoft/cpf-fmt)
[![npm downloads](https://img.shields.io/npm/dm/@lacussoft/cpf-fmt.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@lacussoft/cpf-fmt)
[![build status](https://img.shields.io/travis/lacussoft/cpf-fmt/master.svg?style=flat-square)](https://travis-ci.org/lacussoft/cpf-fmt)

Basic function to generate valid CPF (Brazilian ID document).

### Installation:

```bash
$ npm install @lacussoft/cpf-fmt
```

### Import:

```js
// ES6+ notation
import cpfFmt from '@lacussoft/cpf-fmt'

// Common JS
const cpfFmt = require('@lacussoft/cpf-fmt')
```

or import it through your HTML file, using CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@lacussoft/cpf-fmt@latest/dist/cpf-fmt.min.js"></script>
```

### Usage:

```js
const cpf = '47844241055'
cpfFmt(cpf)       // returns '478.442.410-55'

cpfFmt(cpf, {     // returns '478.***.***-**'
  hidden: true
})

cpfFmt(cpf, {     // returns '478442410_55'
  delimiters: {
    dot: '',
    dash: '_'
  }
})
```

#### Formating options:

```js
cpfFmt(cpf, {
  delimiters: {
    dot: '.',       // string to replace the dot characters
    dash: '-',      // string to replace the dash character
  },
  escape: false,    // boolean to define if the result should be HTML escaped
  hidden: false,    // boolean to define if digits should be hidden
  hiddenKey: '*',   // string to replace hidden digits
  hiddenRange: {
    start: 3,       // starting index of the numeric sequence to be hidden (min 0)
    end: 10,        // ending index of the numeric sequence to be hidden (max 10)
  },
  onFail(value) {   // fallback function to be invoked in case a non-11-digits is passed
    returnthrow new EvalError()
  }
})
```
