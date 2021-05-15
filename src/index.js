import _ from 'lodash'
// import { Nijou, NAME } from './utility'
// import * as utility from './utility'
// import { NAME as NAME_OF_TOKYO } from './utility'
import Lion from './utility'

// console.log(Nijou(300))
// console.log(NAME)
// console.log(utility.NAME)
// console.log(NAME_OF_TOKYO)
console.log(Lion.say())

function component() {
  const element = document.createElement('div')
  const array = ['Hello', 'webpack', '!!!!!!!!']
  element.innerHTML = _.join(array, ' ')
  return element
}

document.body.appendChild(component())
