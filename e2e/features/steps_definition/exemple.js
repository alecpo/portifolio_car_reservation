const { Given, Then } = require("cucumber");

Given("I should be on the welcome screen", async () => {
  await expect(element(by.id("one"))).toBeVisible();
});
