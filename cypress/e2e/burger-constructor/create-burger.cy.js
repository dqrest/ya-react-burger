import { host, burgerConstructorTitle } from '../test-params';
//import { tabNavigation } from './tab-navigation';

import { BUN_TITLE_ID, BUN_TITLE, SAUCES_TITLE_ID, SAUCES_TITLE, MAINS_TITLE_ID, MAINS_TITLE } from '../test-params';
import { BUN_INGREDIENT_1, BUN_INGREDIENT_2, SAUCE_INGREDIENT_1, SAUCE_INGREDIENT_2, MAIN_INGREDIENT_1, MAIN_INGREDIENT_2 } from '../test-params';
import { bun1, bun2, main1, main2, sauce1, sauce2 } from '../test-params';


const ingredientClick = (ingredient) => {

    cy.get(`[data-testid="${ingredient?.dataTestId}"]`).as('ingredient');
    cy.get('@ingredient').scrollIntoView({ behavior: 'smooth', duration: 500 }).should('contain', ingredient?.name);
    cy.get('@ingredient').click();
    cy.wait(2000);

    cy.get('body').trigger('keydown', { code: 'Escape'});
    cy.wait(2000);
}

export const tabNavigation = (ingredientsTitleTestId, ingredientsTitle) => {
    cy.get(`[data-testid="${ingredientsTitleTestId}"]`).as('ingredientsTitle');
    cy.get('@ingredientsTitle').scrollIntoView({ behavior: 'smooth', duration: 2000 }).should('contain', ingredientsTitle);
    cy.wait(500);
}


describe('tab navigation is available', () => {
    beforeEach(() => {
        cy.visit(host);
    });

    it('test ', () => {

        cy.get('[data-testid="burgerContructorTitle"]').as('burgerTitle');
        cy.get('@burgerTitle').should('contain', burgerConstructorTitle);

        tabNavigation(SAUCES_TITLE_ID, SAUCES_TITLE);
        ingredientClick(sauce1);
        ingredientClick(sauce2);        

        tabNavigation(MAINS_TITLE_ID, MAINS_TITLE);
        ingredientClick(main1);
        ingredientClick(main2);       

        tabNavigation(BUN_TITLE_ID, BUN_TITLE);
        ingredientClick(bun1)
        ingredientClick(bun2)        
    });
});