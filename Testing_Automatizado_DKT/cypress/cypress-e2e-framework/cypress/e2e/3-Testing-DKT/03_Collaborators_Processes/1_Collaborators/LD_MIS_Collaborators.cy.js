
//import * as loginDataEmpleado from 'fixtures/colaboradorInfo.json'

describe('Test Suite - Collaborators with user: LD MIS', () => {

  before(function () {
    cy.fixture('new_users_1').then(function (loginData) {
      globalThis.loginData = loginData;
      cy.fixture('colaboradorInfo').then(function (colaboradorData) {
        globalThis.colaboradorData = colaboradorData
      })
    });
  })

  it('Cross Domain', () => {
    //Visit the URL of the page you want to test
    cy.viewport(1653, 1049)
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_LD_MIS)
    cy.get("#password").should("be.visible").type(loginData.Users.password_4)
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.viewport(1653, 1049)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      cy.get('.el-input__wrapper').click()
      cy.wait(500)
      /* //Choose Interlomas MX1982 Store
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      cy.wait(500) */
      //Select Collaborator
      cy.get(':nth-child(1) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      cy.get('[href="/e2-mx-front/develop/mx/MX1610/collaborators"] > .dropdown-item')
        .should("be.visible")
        .click()
      cy.wait(500)

      cy.get('tbody > :nth-child(1) > .el-table_2_column_5 > .cell')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('#tab-personalData')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('#tab-addressData')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('#tab-fiscalData')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('#tab-bankData')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('#tab-laborData')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('#tab-5')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get(':nth-child(1) > .el-table_3_column_10 > .cell > .el-table__expand-icon')
        .should("be.visible").click()
      cy.wait(1000)

      cy.get('.text-decoration-none > .el-button > span')
        .should("be.visible").click()
      cy.wait(15000)

      cy.go('back');
      cy.wait(5000)
      cy.go('back');
      cy.wait(5000)

      // By name  Ascending
      cy.get('.el-table_5_column_22 > .cell > .caret-wrapper > .ascending')
        .should("be.visible").click()
      cy.wait(1000)

      // By name  Descending
      cy.get('.el-table_5_column_22 > .cell > .caret-wrapper > .descending')
        .should("be.visible").click()
      cy.wait(1000)

      // By profile  Ascending
      cy.get('.el-table_5_column_23 > .cell > .caret-wrapper > .ascending')
        .should("be.visible").click()
      cy.wait(1000)

      // By profile  Descending
      cy.get('.el-table_5_column_23 > .cell > .caret-wrapper > .descending')
        .should("be.visible").click()
      cy.wait(1000)

      //Logout session
      cy.get('#currentUserUid > #navbarDropdown')
        .should("be.visible").click()

      cy.get('[href="/e2-mx-front/develop/logout"] > .dropdown-item')
        .should("be.visible").click()

      // by team
      /* cy.get('thead > tr > .el-table_2_column_7 > .cell')
        .should("be.visible").click()
      cy.wait(1000) */


      cy.log('User DZ (Zone Director) Collaborators (Centro MX1982)');

    })

  });

});  