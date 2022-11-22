// Dictionary objects
const ameri = require('./american-only.js');
let spells = require('./american-to-british-spelling.js');
let titles = require("./american-to-british-titles.js")
const briti = require('./british-only.js')

// Reverse object keys and values, return new object
const reverseObj = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))

// Change object values - first letter to upper case, return new object
const toUpper = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => 
  [key, value.charAt(0).toUpperCase() + value.substring(1)]))

// Change words in string to words from dictionary object, return string
const rewriteFromObj = (text, translated, obj, highlight) => {
  Object.keys(obj).forEach(el => {
    const testEl =  new RegExp(`${el}[. ]`,'gi');
    if (testEl.test(text)) {
      const changeEl =  new RegExp(el,'gi');
      if (highlight) {
          translated = translated.replace(changeEl, highLight(obj[el]))
          translated = translated.replaceAll('</span> <span class="highlight">', ' ')        
      }
      else translated = translated.replace(changeEl, obj[el])
    }
  })
  return translated
}

// Add <span class="highlight"> to string
const highLight = (txt) => `<span class="highlight">${txt}</span>`

// Change time format - "." and ":"
const formatTime = (txt, arr, highlight) => txt.split(' ').map(el => {
  if (/\d.\d{2}?/.test(el)) 
    return (highlight) ? highLight(el.replace(arr[0], arr[1])) : el.replace(arr[0], arr[1])
  return el
}).join(' ')

// Change string to lower case and remove spaces, return new string
const flatString = (str) => str.toLowerCase().replace(/ /g,'');

// Compare two strings, return true/false
const checkStrings = (txt1, txt2) => (flatString(txt1) === flatString(txt2)) ? true : false

// Main function, return translated string
module.exports = function translate(text, locale, highlight) { 
  let trans = ameri
  let time = [':', '.']
  let spell = spells
  let title = titles
  if (locale === 'british-to-american') {
    trans = briti
    time = ['.', ':']
    spell = reverseObj(spells)
    title = reverseObj(titles)
  }
  title = toUpper(title)
  let translated = text
  translated = rewriteFromObj(text, translated, spell, highlight)
  translated = rewriteFromObj(text, translated, trans, highlight)
  translated = rewriteFromObj(text, translated, title, highlight)
  translated = formatTime(translated, time, highlight)
  if (checkStrings(translated, text)) 
    return 'Everything looks good to me!' 
  return translated
}

// Alternative solution

// const reverseObj = (obj) => {
//   return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))
// }
  
// const translateArr = (arr, obj) => {
//   return arr.map(el => {
//       if (Object.keys(obj).includes(el) && !Object.keys(obj).includes(' '))
//         return obj[el]
//       return el
//     })
// }

// const translateTwoArr = (arr, obj) => {
//   let ret = arr.join(' ')
//   Object.keys(obj).forEach(el => {
//     if (ret.includes(el) && el.includes(' ')) {
//       ret = ret.replace(el, obj[el])
//     }
//   })
//   return ret.split(' ');
// }

// const copyLetter = (arr1, arr2) => {
//   let ret = arr1.join(' ');
//   arr2.forEach(el => {
//     if (/[A-Z]/.test(el.charAt(0))) {
//       if (el.length === 1)
//         ret = ret.replace(el.toLowerCase(), el)
//       else
//         ret = ret.replace(el.toLowerCase().slice(0, -1), el.slice(0, -1))
//     }
//   })
//   return ret.split(' ')
// }

// const highLight = (arr1, arr2) => {
//   const tmpArr = arr1.map((el) => {
//       if (arr2.indexOf(el) === -1)
//         return `<span class="highlight">${el}</span>`
//       return el
//     })
//   const ret = tmpArr.join(' ')
//   return ret.replaceAll('</span> <span class="highlight">', ' ').split(' ')
// }

// const formatTime = (arr1, arr2) => {
//   return arr1.map(el => {
//       if (/^\d(.*\d)?$/.test(el))
//         return el.replace(arr2[0], arr2[1])
//       return el
//     })
// }

// const flatString = (str) => str.toLowerCase().replace(/ /g,'');

// const checkStrings = (txt1, txt2) => {
//   if (flatString(txt1) === flatString(txt2))
//     return true
//   return false
// }

// module.exports = function translate(text, locale, highlight) { 
//   let txt = text
//   let copy = text.split(' ')
//   let last = ''
//   if (/[^A-Za-z]$/.test(text)) {
//     txt =  text.slice(0, -1)
//     copy = text.slice(0, -1).split(' ')
//     last = text.slice(-1)
//   }
  
//   let trans = ameri
//   let time = [':', '.']
//   let spell = spells
//   let title = titles
//   if (locale === 'british-to-american') {
//     trans = briti
//     time = ['.', ':']
//     spell = reverseObj(spells)
//     title = reverseObj(titles)
//   }
  
//   let ret = txt.toLowerCase().split(' ');
//   ret = translateTwoArr(ret, trans)
//   ret = translateArr(ret, trans)
//   ret = translateArr(ret, spell)
//   ret = translateArr(ret, title)
//   ret = copyLetter(ret, copy)
//   ret = formatTime(ret, time)
  
//   if (checkStrings(ret.join(' '), txt))
//     return 'Everything looks good to me!' 
//   if (highlight) 
//     return highLight(ret, copy).join(' ') + last
//   return ret.join(' ') + last
// }