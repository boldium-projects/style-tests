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
module.exports = {isPxInteger, parsePxInt}