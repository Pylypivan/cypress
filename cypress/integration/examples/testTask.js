///  <reference types = "cypress" />

const getValue = (str) => {
    return Cypress.env(str); 
};

const PAGE_NAME = 'QA Portal Login';
const NO_ACC_WITH_USERNAME = 'No account found with that username.';
const ENTER_USERNAME = 'Please enter username.';
const ENTER_PASSWORD = 'Please enter your password.';


describe('Check all functionality Login form', () => {

    beforeEach(() => {
        cy.visit('https://web.pecodesoftware.com/qa-portal/registerlogin/registerlogin.php');
        cy.url().should('include', 'web.pecodesoftware');
      });
    
    it('Verify title', () => {
        cy.title().should('eq', 'Login');
    }); 

    it('Check Logo image and main form for availability ', () => {
        
        cy.get('#logomini').should('not.be.hidden');
        cy.get('.wrapper').should('not.be.hidden');
    });    
    
    it('Verify login page name', () => {
        
        cy.get('#all > div > center > h1').should('have.text', PAGE_NAME);
    });

    it('Verify placeholders Username and Password', () => {
        
        cy.get('#all > div > form').within(() => {
            cy.get("[type = 'text']").should('have.attr', 'placeholder', 'Username');
            cy.get("[type = 'password']").should('have.attr', 'placeholder', 'Password');
          });
    });

    it('Click button Login when password and login are empty', () => {
        
        cy.get("[type = 'text']").should('be.visible');
        cy.get("[type = 'password']").should('be.visible');
        cy.get('.btn-success').should('be.visible');
        cy.get('.btn-success').click();
        cy.get('#all > div > form > div:nth-child(1) > span')
        .should('have.text', ENTER_USERNAME);
        cy.get('#all > div > form > div:nth-child(2) > span')
        .should( 'have.text', ENTER_PASSWORD);
    });

    it('Type valid data in the fields input username and password toLowerCase', () => {
        
        cy.get("[type = 'text']").type(getValue('validName'));
        cy.get("[type = 'password']").type(getValue('validPass'));
        cy.get('.btn-success').click();
        cy.get('#all > div > form > div.form-group.has-error > span')
        .should('have.text', NO_ACC_WITH_USERNAME);
    });

    it('Type invalid data in fields input username and password', () => {
        
        cy.get("[type = 'text']").clear().type(getValue('invalidName'));
        cy.get("[type = 'password']").clear().type(getValue('invalidPass'));
        cy.get('.btn-success').click();
        cy.get('#all > div > form > div.form-group.has-error > span')
        .should('have.text', NO_ACC_WITH_USERNAME);
         
    });

    it('Type data in the field input username without password ', () => {
        
        cy.get("[type = 'text']").type(getValue('validName'));
        cy.get('.btn-success').click();
        cy.get('#all > div > form > div:nth-child(2) > span')
        .should( 'have.text', ENTER_PASSWORD);
    });

    it('Type data in the field input password without username ', () => {

        cy.get("[type = 'password']").type(getValue('validPass'));
        cy.get('.btn-success').click();
        cy.get('#all > div > form > div:nth-child(1) > span')
        .should( 'have.text', ENTER_USERNAME);
    });

    it('Successful Login', () => {

        cy.get("[type = 'password']").type(getValue('validPass'));
        cy.get('.btn-success').click();
        cy.title().should('eq', 'Home Page');
    });
});

