describe("open modal ingredient", function () {
  beforeEach(function () {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:3000");
  });

  it("should open a modal window with detailed data about the ingredient", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.contains("Детали ингредиента");
    cy.contains("Краторная булка N-200i");
    cy.contains("Калории,ккал");
    cy.contains("420");
    cy.contains("Белки, г");
    cy.contains("80");
    cy.contains("Жиры, г");
    cy.contains("24");
    cy.contains("Углеводы, г");
    cy.contains("53");
  });

  it("should closing a modal window when the close button is clicked", function () {
    cy.contains('Краторная булка N-200i').click();
    cy.get("#modal-close").click();
    cy.get("#modal").should("not.exist");
  });

  it("should closing a modal window when the overlay is clicked", function () {
    cy.contains('Краторная булка N-200i').click();
    cy.get("#modal-overlay").click({force: true});
    cy.get("#modal").should("not.exist");
  });
});
