describe('Test Suite - Check RFCs with user: RS (Store Manager), Store Organizer and Coach leader', () => {
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
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    //cy.visit('https://qa-mex.decathlon.net/e2-mx-front/develop/map');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_LT)
    cy.get("#password").should("be.visible").type(loginData.Users.password_6)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      //cy.get('.el-input__wrapper').click()
      cy.wait(500)

      //Processes
      cy.get('.me-auto > :nth-child(2) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)

      //Invitation list
      cy.get('[href="/e2-mx-front/develop/mx/MX1610/invitations"] > .dropdown-item')
        .should("be.visible")
        .click()
      cy.wait(3500)

      //Sort by shipping date. / ascending
      cy.get('.el-table_2_column_4 > .cell > .caret-wrapper > .ascending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by shipping date. / descending
      cy.get('.el-table_2_column_4 > .cell > .caret-wrapper > .descending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by create. / ascending
      cy.get('.el-table_2_column_5 > .cell > .caret-wrapper > .ascending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by create. / descending
      cy.get('.el-table_2_column_5 > .cell > .caret-wrapper > .descending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by identity access. / ascending
      cy.get('.el-table_2_column_6 > .cell > .caret-wrapper > .ascending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by identity access. / descending
      cy.get('.el-table_2_column_6 > .cell > .caret-wrapper > .descending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by RFC. / descending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .ascending')
        .should("be.visible").click()
      cy.wait(3000)

      //Sort by RFC. / descending
      cy.get('.el-table_2_column_7 > .cell > .caret-wrapper > .descending')
        .should("be.visible").click()
      cy.wait(3000)

      // Sort by details
      cy.get('.el-button--primary > span')
        .should("be.visible").click()
      cy.wait(3000)

      // Retroceder una página
      cy.go(-1);

      //Logout session
      cy.get('#currentUserUid > #navbarDropdown').should("be.visible").click()      //Click user code.
      cy.wait(2000)
      cy.get("#currentUserUid > div > a:nth-child(2) > div").should("be.visible")   // Logout session
        .click()
      cy.wait(2000)

      cy.log('Check RFCs with user: RS (Store Manager), Store Organizer and Coach leader (Centro MX1610)');


    });

  });

});  