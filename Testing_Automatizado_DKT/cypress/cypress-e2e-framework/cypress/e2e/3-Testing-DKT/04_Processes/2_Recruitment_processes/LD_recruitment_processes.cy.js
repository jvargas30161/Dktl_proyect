describe('Test Suite - recruitment processes with user: Sport leader and collaborator', () => {
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
    cy.viewport(1680, 950)
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
    cy.viewport(1680, 950)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      //cy.get('.el-input__wrapper').click()
      cy.wait(5000)

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //recruitment processes.
      cy.get('[href="/e2-mx-front/develop/mx/MX1610/general/openProcesses"] > .dropdown-item')
        .should("be.visible").click()
      cy.wait(1500)

      //Filters.    No funciona filtro
      /* cy.get('#el-id-3392-9')
        .should("be.visible").click()
      cy.wait(1500) */

      //Sort by created on. / / ascending
      cy.get('.el-table_3_column_14 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by created on. / / descending
      cy.get('.el-table_3_column_14 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by name. / / ascending
      cy.get('.el-table_3_column_15 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by name. / / descending
      cy.get('.el-table_3_column_15 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by contract. / ascending
      cy.get('.el-table_3_column_18 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by contract. / descending
      cy.get('.el-table_3_column_18 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by start date. / ascending
      cy.get('.el-table_3_column_19 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by start date. / descending
      cy.get('.el-table_3_column_19 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      cy.get(':nth-child(1) > .el-table_3_column_12 > .cell > .el-table__expand-icon')
        .should("be.visible")
        .click()
      cy.wait(2000)

      cy.get('.el-button--default > span')
        .should("be.visible")
        .click()
      cy.wait(2000)

      cy.get('#app').scrollIntoView({ duration: 2000, easing: 'linear', offset: { top: 550, left: 0 } });
      cy.wait(2000)

      cy.window().scrollTo('top');
      cy.wait(2000)

      cy.go('back');
      cy.wait(2000)     

      //Logout session
      cy.get('#currentUserUid > #navbarDropdown').should("be.visible").click()      //Click user code.
      cy.wait(1000)
      cy.get("#currentUserUid > div > a:nth-child(2) > div").should("be.visible")   // Logout session
        .click()
      cy.wait(1000)

      cy.log('User Sport leader and collaborator Home Director and HR (Centro MX1610)')

    });

  });

});  