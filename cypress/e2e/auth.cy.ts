describe('Log in ', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("should succeed", () => {
    cy.get('input[name="email"]').type('samarebe@gmail.com');
    cy.get('input[name="password"]').type('AZaz@1');
    cy.get('#loginButton').click();

    cy.url().should('include', '/home');
  });

describe("should fail", () => {
  it('when the email and password field are empty', () => {
    cy.get('#loginButton').click();
    cy.get("[data-test='errors']").should('contain.text','Email is required');
    cy.get("[data-test='errors']").should('contain.text','Password is required');
  });

  it("when the email and password entered have not yet been saved", () => {
    cy.get('input[name="email"]').type('wrong@email.com');
    cy.get('input[name="password"]').type('QSqs1@');
    cy.get('#loginButton').click();
    cy.get("[data-test='modal-wrapper']").should('contain.text',"Incorrect email or password, please enter your correct informations");
    cy.url().should('eq', Cypress.config().baseUrl);
  });

  it("when the entered email exists and the entered password does not match", () => {
    cy.get('input[name="email"]').type('samarebe@gmail.com');
    cy.get('input[name="password"]').type('QSqs1@');
    cy.get('#loginButton').click();
    cy.get("[data-test='modal-wrapper']").should('contain.text',"Incorrect email or password, please enter your correct informations");
    cy.url().should('eq', Cypress.config().baseUrl);
  });

  it("when the entered email does not exist and the password is correct", () => {
    cy.get('input[name="email"]').type('sama@gmail.com');
    cy.get('input[name="password"]').type('AZaz@1');
    cy.get('#loginButton').click();
    cy.get("[data-test='modal-wrapper']").should('contain.text',"Incorrect email or password, please enter your correct informations");
    cy.url().should('eq', Cypress.config().baseUrl );
  });

  it("when the email or password entered does not respect the defined format ", () => {
    cy.get('input[name="email"]').type('wrong@email');
    cy.get('input[name="password"]').type('QSrrrrr');
    cy.get('#loginButton').click();
    cy.get("[data-test='errors']").should('contain.text','Please enter a valid email address.');
    cy.get("[data-test='errors']").should('contain.text','The password requires an uppercase, lowercase, number and special character.');
  });

  it("when password size is less than 6 ", () => {
    cy.get('input[name="password"]').type('j');
    cy.get('#loginButton').click();
    cy.get("[data-test='errors']").should('contain.text','This field should be at least 6 characters long.');
  });
  
  it("when I click on the forgotten password", () => {
    cy.get('#forgot-password-link').click();
    cy.url().should('include', '/forgot-password');
  });
});
  
});
