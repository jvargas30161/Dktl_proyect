
describe('Test Suite - List of invitations with user: GP (Personnel Manager)', () => {

  //require('cypress-xpath')

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type("Z23RCHAC")
    cy.get("#password").should("be.visible").type("ADFHET%3")

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', () => {
      cy.get('.el-input__wrapper').click()
      cy.clearCookies()
      cy.wait(500)

      //Choose Polanco Store
      cy.get(':nth-child(4) > span').should("be.visible").click()
      cy.wait(1000)

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //Invitation list.
      cy.get('[href="/e2-mx-front/develop/mx/MX1610/invitations"] > .dropdown-item')
        .should("be.visible").click()
      cy.wait(1000)

      //Valitation actions. / Details
      cy.get(':nth-child(1) > .el-table_2_column_8 > .cell > .el-button--primary > span')
        .should("be.visible")
        .click()
      cy.wait(3500)

      //Return anterior page
      cy.go(-1);              //Return to previous screen

      /* //Valitation actions. / Delete
      cy.get(':nth-child(1) > .el-table_3_column_13 > .cell > .el-button--danger > span')
        .should("be.visible")
        .click()
      cy.wait(3500)

      //Warning validation
      cy.get('.el-message-box__title > span').should('be.visible').invoke('text')
        .should('eq', 'Advertencia')

      //Warning Message Validation
      cy.get('p').should('be.visible').invoke('text')
        .should('eq', 'Se eliminará esta invitación. ¿Continuar?')
      cy.wait(2000)

      //Return anterior page
      cy.go(-1);              //Return to previous screen */

      //No funciona boton cancelar.
      /* cy.get('.el-message-box__btns > :nth-child(1) > span')
        .should("be.visible")
        .click()
      cy.wait(3500)
 */
      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(2000)

      cy.log('User GP (Personnel Manager) List of invitations (Centro MX1610)');

    })

  });

});  