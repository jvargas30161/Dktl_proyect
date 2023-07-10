//import * as loginDataEmpleado from 'fixtures/colaboradorInfo.json'


describe('Test Suite - Deleted collaborators with user: GP ', () => {

  before(function () {
    cy.fixture('new_users_1').then(function (loginData) {
      globalThis.loginData = loginData;
      cy.fixture('colaboradorInfo').then(function (colaboradorData) {
        globalThis.colaboradorData = colaboradorData;
        cy.fixture('fechadebaja').then(function (colaboradorDeleted) {
          globalThis.colaboradorDeleted = colaboradorDeleted
        })
      });
    })
  })

  it('Cross Domain', () => {
    //Visit the URL of the page you want to test
    cy.viewport(1653, 1049)
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_GP)
    cy.get("#password").should("be.visible").type(loginData.Users.password_2)
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.viewport(1653, 1049)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData, colaboradorDeleted } }, ({ colaboradorData, colaboradorDeleted }) => {
      cy.get('.el-input__wrapper').click()
      cy.wait(500)
      //Choose Interlomas MX1982 Store
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      cy.wait(500)
      //Select Collaborator
      cy.get(':nth-child(1) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      cy.get('[href="/e2-mx-front/develop/mx/MX1982/collaborators/deletedCollaborators"] > .dropdown-item').should("be.visible").click()
      cy.wait(1000)

      cy.get('[name="l"]').should("be.visible").type(colaboradorDeleted.fechaDeBaja.fechainicio)
      cy.wait(1000)

      cy.get('[name="e"]').should("be.visible").type(colaboradorDeleted.fechaDeBaja.fechafin + '{enter}');
      cy.wait(1000)

      cy.get('.el-button').should("be.visible").click()
      cy.wait(8000)
      // clean data
      cy.get('u').should("be.visible").click()
      cy.wait(5000)

      // By rfc
      cy.get('#deletedAdvancedFilters > div:nth-child(1) > div:nth-child(2) > div > div > div > div')
        .should("be.visible").click({ force: true })
        .type(colaboradorDeleted.fechaDeBaja.rfc)
      cy.wait(5000)
      cy.get('.el-button > span')
        .click()
      cy.wait(5000)

      cy.get('.el-table__row > .el-table_5_column_22 > .cell')
        .should("be.visible")
        .click()
      cy.wait(5000)

      cy.get('#tab-0')
        .should("be.visible")
        .click()
      cy.wait(3000)

      cy.get('#tab-personalData')
        .should("be.visible")
        .click()
      cy.wait(3000)

      cy.get('#tab-addressData')
        .should("be.visible")
        .click()
      cy.wait(3000)

      cy.get('#tab-fiscalData')
        .should("be.visible")
        .click()
      cy.wait(3000)

      cy.get('#tab-bankData')
        .should("be.visible")
        .click()
      cy.wait(10000)

      cy.get('#tab-laborData')
        .should("be.visible")
        .click()
      cy.wait(10000)

      cy.get('#tab-5')
        .should("be.visible")
        .click()
      cy.wait(3000)

      cy.get('.el-table__expand-icon')
        .should("be.visible")
        .click()
      cy.wait(3000)

      cy.get('.text-decoration-none > .el-button > span')
        .should("be.visible")
        .click()
      cy.wait(5000)

      cy.go('back');
      cy.wait(3000)
      cy.go('back');
      cy.wait(3000)

      cy.get('#deletedAdvancedFilters > div:nth-child(1) > div:nth-child(3) > div > div > div > div')
        .should("be.visible").click({ force: true })
        .type(colaboradorDeleted.fechaDeBaja.apellidopaterno)
      cy.wait(5000)
      cy.get('.el-button > span')
        .click()
      cy.wait(5000)

      // clean data
      cy.get('u').should("be.visible").click()
      cy.wait(5000)

      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(2000)

      cy.log('User GP Collaborators (Centro MX1982)');

    })

  });

});  