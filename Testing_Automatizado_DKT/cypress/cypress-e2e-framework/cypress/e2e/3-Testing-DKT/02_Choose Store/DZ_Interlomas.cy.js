
describe('Test Suite - Choose store with user: DZ (Zone Director)', () => {

  require('cypress-xpath')

  before(function () {
    cy.fixture('new_users_1').then(function (data) {
      globalThis.data = data
    })

  })

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    //cy.visit('https://qa-mex.decathlon.net/e2-mx-front/develop/map');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(data.Users.username_DZ)
    cy.get("#password").should("be.visible").type(data.Users.password_1)

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', () => {
      cy.get('.el-input__wrapper').click()
      cy.wait(1000)

      //Choose Interlomas MX1982 Store
      //To modify this search option, just change the number.
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      cy.wait(1000)

      //Logout session
      cy.get('#userUid > #navbarDropdown').should("be.visible").click()           //Click user code.
      cy.wait(2000)
      cy.get('#userUid > .dropdown-menu > .routerLink > .dropdown-item').click()  // Logout session
      cy.log('User Zone Manager looking for interlomas store (Centro MX1982)');

      //Se deja para e2e
      //To filter with any dates.
      //cy.get('#base-skeleton-list_firstRow_sWQTn').should("be.visible")
      //cy.wait(1000)
      //cy.get('tbody > :nth-child(10) > .el-table_2_column_7 > .cell > span').click() // Click on name of detail
      //cy.wait(500)
      //cy.get('.el-button--default > span').should("be.visible").click()  //Click on Process Details
      //cy.wait(5000)
      //cy.go(-1);              //Return to previous screen
      //cy.scrollTo('top');     // Desplazarse a la parte superior de la página
      //cy.get(".el-input__inner").type("Jorge")
      //cy.wait(500)


    });

  });

}); 