const seleniumWebdriver = require('selenium-webdriver');
const { initPlugin } = require('cypress-selenium-webdriver');

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.family === 'chrome' && browser.name !== 'electron') {
      args.push('--disable-site-isolation-trials');
    }
    return args;
  });

  initPlugin(on, config, { webdriver: seleniumWebdriver });
};