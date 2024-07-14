describe('Reset your password', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#forgot-password-link').click();
    cy.url().should('include', '/forgot-password');
  });

  it("if you enter your valid and existing email, connexion should succed", () => {
    cy.get('input[name="email"]').type('samarebe@gmail.com');
    cy.get('#forgot-password-button').click();
    
    cy.url().should('include', '/');
  });

describe("Case of error ", () => {
  it('when the email field is empty', () => {
    cy.get('input[name="email"]').clear();
    cy.get('#forgot-password-button').click();
    
    cy.contains('Email is required.').should('be.visible');
    cy.url().should('include', '/forgot-password');
  });

  it('when the email entered does not respect the format', () => {
    cy.get('input[name="email"]').type('sama@good');
    cy.get('#forgot-password-button').click();
    
    cy.contains('Please enter a valid email address.').should('be.visible');
    cy.url().should('include', '/forgot-password');
  });
});
 
it("when the entered email does not correspond to the registered email", () => {
  cy.get('input[name="email"]').type('sam@gmail.com');
  cy.get('#forgot-password-button').click();
  
  cy.url().should('eq', Cypress.config().baseUrl + 'forgot-password');
});
})