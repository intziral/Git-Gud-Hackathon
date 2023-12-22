// topDeals.spec.js

describe('User Story: Top Deals', function ()  {

    beforeEach(function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/'); 
  
      });

    it('should display the expected number of top deals', () => {
      // Navigate to the page displaying top deals
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
        
      cy.fixture('topDeals').then((data) => {
        cy.get('#page-menu').select(data.selectNumDisplayedDeals);

        cy.get('tbody tr').should('have.length', data.expectedNumberOfTopDeals);
        });
    });

    it('should include necessary details for each top deal', () => {
      
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    cy.get('tbody tr').each(($deal) => {
        // Inside the loop, you can access and perform actions/assertions on each <tr>
        const productName = $deal.find('td:nth-child(1)').text(); 
        const price = $deal.find('td:nth-child(2)').text(); 
        const discountPrice = $deal.find('td:nth-child(3)').text(); 

        expect(productName).to.not.be.empty;
        expect(discountPrice).to.not.be.empty;
        expect(price).to.not.be.empty;

        });
      });

    it('should verify that discount is smaller than price for each deal', () => {

      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');

      // Assuming the deals are represented by <tr> elements within a <tbody>
      cy.get('tbody tr').each(($deal) => {
      // Extract price and discount values from the current deal
        const price = parseFloat($deal.find('td:nth-child(2)').text());
        const discount = parseFloat($deal.find('td:nth-child(3)').text());

      // Check if the discount is smaller than the price
        expect(discount).to.be.lessThan(price);
      });
    });

    it('Sorts deals in descending order by name', () => {
      // Assuming you have already navigated to the page displaying top deals
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
      
      // Check if the "Veg/fruit name" column is sorted in descending order
      cy.get('.container .sr-only').contains("Sorted by name: descending order")

      // Optionally, you can check the order of displayed deals
      cy.get('tbody tr').each(($row, index, $list) => {
        if (index < $list.length - 1) {
          const currentDealName = $row.find('td').eq(0).text();
          const nextDealName = $list.eq(index + 1).find('td').eq(0).text();
          expect(currentDealName.localeCompare(nextDealName)).to.be.gte(0);
        }
      });
    });
  });
  