describe('My first Test', () => {
    
    it('Verify tittle positive ', () => {
        cy.visit('https://demo.nopcommerce.com/');
        cy.title().should('eq', 'nopCommerce demo store');
    });

    it('Verify tittle negative ', () => {
        cy.visit('https://demo.nopcommerce.com/');
        cy.title().should('eq', 'nopCommerce demo sto');
    });
    // it('Get css atribute', () => {
    //     cy.visit('https://demo.nopcommerce.com/');
    //     cy.get('#ember51');
    // });
    
    
});




// describe('Random', () => {
//     it('Verify email', () => {
//         cy.visit('https://library-app.firebaseapp.com/');
//         cy.contains('input').click()
//         cy.url().should('include', '/commands/actions');

//         cy.get('.ember-text-field').type('name@gmail.com').should('have value', 'name@gmail.com');

//     });
// });




