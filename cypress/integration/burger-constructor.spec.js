/* eslint-disable cypress/no-unnecessary-waiting */

describe("Checking the hamburger constructor", function () {
  beforeEach(function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000");
  });

  it("should check drag and drop and make order", () => {
    cy.log("---should drag the bun to the hamburger constructor---");
    cy.contains("Краторная булка N-200i").trigger("dragstart");
    cy.get("#constructor").trigger("drop");
    cy.get("#constructor").contains("Краторная булка N-200i");
    cy.wait(1000);
    cy.log('---should click to tab "Sauces" items---');
    cy.get("[class^=tab]").contains("Соусы").click();
    cy.log("---should drag the sauce to the hamburger constructor---");
    cy.contains("Соус Spicy-X").trigger("dragstart");
    cy.get("#constructor").trigger("drop");
    cy.get("#constructor").contains("Соус Spicy-X");
    cy.wait(1000);
    cy.log('---should click to tab "Filling" items---');
    cy.get("[class^=tab]").contains("Начинки").click();
    cy.log("---should drag the filling to the hamburger constructor---");
    cy.contains("Мясо бессмертных моллюсков Protostomia").trigger("dragstart");
    cy.get("#constructor").trigger("drop");
    cy.get("#constructor").contains("Мясо бессмертных моллюсков Protostomia");
    cy.wait(1000);
    cy.log('---should click to tab "Buns" items---');
    cy.get("[class^=tab]").contains("Булки").click();
    cy.wait(1000);
    cy.contains("Оформить заказ").click();

    cy.log("---should login to the app---");
    cy.log("Login to the application");
    cy.get("form input[type=email]").type("web.test@gmail.com");
    cy.get("form input[type=password]").type("123456");
    cy.contains("Войти").click();
    cy.wait(1000);
    cy.log("---should make order and get order number---");
    cy.contains("Оформить заказ").click();
    cy.wait(16000);
    cy.get("#order-number")
      .invoke("text")
      .should("match", /^[0-9]*$/);
    cy.get("#modal-close").click();
  });
});
