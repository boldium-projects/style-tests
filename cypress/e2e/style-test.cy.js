const {parsePxInt} = require('../../modules/pixels');

const testsLocation = process.env.TESTS_LOCATION || 'style.tests.json'
const STYLETESTS = require('../../'+ testsLocation);
STYLETESTS.tests.forEach(test => {
	describe(test.name, () => {
		it(test.name + ' passes', () => {
			if (test.viewport) {
				// https://docs.cypress.io/api/commands/viewport
				const viewportIsString = typeof test.viewport === 'string';
				if (viewportIsString) {
					cy.viewport(test.viewport);
				} else if (Array.isArray(test.viewport) && test.viewport.length === 2) {
					cy.viewport(test.viewport[0], test.viewport[1]);
				}
			}
			cy.visit(test.url)
			test.styles.forEach(styleSet => {
				if (styleSet.selector) {
					const elementToTest = cy.get(styleSet.selector).first();
					styleSet.rules.forEach(rule => {
						const attribute = rule.property;
						const value = rule.value;
						const valueInt = parsePxInt(value);
						// if a number is over 60px (magic number that seems big enough), 
						// we won't care about fractional pixels
						// for example, if the test valueInt is 72.2px
						// we just want to make sure it's between 72px and 73px
						const shouldRoundFractionalPixels = valueInt && valueInt > 60;
						if (shouldRoundFractionalPixels) {
							const least = Math.floor(valueInt);
							const most = Math.floor((valueInt + 1));
							elementToTest.invoke(attribute).should('be.least', least).and('be.most', most);
						} else {
							elementToTest.should('have.css', attribute, value)
						}
					})
				}
			})
		})
	})
});