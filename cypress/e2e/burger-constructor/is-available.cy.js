import { host, burgerConstructorTitle } from '../test-params';



describe(`service: ${host} is available`, function () {
    it(`should be available on ${host}`, function () {
        cy.visit(host);

        cy.get('[data-testid="burgerContructorTitle"]').as('burgerTitle');
        cy.get('@burgerTitle').should('contain', burgerConstructorTitle);
    });   
});