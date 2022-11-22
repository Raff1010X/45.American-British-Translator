const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
// Translation with text and locale fields: POST request to /api/translate
    test('Test /api/translate POST request with text and locale fields', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          if(err){
            done(err);
          } else {
            assert.equal(res.status, 200);
            assert.property(res.body, 'translation', 'Return value should contain translation property');
            assert.property(res.body, 'text', 'Return value should contain text value with the original text')
            assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
            done();
          }
        });
    });
// Translation with text and invalid locale field: POST request to /api/translate
      test('Test /api/translate POST request with text and invalid locale fields', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: 'american-to-british-a'
        })
        .end((err, res) => {
          if(err){
            done(err);
          } else {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error', 'Return value should contain error property');
            assert.equal(res.body.error, 'Invalid value for locale field');
            done();
          }
        });
    });
// Translation with missing text field: POST request to /api/translate
      test('Test /api/translate POST request with missing text field', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          locale: 'american-to-british'
        })
        .end((err, res) => {
          if(err){
            done(err);
          } else {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error', 'Return value should contain error property');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          }
        });
    });  
// Translation with missing locale field: POST request to /api/translate
      test('Test /api/translate POST request with missing locale field', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          text: 'Mangoes are my favorite fruit.'
        })
        .end((err, res) => {
          if(err){
            done(err);
          } else {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error', 'Return value should contain error property');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          }
        });
    }); 
// Translation with empty text: POST request to /api/translate
        test('Test /api/translate POST request with empty text', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          text: '',
          locale: 'american-to-british-a'
        })
        .end((err, res) => {
          if(err){
            done(err);
          } else {
            assert.equal(res.status, 200);
            assert.property(res.body, 'error', 'Return value should contain error property');
            assert.equal(res.body.error, 'No text to translate');
            done();
          }
        });
    });
// Translation with text that needs no translation: POST request to /api/translate
      test('Test /api/translate POST request with text that needs no translation', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          text: 'Text that needs no translation.',
          locale: 'american-to-british'
        })
        .end((err, res) => {
          if(err){
            done(err);
          } else {
            assert.equal(res.status, 200);
            assert.property(res.body, 'translation', 'Return value should contain translation property');
            assert.property(res.body, 'text', 'Return value should contain text value with the original text')
            assert.equal(res.body.translation, 'Everything looks good to me!');
            done();
          }
        });
    });
});