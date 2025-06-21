import { API_GET_INGREDIENTS, API_LOGIN, API_ORDERS } from '../../src/components/utils/endpoints';
describe('Тест конструктора бургеров', () => {
	const email = "test@test.com";
	const password = "password123";

	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.intercept("POST", API_LOGIN, { fixture: "login.json" }).as("login");
		cy.intercept("POST", API_ORDERS, { fixture: "order.json" }).as("order");
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

		cy.get('[data-testid="order-btn"]').as('orderBtn')

		cy.get('@orderBtn').click();

		cy.get('[data-testid="login-form"]').should('be.visible');

		cy.get('[data-testid="email-input"]').type(`${email}`);
		cy.get('[data-testid="password-input"]').type(`${password}`);
		cy.get('[data-testid="login-submit-btn"]').click();

		cy.wait('@login').its('response').should('not.be.empty');

		cy.contains('Булки').then(($tab) => {
			if (!$tab.parent().hasClass('tab_type_current')) {
				cy.wrap($tab).click();
			}
		})
		cy.get(`[data-testid="ingredient-${bunId}"]`).trigger('dragstart');
		cy.get('[data-testid="constructor-area"]').trigger('drop');

		cy.contains('Начинки').click();
		cy.get(`[data-testid="ingredient-${fillingId}"]`)
			.scrollIntoView()
			.trigger('dragstart');
		cy.get('[data-testid="constructor-area"]').trigger('drop');

		cy.get('@orderBtn').click();

		cy.get('[data-testid="order-modal"]', { timeout: 15000 })
			.should('be.visible')
			.within(() => {
				cy.contains('идентификатор заказа').should('exist');
			});

		cy.get('[data-testid="close-button"]').should('be.visible').click();
		cy.get('[data-testid="order-modal"]').should('not.exist')
	});
})