const { Given, Then } = require('cucumber');

Given('I should have welcome screen', async () => {
  await expect(element(by.id('loginButtonLoginScreen'))).toBeVisible();
  await element(by.id('loginButtonLoginScreen')).tap();
  await expect(element(by.id('logoutButtonProfileScreen'))).toBeVisible();
  await element(by.id('logoutButtonProfileScreen')).tap();
  await expect(element(by.id('loginButtonLoginScreen'))).toBeVisible();
});
