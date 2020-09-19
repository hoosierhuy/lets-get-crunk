// https://docs.cypress.io/api/introduction/api.html

describe("Cocktails App", function() {
  beforeEach(function() {
    cy.fixture("cocktail").as("cocktailData");
  });

  it("should visit the app root url", function() {
    cy.visit("/");

    cy.get("[data-qa-id='header']").should(
      "contain",
      this.cocktailData.databaseTitle
    );
  });

  it("should open a cocktail detail", function() {
    const cocktailCard = cy.contains(
      "[data-qa-name='cocktail-card']",
      this.cocktailData.cocktailName
    );

    cocktailCard.click();

    cy.get("[data-qa-id='name']").should(
      "contain",
      this.cocktailData.cocktailName
    );
  });

  it("should navigate back to the original list", function() {
    cy.get("[data-qa-id='header'] span.go-back").click();

    cy.get("[data-qa-id='name']").should("not.exist");
  });

  it("should search by cocktail", function() {
    cy.get("input[name='search']").click();
    cy.get("input[type='text']").type(this.cocktailData.cocktailSearchString);
    cy.contains("button", "Search").click();

    cy.contains(
      "[data-qa-name='cocktail-card']",
      this.cocktailData.cocktailName
    ).should("have.length", 1);
  });
});
