describe('Test Suite - Check RFCs with user: Sport leader and collaborator', () => {
  //In this case, there isn't store selection.

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
    cy.get("#username").should("be.visible").type(loginData.Users.username_LD_MIS)
    cy.get("#password").should("be.visible").type(loginData.Users.password_4)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      //cy.get('.el-input__wrapper').click()
      cy.wait(500)

      //Comprobar RFC ("Correcto")
      //cy.get('.el-input__wrapper').should("be.visible")

      //Select Collaborator
      cy.get(':nth-child(1) > #navbarDropdown').should("be.visible")
        .click()
      cy.wait(1000)
      //Contratar colaborador/a
      cy.get('[href="/e2-mx-front/develop/mx/MX1610/hiring"] > .dropdown-item').should("be.visible")
        .click()
      cy.wait(1000)

      //Check RFC message ("Por favor introduce un RFC válido")
      cy.get('.el-input__wrapper').should("be.visible").type("  ")
      cy.wait(1000)

      //Validación mensaje.
      cy.get('.el-form-item__error').should('be.visible').invoke('text')
        .should('eq', 'Por favor introduce un RFC válido');

      //Logout session
      cy.get('#currentUserUid > #navbarDropdown').should("be.visible").click()      //Click user code.
      cy.wait(2000)
      cy.get("#currentUserUid > div > a:nth-child(2) > div").should("be.visible")   // Logout session
        .click()
      cy.wait(2000)

      cy.log('User Check RFCs Error message (Centro MX1610)');


    });

  });

});  