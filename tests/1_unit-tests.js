const chai = require('chai');
const assert = chai.assert;
const americanText = require('./americanText').americanText;
const britishText = require('./britishText').britishText;

const translate = require('../components/translator.js');

suite('Unit Tests', () => {
  
  suite('Translate to British English', () => {
    americanText.forEach((el) => {
      test(`Translate "${el[0]}"`, () => {
        assert.equal(translate(el[0], 'american-to-british', false), el[1])
      });
    });
  });
  
  suite('Translate to American English', () => {
    britishText.forEach((el) => {
      test(`Translate "${el[0]}"`, () => {
        assert.equal(translate(el[0], 'british-to-american', false), el[1])
      });
    });
  });
  
  suite('Highlight translated parts', () => {
    
    test(`Highlight the translated parts of "${americanText[0][0]}"`, () => {
      assert.equal(translate(americanText[0][0], 'american-to-british', true), americanText[0][2]);
    });
    
    test(`Highlight the translated parts of "${americanText[1][0]}"`, () => {
      assert.equal(translate(americanText[1][0], 'american-to-british', true), americanText[1][2]);
    });
    
    test(`Highlight the translated parts of "${britishText[0][0]}"`, () => {
      assert.equal(translate(britishText[0][0], 'british-to-american', true), britishText[0][2]);
    });
    
    test(`Highlight the translated parts of "${britishText[1][0]}"`, () => {
      assert.equal(translate(britishText[1][0], 'british-to-american', true), britishText[1][2]);
    });
    
  })
});