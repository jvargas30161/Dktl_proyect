
describe('Test Suite - Login with user: DZ (Zone Director)', () => {

  require('cypress-xpath')

  before(function () {
    cy.fixture('new_users_1').then(function (data) {
      globalThis.data = data
    })

  })

  it('should visit a page and assert on its content', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    //cy.visit('https://qa-mex.decathlon.net/e2-mx-front/develop/map');
    cy.wait(1000)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(data.Users.username_DZ)
    cy.get("#password").should("be.visible").type(data.Users.password_1)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(1000)

    cy.log('Login with DZ (Zone Director) ');



  });

});  