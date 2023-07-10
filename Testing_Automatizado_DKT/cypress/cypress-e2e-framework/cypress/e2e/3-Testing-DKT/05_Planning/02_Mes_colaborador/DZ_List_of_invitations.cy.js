
describe('Test Suite - Collaborating month with user: DZ (Zone Director)', () => {

  require('cypress-xpath')

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type("Z26CDELV")
    cy.get("#password").should("be.visible").type("Cmsv1976_*")

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', () => {
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

      //Planing
      cy.get('.me-auto > :nth-child(3) > #navbarDropdown')
        .should("be.visible")
        .click()
      cy.wait(5000)

      //Collaborating month
      cy.get('[href="/e2-mx-front/develop/mx/MX1982/planning/monthPlanning"] > .dropdown-item')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Collaborator/a
      cy.get('.select-trigger > .el-input > .el-input__wrapper > .el-input__suffix > .el-input__suffix-inner')
        .should("be.visible")
        .click()
      cy.wait(5000)

      //Select collaborator
      cy.get('.el-scrollbar__view > :nth-child(1) > span')
        .should("be.visible")
        .click()
      cy.wait(3000)

      //Back
      /* cy.get('.base-back-button_backButton_T6omo > span')
      .should("be.visible")
        .click()
      cy.wait(5000) */

      //Continue
      cy.get('.el-button--primary > span')
        .should("be.visible")
        .click()
      cy.wait(3000)



      /* //Sort by shipping date. / ascending  Son dinamicos
      cy.get('.el-table_2_column_4 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by shipping date. / descending
      cy.get('.el-table_2_column_4 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by created on. / / ascending
      cy.get('.el-table_2_column_5 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by created on. / / descending
      cy.get('.el-table_2_column_5 > .cell > .caret-wrapper > .ascending')
      cy.should("be.visible")
        .click()
      cy.wait(2000)
 
      //Sort by sort by Identity access. / / ascending
      cy.get('.el-table_2_column_6 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by Identity access. / / descending
      cy.get('.el-table_2_column_6 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by RFC. / / ascending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Sort by sort by RFC. / / descending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(2000) */

      cy.log('User DZ (Zone Director) List of invitations with data. (Centro MX1982)');

    })

  })

});