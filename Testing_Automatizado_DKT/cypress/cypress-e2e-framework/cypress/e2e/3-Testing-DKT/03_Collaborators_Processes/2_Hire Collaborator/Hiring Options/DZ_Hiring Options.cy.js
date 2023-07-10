
describe('Test Suite - Hiring Options with user: DZ (Zone Director)', () => {

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
      cy.wait(1000)

      //Check RFC ("Success")
      cy.get('.el-input__wrapper').should("be.visible").type("MACL020802IJA")
      cy.wait(1000)
      //Next botton.
      cy.get('.el-button > span').should("be.visible").click()
      cy.wait(1000)
      //Return anterior page
      //cy.go(-1);              //Return to previous screen

      //Click in notification
      cy.get("#notification_1 > div > i > svg").should("be.visible").click()
      cy.wait(2000)

      //add data in contract options fields
      cy.get('.el-input__inner').eq(1).click()    //Identity/Access
        .should("be.visible")
        .type("DJZ0WFAPYH")
      cy.wait(500)
      //.click({ multiple: true, force: true });

      cy.get('.el-input__inner').eq(2).click()    //Nombre
        .should("be.visible")
        .type("Shelia")
      cy.wait(500)

      cy.get('.el-input__inner').eq(3).click()    //Apellido_1
        .should("be.visible")
        .type("Caballero")
      cy.wait(500)

      cy.get('.el-input__inner').eq(4).click()    //Apellido_2
        .should("be.visible")
        .type("Ramírez")
      cy.wait(500)

      cy.get('.el-input__inner').eq(5).click()    //Fecha de Nacimiento 
        .should("be.visible")
        .type("02-08-2002")
      cy.wait(500)

      cy.get('.el-input__wrapper').eq(6).click()    //Email 
        .should("be.visible")
        .type("DJZ0WFAPYH@example.com")
      cy.wait(500)

      //continue hiring
      cy.get('.row > .el-button--primary > span')
        .should("be.visible")
        .click()
      cy.wait(500)

      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(2000)

      cy.log('User DZ (Zone Director) Hiring Options (Centro MX1982)');

    })

  });

});  