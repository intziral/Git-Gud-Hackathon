/// <reference types="Cypress" />

describe('User Story: Complete Order', function() {

    
    beforeEach(function(){
      // Load test data using cy.fixture
      cy.fixture('fruitData.json').as('fruitData'); // Assuming you have a fixture file named 'fruitData.json'
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/'); // Visit the fruits section
    });

    // Test Case: Checkout empty cart
    it('TC_ID: 28f9caa4-a0b0-11ee-8c90-0242ac120002 - Checkout empty cart', function () {
      cy.get('.cart').find('.empty-cart').should('exist');
      cy.get('.cart').find('.action-block').find('button').should('have.class', 'disabled');
    });

    // Test Case: Checkout cart
    it('TC_ID: 3a00c556-a0af-11ee-8c90-0242ac120002 - Checkout cart', function () {

      // Select the first product
      cy.get('.product').first().as('selectedProduct');
      cy.get('@selectedProduct').contains('ADD TO CART').click();

      // Checkout the cart
      cy.get('.cart-icon').click();
      cy.get('.action-block').contains('PROCEED TO CHECKOUT').click();
      
      cy.get('.product-name').should('have.length', 1);
    });

    // Test Case: Place order
    it('TC_ID: f553548c-a027-11ee-8c90-0242ac120002 - Place order', function () {

      // Select the first product
      cy.get('.product').first().as('selectedProduct');
      cy.get('@selectedProduct').contains('ADD TO CART').click();

      // Checkout the cart
      cy.get('.cart-icon').click();
      cy.get('.action-block').contains('PROCEED TO CHECKOUT').click();

      cy.get('button').contains('Place Order').click();

      cy.get('.products-wrapper').contains('Choose Country');
    });
    
    // Test Case: Select country
    it('TC_ID: ffcc5468-a027-11ee-8c90-0242ac120002 - Select country', function () {

      // Select the first product
      cy.get('.product').first().as('selectedProduct');
      cy.get('@selectedProduct').contains('ADD TO CART').click();

      // Checkout and place order
      cy.get('.cart-icon').click();
      cy.get('.action-block').contains('PROCEED TO CHECKOUT').click();
      cy.get('button').contains('Place Order').click();

      // Open the dropdown and select the country
      cy.get("select").select('Greece');

      // // Check selection
      cy.get('select option:selected').should('have.value', 'Greece');
    });
});
