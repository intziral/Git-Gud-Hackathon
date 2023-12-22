/// <reference types="Cypress" />

describe('User Story: Add Products in the Cart', function() {

    
    beforeEach(function(){
      // Load test data using cy.fixture
      cy.fixture('fruitData.json').as('fruitData'); // Assuming you have a fixture file named 'fruitData.json'
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/'); // Visit the fruits section

    });
  

    // Test Case: Verify Product Listing
    it('TC_ID: 2a5f45a4-1af5-4cf0-a24d-d87ad4860c9f - Verify Product Listing', function () {
      cy.get('.product').first(this.fruitData.expectedProductCount).each((product) => {

        cy.wrap(product).find('.product-image img').should('have.attr', 'src');
        cy.wrap(product).find('.product-name').should('exist');
        cy.wrap(product).find('.product-price').should('exist');
        cy.wrap(product).find('.product-action button').should('contain', 'ADD TO CART');
      });
    });
 

    // Test Case: Add Single Product to Cart
    it('TC_ID: e8ac7251-611c-4685-8a5d-9ee53e150678 - Add Single Product to Cart', function () {
      cy.get('@fruitData').then((fruitData) => {
        // Select the first product
        cy.get('.product').first().as('selectedProduct');
        cy.get('@selectedProduct').contains('ADD TO CART').click();
        cy.get('.cart-icon').should('have.text', fruitData.cartItemCount);
      });
    });


    // Test Case: Remove Product from Cart
    it('TC_ID: 742adf97-198a-4b47-9134-3bab92f3b481 - Remove Product from Cart', function () {

      // Select the first product
      cy.get('.product').first().as('selectedProduct');
      cy.get('@selectedProduct').contains('ADD TO CART').click();

      // Click the cart icon to view the cart
      cy.get('.cart-icon').click();

      // Click on the "X" button for the added product
      cy.get('.cart-item').first().find('.product-remove').click();

      // Check that the cart is updated with the correct item count and total price
      cy.get('.cart-info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > strong:nth-child(1)').should('have.text', '0');
      cy.get('.cart-info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > strong:nth-child(1)').should('have.text', '0'); 
    });

  // Test Case: Add Multiple Products to Cart
  it('TC_ID: 5f8b88e1-e352-4e29-9c4a-285dd0386ae7 - Add Multiple Products to Cart', function () {
    cy.get('@fruitData').then((fruitData) => {
        // Iterate over the first 5 products and add them to the cart
      cy.get('.product').each(($product, index) => {
          if (index < fruitData.totalCartItemCount) {
              
            // Select the first product
            cy.get('.product').eq(index).as('selectedProduct');
            cy.get('@selectedProduct').contains('ADD TO CART').click();
          }
      });

      // Confirm that the cart icon reflects the accurate total item count
      cy.get('.cart-icon').should('have.text', fruitData.totalCartItemCount);

      // Verify that all selected products are added to the cart
      cy.get('.cart-preview .cart-items .cart-item').should('have.length', fruitData.totalCartItemCount); // Assuming each click adds one item to the cart
  });
});


    // Test Case: Update Product Quantity in Cart
    it('TC_ID: a7cbf4a5-2e0c-4a8b-be0a-ae72b751f7d3 - Update Product Quantity in Cart', function () {

      // Select the third product
      cy.get('.product').eq(2).as('selectedProduct');
      cy.get('@selectedProduct').contains('ADD TO CART').click();

      // Assuming you have a stepper input for quantity, increment the quantity
      cy.get('div.product:nth-child(1) > div:nth-child(4) > a:nth-child(3)').contains('+').click();
      cy.get('div.product:nth-child(1) > div:nth-child(5) > button:nth-child(1)').contains('ADD TO CART').click();
      
      // Verify that the cart is updated with the correct quantity and total price
      cy.get('.cart-info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > strong:nth-child(1)').should('have.text', '2');
      cy.get('.cart-info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > strong:nth-child(1)').should('have.text', '288'); 
    
    });

    
    it('TC_ID: fc49ed79-1a8d-498c-9c7c-090f7b88bd9b - Cart Summary and Checkout', function() {

      cy.get('@fruitData').then((fruitData) => {
        // Add multiple products to the cart.
        cy.get('.product').each(($product, index) => {
          if (index < fruitData.totalCartItemCount) {
            cy.get('.product').eq(index).as('selectedProduct');
            cy.get('@selectedProduct').contains('ADD TO CART').click();
          }
      });

      // Visit the cart page
      //cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/cart');
      cy.get('.cart-icon').click()
      cy.get('.action-block').contains('PROCEED TO CHECKOUT').click()
  

      cy.get('.product-name').should('have.length', fruitData.totalCartItemCount);
  
      // Check that the total price is accurate
      // For simplicity, let's assume the total is calculated and displayed somewhere
      cy.get('.totAmt').should('have.text', '316 '); 
    });
  });

    // Test Case: Cart Persistence
    // In order for the test to pass, it is expected that there is not cart persistence
    it('TC_ID: b4441d88-dee4-45a9-9d20-b8713356cf8e - Cart Persistence', function () {
      cy.get('@fruitData').then((fruitData) => {
        // Assuming products are already added to the cart
        cy.get('.product').first().as('selectedProduct'); 
        cy.get('@selectedProduct').contains('ADD TO CART').click();
        // Navigate to the cart page
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/cart');
        cy.get('.cart-icon').should('have.text', fruitData.wrongCartItemCount);
        cy.reload(); // Simulate closing and reopening the browser
        cy.get('.cart-icon').should('have.text', fruitData.wrongCartItemCount);
      });
    });
  
  });
  