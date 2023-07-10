
describe('Test Suite - Check RFCs with user: DZ (Zone Director)', () => {

  require('cypress-xpath')

  before(function () {
    cy.fixture('new_users_1').then(function (loginData) {
      globalThis.loginData = loginData;
      cy.fixture('colaboradorInfo').then(function (colaboradorData) {
        globalThis.colaboradorData = colaboradorData
      })
    });
  })

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    //cy.visit('https://qa-mex.decathlon.net/e2-mx-front/develop/map');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_DZ)
    cy.get("#password").should("be.visible").type(loginData.Users.password_1)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      cy.get('.el-input__wrapper').click()
      cy.wait(500)

      //Choose Polanco Store Not enabled
      //cy.get(':nth-child(4) > span').should("be.visible").click()
      //cy.wait(500)

      //Choose Interlomas MX1982 Store
      //To modify this search option, just change the number.
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      //To scroll down
      //.type("{pagedown}")
      cy.wait(500)

      //Select Collaborator
      cy.get(':nth-child(1) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)
      //Contratar colaborador/a
      cy.get('[href="/e2-mx-front/develop/mx/MX1982/hiring"] > .dropdown-item').should("be.visible").click()
      cy.wait(3000)

      //Check RFC ("Success")
      cy.get('.el-input__wrapper').should("be.visible").type("MACL020802IJA")
      cy.wait(3000)
      //Next botton.
      cy.get('.el-button > span').should("be.visible").click()
      cy.wait(3000)
      //Return anterior page
      cy.go(-1);              //Return to previous screen

      //Click in notification
      cy.get("#notification_1 > div > i > svg").should("be.visible").click()
      cy.wait(3000)

      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(1000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(1000)

      cy.log('User DZ (Zone Director) Check RFCs (Centro MX1982)');

    })

  });

});  