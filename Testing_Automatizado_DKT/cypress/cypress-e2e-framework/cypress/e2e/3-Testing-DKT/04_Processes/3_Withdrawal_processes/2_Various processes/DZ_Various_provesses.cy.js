
describe('Test Suite - Various processes with user: DZ (Zone Director)', () => {

  require('cypress-xpath')

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.viewport(1690, 950)
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type("Z26CDELV")
    cy.get("#password").should("be.visible").type("Cmsv1976_*")

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.viewport(1690, 950)
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

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //Withdrawal processes.
      cy.get('[href="/e2-mx-front/develop/mx/MX1982/leave/openLeaveProcesses"] > .dropdown-item')
        .should("be.visible").click()
      cy.wait(5000)

      //Sort by created on. / / ascending
      cy.get('.el-table_3_column_14 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Explaind.
      cy.get('tbody > :nth-child(1) > .el-table_3_column_14 > .cell')
        .should("be.visible")
        .click()
      cy.wait(2000)

      //Cancel withdrawal
      cy.get('.el-button--danger > span')
        .should("be.visible")
        .click()
      cy.wait(6000)

      //Warning validation
      cy.get('.el-message-box__header').invoke('text')
        .should('eq', 'Advertencia')
      cy.wait(2000)

      //Warning Message Validation
      cy.get('p').should('be.visible').invoke('text')
        .should('eq', 'Se cancelará el proceso de baja. ¿Continuar?')
      cy.wait(2000)

      //Ok botton
      cy.get('.el-message-box__btns > .el-button--primary')
        .should("be.visible")
        .click()
      cy.wait(2000)

      


      //force completed
      /* cy.get('.el-button--success > span')
      .should("be.visible")
        .click()
      cy.wait(2000) */


      /* //Print
      cy.get('tbody > :nth-child(1) > .el-table_3_column_14 > .cell')
      .should("be.visible")
        .click() */





      /* //Logout session
       cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
       cy.wait(2000)
       cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
       cy.wait(2000) */

      cy.log('User DZ (Zone Director) Various processes with data. (Centro MX1982)');

    })

  })

});