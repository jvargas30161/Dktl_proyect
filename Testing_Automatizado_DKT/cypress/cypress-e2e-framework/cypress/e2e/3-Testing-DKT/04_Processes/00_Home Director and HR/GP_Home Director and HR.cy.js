
describe('Test Suite - Home Director and HR with user: GP (Personnel Manager)', () => {

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
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_GP)
    cy.get("#password").should("be.visible").type(loginData.Users.password_2)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.viewport(1680, 950)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      cy.get('.el-input__wrapper').click()
      cy.clearCookies()
      cy.wait(500)

      //Choose Polanco Store
      cy.get(':nth-child(4) > span').should("be.visible").click()
      cy.wait(4000)

      /* //Boton de información.    No funciona
      cy.get('[data-left="92.90908813476562"]')
        .should("be.visible").click({ force: true })
        .wait(3000) */

      //Filter with any dates.  No funciona
      /* cy.get('#el-id-2022-5')
        .should("be.visible")
        .type("Cristina")
      cy.wait(3000) */

      //Explaind
      cy.get(':nth-child(1) > .el-table_2_column_4 > .cell > .el-table__expand-icon')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Process details.
      cy.get('.process-buttons-bar_buttonBar_CpXw_ > .el-button--default')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      // Desplazarse hacia abajo lentamente
      /* cy.window().scrollTo('#app', { duration: 2000 }).trigger('scroll');
      cy.wait(5000); */

      // Desplazarse hacia arriba lentamente
      /* cy.window().scrollTo('top', { duration: 2000 }).trigger('scroll'); */

      //Return to previous screen
      cy.go(-1);              //Return to previous screen

      //Create (ascending)
      cy.get('.el-table_4_column_17 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Create (descending)
      cy.get('.el-table_4_column_17 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Name (ascending)
      cy.get('.el-table_4_column_18 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Name (descending)
      cy.get('.el-table_4_column_18 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Contracts nearing completion

      // Filter doesn`t work 

      //Create (ascending)
      cy.get('.el-table_3_column_12 > .cell > .caret-wrapper > .ascending')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Create (descending)
      cy.get('.el-table_3_column_12 > .cell > .caret-wrapper > .descending')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Teams
      cy.get('thead > tr > .el-table_3_column_13 > .cell')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Visible team... 
      cy.get("#app > div > div > div:nth-child(2) > div > div.el-table--fit.el-table--striped.el-table--enable-row-hover.el-table--enable-row-transition.el-table.el-table--layout-fixed.collaborator-list_collaboratorTable_aWTz7.is-scrolling-none > div.el-table__inner-wrapper > div.el-table__header-wrapper > table > thead > tr > th.el-table_3_column_13.is-leaf.el-table__cell > div > span > i > svg")
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Not visble team...
      cy.get("#app > div > div > div:nth-child(2) > div > div.el-table--fit.el-table--striped.el-table--enable-row-hover.el-table--enable-row-transition.el-table.el-table--layout-fixed.collaborator-list_collaboratorTable_aWTz7.is-scrolling-none > div.el-table__inner-wrapper > div.el-table__header-wrapper > table > thead > tr > th.el-table_3_column_13.is-leaf.el-table__cell > div > span > i > svg")
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Detail by name - Summary
      cy.get('tbody > :nth-child(1) > .el-table_3_column_12 > .cell')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Personal information
      cy.get('#tab-personalData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - address data
      cy.get('#tab-addressData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Tax data
      cy.get('#tab-fiscalData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Bank data
      cy.get('#tab-bankData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Labor data
      cy.get('#tab-laborData')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //contracts
      cy.get('#tab-5')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Explaind contract
      cy.get('.el-table__expand-icon')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Document
      cy.get('.text-decoration-none > .el-button > span')
        .should("be.visible")
        .click({ force: true })
        .wait(6000)

      //Return anterior page
      cy.go(-1);              //Return to previous screen

      //Edit
      cy.get('.collaborator-info_links_bSJ8_ > :nth-child(1) > .el-link__inner > u')
        .should("be.visible")
        .click({ force: true })
        .wait(6000)

      cy.get('h3').should('be.visible').invoke('text')
        .should('eq', 'Edición de colaborador/a');

      //Detail by name - Summary - Personal information
      cy.get('#tab-personalData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - address data
      cy.get('#tab-addressData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Tax data
      cy.get('#tab-fiscalData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Bank data
      cy.get('#tab-bankData')
        .should("be.visible")
        .click({ force: true })
        .wait(3000)

      //Detail by name - Summary - Labor data
      cy.get('#tab-laborData')
        .should("be.visible")
        .click({ force: true })
        .wait(5000)

      //Return anterior page
      cy.go(-1);              //Return to previous screen

      //Actions
      //cy.get('.collaborator-info_links_bSJ8_ > .el-tooltip__trigger > .el-link__inner > u')


      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(1000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').should("be.visible").click() // Logout session
      cy.wait(1000)

      cy.log('User GP (Personnel Manager) Home Director and HR (Centro MX1610)');


    })

  });

});  