'use strict'
const
  chromedriver = require('chromedriver'),
  webdriverio = require('webdriverio'),
  requireDir = require('require-dir'),
  specs = requireDir('./e2e/'),
  isLocal = process.env.E2E_ENV == 'local',
  connections = isLocal
    ? require('./webdriver.local.js')
    : require('./webdriver.cloud.js')

const port = 9515;
const args = [
  '--url-base=wd/hub',
  `--port=${port}`
];

const options = {
  port,
  capabilities: {
    browserName: 'chrome'
  }
};


/** runs PhantomJS */
if (isLocal) before(() => chromedriver.start(args))

connections.forEach(connection => {
  describe(desc(connection), () => {
    /** runs WebDriver */
    before(async () => global.browser = await webdriverio.remote(options))

    /** execute each test within 'e2e' dir */
    for (const key in specs) specs[key]()

    /** ends the session */
    after(async () => await browser.deleteSession());
  })
})

/** closes PhantomJS process */
if (isLocal) after(() => chromedriver.stop())

/** generate description from capabilities */
function desc (connection) {
  const c = connection.desiredCapabilities
  return [c.browserName].concat(c.version || [], c.platform || []).join(' - ')
}
