///  <reference types = "cypress" />

const getValue = (str) => {
    return Cypress.env(str); 
};

const PAGE_NAME = 'QA Portal Login';
const NO_ACC_WITH_USERNAME = 'No account found with that username.';
const ENTER_USERNAME = 'Please enter username.';
const ENTER_PASSWORD = 'Please enter your password.';


const userNameField = () => cy.get("[type = 'text']");
const userPasswordFiel = () => cy.get("[type = 'password']");
const btnLogin = () => cy.get('.btn-success');
const inputNameEl = () => cy.get('#all > div > form > div:nth-child(1) > span');
const inputPasswordEl = () => cy.get('#all > div > form > div:nth-child(2) > span');
const incorrectUserName = () => cy.get('#all > div > form > div.form-group.has-error > span');

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
            userNameField().should('have.attr', 'placeholder', 'Username');
            userPasswordFiel().should('have.attr', 'placeholder', 'Password');
          });
    });

    it('Click button Login when password and login are empty', () => {
        
        userNameField().should('be.visible');
        userPasswordFiel().should('be.visible');
        btnLogin().should('be.visible');
        btnLogin().click();
        inputNameEl()
        .should('have.text', ENTER_USERNAME);
        inputPasswordEl()
        .should( 'have.text', ENTER_PASSWORD);
    });

    it('Type valid data in the fields input username and password toLowerCase', () => {
        
        userNameField().type(getValue('validName'));
        cy.get("[type = 'password']").type(getValue('validPass'));
        btnLogin().click();
        incorrectUserName()
        .should('have.text', NO_ACC_WITH_USERNAME);
    });

    it('Type invalid data in fields input username and password', () => {
        
        userNameField().clear().type(getValue('invalidName'));
        userPasswordFiel().clear().type(getValue('invalidPass'));
        btnLogin().click();
        incorrectUserName()
        .should('have.text', NO_ACC_WITH_USERNAME);
         
    });

    it('Type data in the field input username without password ', () => {
        
        userNameField().type(getValue('validName'));
        btnLogin().click();
        inputPasswordEl()
        .should( 'have.text', ENTER_PASSWORD);
    });

    it('Type data in the field input password without username ', () => {

        userPasswordFiel().type(getValue('validPass'));
        btnLogin().click();
        incorrectUserName()
        .should( 'have.text', ENTER_USERNAME);
    });

    it('Successful Login', () => {

        userPasswordFiel.type(getValue('validPass'));
        btnLogin().click();
        cy.title().should('eq', 'Home Page');
    });
});

