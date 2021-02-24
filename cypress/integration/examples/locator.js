///  <reference types = "cypress" />

describe('Check main functionality backet', () => {
     it('Verify input search', () => {

          cy.visit('https://demo.nopcommerce.com/');

          cy.get('#small-searchterms').type('Apple MacBook Pro 13-inch');

          cy.get('.search-box-button').click();

          cy.get('.product-box-add-to-cart-button').click();

          cy.get('#product_enteredQuantity_4').clear().type(2);

          cy.get('#add-to-cart-button-4').click();

          cy.get('.close').click();

          cy.wait(5000);

          cy.get('#topcartlink > a > span.cart-label').click();

          cy.wait(3000);

          cy.get('.unit-price').contains('$1,800.00');
     });
     
});
