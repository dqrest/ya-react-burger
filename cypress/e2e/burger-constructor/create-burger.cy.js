import { host, burgerConstructorTitle } from '../test-params';
import { ORDER_BUTTON_ID, ORDER_BUTTON_TITLE } from '../test-params';

import { BUN_TITLE_ID, BUN_TITLE, SAUCES_TITLE_ID, SAUCES_TITLE, MAINS_TITLE_ID, MAINS_TITLE } from '../test-params';
import { bun1, bun2, main1, main2, sauce1, sauce2 } from '../test-params';


const ingredientClick = (ingredient) => {

    cy.get(`[data-testid="${ingredient?.dataTestId}"]`).as('ingredient');
    cy.get('@ingredient').scrollIntoView({ behavior: 'smooth', duration: 500 }).should('contain', ingredient?.name);
    cy.get('@ingredient').click();
    cy.wait(2000);

    cy.get('body').trigger('keydown', { code: 'Escape' });
    cy.wait(2000);
}

export const tabNavigation = (ingredientsTitleTestId, ingredientsTitle) => {
    cy.get(`[data-testid="${ingredientsTitleTestId}"]`).as('ingredientsTitle');
    cy.get('@ingredientsTitle').scrollIntoView({ behavior: 'smooth', duration: 2000 }).should('contain', ingredientsTitle);
    cy.wait(500);
}

const dragAndDropIngredient = (ingredient) => {

    const dataTransfer = new DataTransfer();
    cy.get(`[data-testid="${ingredient?.dataTestId}"]`).as('ingredient');
    cy.get('@ingredient').trigger("dragstart", { dataTransfer });
    cy.get(`[data-testid="${'burgerConstructor'}"]`).trigger("drop", { dataTransfer }).click({ force: true });
    cy.wait(350);
}

const orderButtonClick = () => {    
    cy.get(`[data-testid="${ORDER_BUTTON_ID}"]`).as(ORDER_BUTTON_ID);
    cy.get(`@${ORDER_BUTTON_ID}`).should('contain', ORDER_BUTTON_TITLE);
    cy.get(`@${ORDER_BUTTON_ID}`).click();
}


describe('tab navigation is available', () => {

    beforeEach(() => {
        cy.visit(host);
        cy.viewport(1280, 800);
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
        ingredientClick(bun1);
        ingredientClick(bun2); 

        dragAndDropIngredient(bun1);
        dragAndDropIngredient(bun2);
        dragAndDropIngredient(sauce1);
        dragAndDropIngredient(sauce2);
        dragAndDropIngredient(main1);
        dragAndDropIngredient(main2);

        orderButtonClick();

        cy.contains('Войти').then(($el) => {
            if ($el.length) {
                cy.get(`[data-testid="${'emailLoginInput'}"]`).type('snakbag@mail.ru');
                cy.get(`[data-testid="${'passwordLoginInput'}"]`).type('123qwe');
                cy.get(`[data-testid="${'loginButton'}"]`).should('contain', 'Войти').click();

                orderButtonClick();
            }
        });
    });
});