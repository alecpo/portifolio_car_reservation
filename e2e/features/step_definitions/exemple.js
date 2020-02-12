const { Given, Then } = require('cucumber');

Given('I should have login screen', async () => {
  await expect(element(by.id('emailInput'))).toBeVisible();
});
