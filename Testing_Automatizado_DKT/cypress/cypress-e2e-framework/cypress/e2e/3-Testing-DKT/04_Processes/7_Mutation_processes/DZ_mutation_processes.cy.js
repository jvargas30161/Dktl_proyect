
describe('Test Suite - extension processes with user: DZ (Zone Director) ', () => {

  require('cypress-xpath')

  before(function () {
    cy.fixture('new_users_1').then(function (loginData) {
      globalThis.loginData = loginData;
      cy.fixture('procesosdemutacion').then(function (colaboradormutacion) {
        globalThis.colaboradormutacion = colaboradormutacion

      })
    })
  })

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.viewport(1400, 800)
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_DZ)
    cy.get("#password").should("be.visible").type(loginData.Users.password_1)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.viewport(1400, 800)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradormutacion } }, ({ colaboradormutacion }) => {
      cy.get('.el-input__wrapper').click()
      cy.clearCookies()
      cy.wait(500)

      //Choose Polanco Store Not enabled
      //cy.get(':nth-child(4) > span').should("be.visible").click()
      //cy.wait(1000)

      //Choose Interlomas MX1982 Store
      //To modify this search option, just change the number.
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      //To scroll down
      //.type("{pagedown}")
      cy.wait(1000)

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //Extensions processes.
      cy.get('[href="/e2-mx-front/develop/mx/MX1982/mutations"] > .dropdown-item')
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

      //Sort by collaborator on. / / ascending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .ascending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by collaborator on. / / descending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by origin on // ascending
      cy.get('.el-table_2_column_8 > .cell > .caret-wrapper > .ascending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by origin on // descending
      cy.get('.el-table_2_column_8 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by destination on // ascending
      cy.get('.el-table_2_column_9 > .cell > .caret-wrapper > .ascending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by destination on // descending
      cy.get('.el-table_2_column_9 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by migration status on // ascending
      cy.get('.el-table_2_column_12 > .cell > .caret-wrapper > .ascending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by migration status on // descending
      cy.get('.el-table_2_column_12 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by migration date on // ascending
      cy.get('.el-table_2_column_13 > .cell > .caret-wrapper > .ascending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      // Sort by migration date on // descending
      cy.get('.el-table_2_column_13 > .cell > .caret-wrapper > .descending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)

      cy.get('#app > div > div > div.collaborator-mutation-list_searchBox_u3gv1 > div > div')
      cy.should("be.visible")
        .click()
        .type(colaboradormutacion.mutacion.filtro)
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
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(2000)

      cy.log('User DZ (Zone Director) extension (Centro MX1982)');

    })

  })

});