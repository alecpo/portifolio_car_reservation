const { Given, Then } = require('cucumber');

Given('I should have welcome screen', async () => {
  await expect(element(by.id('emailInput'))).toBeVisible();
});
