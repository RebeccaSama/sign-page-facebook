describe('Reset your password', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#forgot-password-link').click();
    cy.url().should('include', '/forgot-password');
  });

  it("if you enter your valid and existing email, connexion should succeed", () => {
    cy.get('input[name="email"]').type('samarebe@gmail.com');
    cy.get('#forgot-password-button').click();
    
    cy.url().should('include', '/');
  });

describe("Case of error ", () => {
  it('when the email field is empty', () => {
    cy.get('#forgot-password-button').click();
    cy.get("[data-test='errors']").should('contain.text','Email is required');
  });

  it('when the email entered does not respect the format', () => {
    cy.get('input[name="email"]').type('sama@good');
    cy.get('#forgot-password-button').click();
    
    cy.get("[data-test='errors']").should('contain.text','Please enter a valid email address.');
    cy.url().should('include', '/forgot-password');
  });
});
 
it("when the entered email does not correspond to the registered email", () => {
  cy.get('input[name="email"]').type('sam@gmail.com');
  cy.get('#forgot-password-button').click();
  cy.get("[data-test='errors']").should('contain.text',"This email does not exist. Please enter your email");
  cy.url().should('eq', Cypress.config().baseUrl + 'forgot-password');
});
})