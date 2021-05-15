import _ from 'lodash'
import './style.css'
import thumbnail from './thumbnail.jpg'

function component() {
  const element = document.createElement('div')
  const array = ['Hello', 'webpack', '!!!!!!!!']
  element.innerHTML = _.join(array, ' ')
  return element
}

document.body.appendChild(component())
document.body.classList.add('bg')

const image = new Image()
image.src = thumbnail
document.body.appendChild(image)
