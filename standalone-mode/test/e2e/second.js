'use strict'
const assert = require('assert')

module.exports = () => {

  describe('Second Test Group', () => {
    it('gets the title of GitHub toppage', async () => {
      await browser.url('https://github.com/');
      const title = await browser.getTitle();
      assert.equal(title, 'The world\’s leading software development platform · GitHub');
    })
  })

}
