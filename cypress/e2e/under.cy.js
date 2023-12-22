  // Test Case: Add Multiple Products to Cart
  it('TC_ID: 5f8b88e1-e352-4e29-9c4a-285dd0386ae7 - Add Multiple Products to Cart', function () {
    cy.get('@fruitData').then((fruitData) => {
        cy.get('.product').each(($product, index) => {
            if (index < 5) {
              // Do something with each of the first 5 product elements
              cy.wrap($product).click(); // For example, clicking each product
              cy.log(`Clicked on product ${index + 1}`);
            }
          });
    

    // Confirm that the cart icon reflects the accurate total item count
    cy.get('.cart-icon').should('have.text', fruitData.totalCartItemCount);

    // Verify that all selected products are added to the cart
    cy.get('.cart-item').should('have.length', fruitData.totalCartItemCount);
    });  
  });
