describe('Mi primera prueba en Cypress con Selenium', () => {
  it('navega a una URL y verifica el título de la página', () => {
    cy.visit('/');
    cy.title().should('eq', 'Título de la página');
  });
});