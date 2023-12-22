/// <reference types="Cypress" />

describe('User Story: Search for products', function() {

  beforeEach(function(){
    // Load test data using cy.fixture
    cy.fixture('fruitData.json').as('fruitData'); // Assuming you have a fixture file named 'fruitData.json'
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/'); // Visit the fruits section
  });


  it('TC_ID: a3715aee-a0b6-11ee-8c90-0242ac120002	- Search with a valid keyword', function () {
    cy.get('input.search-keyword').type('Brocolli');
    cy.get('.products').should('have.length', 1);
  });

  it('TC_ID: e27253d2-a0b7-11ee-8c90-0242ac120002	- See product details', function () {
    cy.get('.product-image').first().find('img').first().click();
    cy.get('.quick-view').should('be.visible');
  });

  it('TC_ID: fe9f86fc-a0bb-11ee-8c90-0242ac120002	- Search with valid keyword and no match', function () {
    cy.get('input.search-keyword').type('test');
    cy.get('.no-results').should('exist');
  });
  
});
  