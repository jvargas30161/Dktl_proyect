
describe('Test Suite - conversion processes with user: LD ', () => {

  require('cypress-xpath')

  before(function () {
    cy.fixture('new_users_1').then(function (loginData) {
      globalThis.loginData = loginData;
      cy.fixture('procesosdeconversion').then(function (colaboradorconversion) {
        globalThis.colaboradorconversion = colaboradorconversion

      })
    })
  })

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.viewport(1450, 850)
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_LT)
    cy.get("#password").should("be.visible").type(loginData.Users.password_6)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.viewport(1450, 850)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorconversion } }, ({ colaboradorconversion }) => {
      cy.get('.el-input__wrapper').click()
      cy.clearCookies()
      cy.wait(500)

      //Choose Polanco Store Not enabled
      //cy.get(':nth-child(4) > span').should("be.visible").click()
      //cy.wait(1000)

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //Withdrawal processes.
      cy.get('[href="/e2-mx-front/develop/mx/MX1610/conversions"] > .dropdown-item')
        .should("be.visible").click()
      cy.wait(1500)

      //Sort by created on. / / ascending
      cy.get('.el-table_2_column_6 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by created on. / / descending
      cy.get('.el-table_2_column_6 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by name. / / ascending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by name. / / descending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by satatus. / ascending
      cy.get('.el-table_2_column_9 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by satatus. / descending
      cy.get('.el-table_2_column_9 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by conversion date. / ascending
      cy.get('.el-table_2_column_10 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //sort by conversion date. / descending
      cy.get('.el-table_2_column_10 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      cy.get('#app > div > div > div.collaborator-conversion-list_searchBox_hoXNX > div > div')
        .should("be.visible")
        .click()
        .type(colaboradorconversion.conversion.filtro1610)
      cy.wait(2000)

      cy.get('.el-table__expand-icon')
        .should("be.visible")
        .click()
      cy.wait(1000)

      cy.get('.el-button--default > span')
        .should("be.visible")
        .click()
      cy.wait(6000)

      cy.go('back');
      cy.wait(2000)

      //Logout session
      cy.get('#currentUserUid > #navbarDropdown').should("be.visible").click()      //Click user code.
      cy.wait(1000)
      cy.get("#currentUserUid > div > a:nth-child(2) > div").should("be.visible")   // Logout session
        .click()
      cy.wait(1000)

      cy.log('User GP conversion processes. (Centro MX1982)');

    })

  })

});