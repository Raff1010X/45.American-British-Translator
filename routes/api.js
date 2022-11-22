'use strict';

const translate = require('../components/translator.js');
const locales = ['american-to-british', 'british-to-american']

module.exports = function (app) {
  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body
      if (text === undefined || locale === undefined) {
        res.json({error: 'Required field(s) missing'});
        return;
      }
      if (!text) {
        res.json({error: 'No text to translate'});
        return;
      }
      if (locales.indexOf(locale) === -1) {
        res.json({error: 'Invalid value for locale field'});
        return;
      }
      let translation = translate(text, locale, true);
      return res.json({ text, translation });
  });
};