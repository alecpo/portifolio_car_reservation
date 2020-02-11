const { Given, Then } = require("cucumber");

Given("que eu esteja na tela de login", async () => {
  await expect(element(by.id("emailInput"))).toBeVisible();
  await expect(element(by.id("passwordInput"))).toBeVisible();
});

Then("eu clico no input de email e digito um email", async () => {
  await element(by.id("emailInput")).tap();
  await element(by.id("emailInput")).typeText(
    "alessandro.oliveira@usecargo.mobi"
  );
});
