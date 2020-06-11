describe('Demo test', function() {

  before(browser => browser.url('http://localhost:8080/'));

  test('Homepage Test', function (browser) {
    browser
      .waitForElementVisible('body')
      .assert.titleContains('Pirate Musician')
      // .assert.visible('input[type=search]')
      // .setValue('input[type=search]', 'nightwatch')
      // .assert.visible('button[type=submit]')
      // .click('button[type=submit]')
      // .assert.containsText('.mainline-results', 'Nightwatch.js')
  });

  after(browser => browser.end());
});