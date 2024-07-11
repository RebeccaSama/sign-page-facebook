describe('To reset your password : ', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#forgot-password-link').click();
    cy.url().should('include', '/forgot-password');
  });

  it("Enter your valid and existing email", () => {
    cy.get('input[name="email"]').type('samarebe@gmail.com');
    cy.get('#forgot-password-button').click();
    
    cy.url().should('include', '/');
  });

describe("Case of error when  :", () => {
  it('the email field is empty', () => {
    cy.get('input[name="email"]').clear();
    cy.get('#forgot-password-button').click();
    
    cy.contains('Email is required.').should('be.visible');
    cy.url().should('include', '/forgot-password');
  });

  it('the email entered does not respect the format', () => {
    cy.get('input[name="email"]').type('sama@good');
    cy.get('#forgot-password-button').click();
    
    cy.contains('Please enter a valid email address.').should('be.visible');
    cy.url().should('include', '/forgot-password');
  });
});
 
it("the entered email does not correspond to the registered email", () => {
  cy.get('input[name="email"]').type('sam@gmail.com');
  cy.get('#forgot-password-button').click();
  
  cy.url().should('eq', Cypress.config().baseUrl + 'forgot-password');
});
})