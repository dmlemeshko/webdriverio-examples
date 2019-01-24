'use strict'
const assert = require('assert')

module.exports = () => {

  describe('First Test Group', () => {
    it('gets the title of MDN toppage', async () => {
      await browser.url('https://developer.mozilla.org/en-US/');
      const title = await browser.getTitle();
      assert.equal(title, 'MDN Web Docs');
    })
  })

}
