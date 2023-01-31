/**
 * Determines if string is a number of pixels or not.
 * This is used to figure out if a string is a CSS pixel value.
 * @param {string} str string to check
 * @returns {boolean} true if a pixel value, false if not
 * @example console.log( getNumberFromPx('80px') ) // logs true
 */
const isPxInteger = (str) => {
	const hasPxAtEnd = str.slice(-2).toLowerCase() === 'px';
	const isNumber = parseFloat(str.slice(0, -2)).toString() === str.slice(0, -2);
	return hasPxAtEnd && isNumber;
}
/**
 * Converts integer from a string that ends in px.
 * This is used to parse CSS pixel values.
 * @param {string} str string to convert to an integer
 * @returns {(number|false)} the number from a string that ends in px, otherwise false
 * @example console.log( getNumberFromPx('80px') ) // logs 80
 */
const parsePxInt = (str) => {
	if (isPxInteger(str)) {
		const strAsInt = parseInt(str.slice(0, -2));
		return strAsInt;
	}
	return false
}
const testsLocation = process.env.TESTS_LOCATION || 'style.tests'
const URLTESTS = require('../../'+ testsLocation);
URLTESTS.forEach(test => {
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
					for (const attribute in styleSet.rules) {
						const value = styleSet.rules[attribute];
						const valueInt = parsePxInt(value);
						// if a number is over 60px (magic number that seems big enough), 
						// we won't care about fractional pixels
						// for example, if the test valueInt is 72.2px
						// we just want to make sure it's between 72px and 73px
						const shouldRoundFranctionalPixels = valueInt && valueInt > 60;
						if (shouldRoundFranctionalPixels) {
							const least = Math.floor(valueInt);
							const most = Math.floor((valueInt + 1));
							elementToTest.invoke(attribute).should('be.least', least).and('be.most', most);
						} else {
							elementToTest.should('have.css', attribute, value)
						}
					}
				}
			})
		})
	})
});