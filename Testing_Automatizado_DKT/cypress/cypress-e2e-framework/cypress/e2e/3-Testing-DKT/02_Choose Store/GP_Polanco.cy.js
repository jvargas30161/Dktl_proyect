describe('Test Suite - Choose store with user: GP Personnel Manager', () => {

  require('cypress-xpath')

  before(function () {
    cy.fixture('new_users_1').then(function (data) {
      globalThis.data = data
    })

  })

    it('passes with cy.origin()', () => { 
      //Visit the URL of the page you want to test
      cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
      //cy.visit('https://qa-mex.decathlon.net/e2-mx-front/develop/map');
      cy.wait(500)

      //Register user credentials.
      cy.get("#username").should("be.visible").type(data.Users.username_GP)
      cy.get("#password").should("be.visible").type(data.Users.password_2)
      
      //Click in Sing on.
      cy.get("#cnxbton").should("be.visible").click()
      cy.wait(500)

      //To pass multiple domain
      cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', () => {
      cy.get('.el-input__wrapper').click()
      cy.wait(1000)

      //Choose Polanco Store
      cy.get(':nth-child(4) > span').should("be.visible").click()
      cy.wait(1000)
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').click()  // Logout session
      cy.log('User Zone Manager looking for Polanco store (Centro MX1610)');

      }); 

    });  
      
});  