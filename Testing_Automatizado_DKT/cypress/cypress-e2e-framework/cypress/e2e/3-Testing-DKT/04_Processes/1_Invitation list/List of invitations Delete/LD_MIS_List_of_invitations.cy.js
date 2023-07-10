describe('Test Suite - List of invitations with user: Sport leader and collaborator', () => {
  //In this case, there isn't store selection.

  require('cypress-xpath')

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    //cy.visit('https://qa-mex.decathlon.net/e2-mx-front/develop/map');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type("Z12DPERE")
    cy.get("#password").should("be.visible").type("UPH5A6")

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', () => {
      //cy.get('.el-input__wrapper').click()
      cy.wait(500)

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //Invitation list.
      cy.get('[href="/e2-mx-front/develop/mx/MX1610/invitations"] > .dropdown-item')
        .should("be.visible")
        .click()
      cy.wait(3500)

      //Invitation list. / Details
      cy.get(':nth-child(1) > .el-table_2_column_8 > .cell > .el-button--primary > span')
        .should("be.visible")
        .click()
      cy.wait(3500)

      //Return anterior page
      cy.go(-1);              //Return to previous screen
      cy.wait(2500)

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
      cy.wait(3500) */

      //Logout session
      cy.get('#currentUserUid > #navbarDropdown').should("be.visible").click()      //Click user code.
      cy.wait(1000)
      cy.get("#currentUserUid > div > a:nth-child(2) > div").should("be.visible")   // Logout session
        .click()
      cy.wait(1000)


      //agregar una condicion cuando no exista data.      

      cy.log('User Sport leader and collaborator (Centro MX1610)');


    });

  });

});  