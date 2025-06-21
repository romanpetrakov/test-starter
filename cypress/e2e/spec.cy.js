import { API_GET_INGREDIENTS } from '../../src/components/utils/endpoints';
describe('Тест конструктора бургеров', () => {
	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.intercept('GET', API_GET_INGREDIENTS, { fixture: 'ingredients.json' }).as('getIngredients');
		cy.visit('/');

		cy.wait('@getIngredients').its('response.body.data').should('not.be.empty');
	});

	it('Drag and Drop булки и начинки', () => {
		cy.contains('Булки').then(($tab) => {
			if ($tab.css('pointer-events') === 'none') {
				cy.log('Вкладка "Булки" уже активна, пропускаем клик');
			} else {
				cy.wrap($tab).click();
			}
		});

		cy.get('[data-testid="constructor-area"]').as('area')

		const bunId = '643d69a5c3f7b9001cfa093c';
		cy.get(`[data-testid="ingredient-${bunId}"]`).as('bun').trigger('dragstart')
		cy.get('@area').trigger('drop')

		cy.get('[data-testid="constructor-bun-top"]').should('exist');
		cy.get('[data-testid="constructor-bun-bottom"]').should('exist');

		cy.get('@bun').find('[data-testid="ingredient-counter"]')
			.should('contain', '2');



		cy.contains('Начинки').then(($tab) => {
			if ($tab.css('pointer-events') === 'none') {
				cy.log('Вкладка "Начинки" уже активна, пропускаем клик');
			} else {
				cy.wrap($tab).click();
			}
		});

		const fillingId = '643d69a5c3f7b9001cfa0940';
		cy.get(`[data-testid="ingredient-${fillingId}"]`)
			.as('filling')
			.scrollIntoView()
			.should('be.visible');

		cy.get('@filling').trigger('dragstart');

		cy.get('@area').trigger('dragover').trigger('drop');

		cy.get(`[data-testid="constructor-item-${fillingId}"]`).should('exist');

		cy.get('@filling')
			.find('[data-testid="ingredient-counter"]')
			.should('contain', '1');

		cy.get(`[data-testid="order-sum"]`).should('exist')
			.should('contain', '5510');

	});

	it('Открытие модалки ингредиента', () => {
		cy.contains('Булки').then(($tab) => {
			if ($tab.css('pointer-events') === 'none') {
				cy.log('Вкладка "Булки" уже активна, пропускаем клик');
			} else {
				cy.wrap($tab).click();
			}
		});

		const bunId = '643d69a5c3f7b9001cfa093c';
		cy.get(`[data-testid="ingredient-${bunId}"]`).as('bun').click();

		cy.get('[data-testid="ingredient-details-modal"]').should('be.visible');
		cy.contains('Детали ингредиента').should('exist');
		cy.contains('Краторная булка N-200i').should('exist');

		cy.get('[data-testid="close-button"]').should('be.visible').click();

		cy.get('[data-testid="ingredient-details-modal"]', { timeout: 1000 })
			.should('not.exist');
	});
})