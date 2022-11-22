# [freeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/)

## [American British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator)

Working example: https://app-ameri-briti-transl.herokuapp.com/

My git repo: https://github.com/Raff1010X/01.Roadmap

```javascript
// Dictionary objects
const ameri = require('./american-only.js');
let spells = require('./american-to-british-spelling.js');
let titles = require('./american-to-british-titles.js');
const briti = require('./british-only.js');

// Reverse object keys and values, return new object
const reverseObj = (obj) =>
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

// Change object values - first letter to upper case, return new object
const toUpper = (obj) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            value.charAt(0).toUpperCase() + value.substring(1),
        ])
    );

// Change words in string to words from dictionary object, return string
const rewriteFromObj = (text, translated, obj, highlight) => {
    Object.keys(obj).forEach((el) => {
        const testEl = new RegExp(`${el}[. ]`, 'gi');
        if (testEl.test(text)) {
            const changeEl = new RegExp(el, 'gi');
            if (highlight) {
                translated = translated.replace(changeEl, highLight(obj[el]));
                translated = translated.replaceAll(
                    '</span> <span class="highlight">',
                    ' '
                );
            } else translated = translated.replace(changeEl, obj[el]);
        }
    });
    return translated;
};

// Add <span class="highlight"> to string
const highLight = (txt) => `<span class="highlight">${txt}</span>`;

// Change time format - "." and ":"
const formatTime = (txt, arr, highlight) => {
    const regex = new RegExp(`([0-9]{1,2})([${arr[0]}])([0-9]{1,2})`, 'g');
    if (highlight)
        return txt.replace(
            regex,
            `<span class="highlight">$1${arr[1]}$3</span>`
        );
    return txt.replace(regex, `$1${arr[1]}$3`);
};

// Change string to lower case and remove spaces, return new string
const flatString = (str) => str.toLowerCase().replace(/ /g, '');

// Compare two strings, return true/false
const checkStrings = (txt1, txt2) =>
    flatString(txt1) === flatString(txt2) ? true : false;

// Main function, return translated string
module.exports = function translate(text, locale, highlight) {
    let trans = ameri;
    let time = [':', '.'];
    let spell = spells;
    let title = titles;
    if (locale === 'british-to-american') {
        trans = briti;
        time = ['.', ':'];
        spell = reverseObj(spells);
        title = reverseObj(titles);
    }
    title = toUpper(title);
    let translated = text;
    translated = rewriteFromObj(text, translated, spell, highlight);
    translated = rewriteFromObj(text, translated, trans, highlight);
    translated = rewriteFromObj(text, translated, title, highlight);
    translated = formatTime(translated, time, highlight);
    if (checkStrings(translated, text)) return 'Everything looks good to me!';
    return translated;
};