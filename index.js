const hasAddIns = {
	sparkles: false,
	fluorescents: false,
	glowInTheDark: false
};

const dimensions = {
	firstHalfWidth: 0,
	firstHalfDepth: 0,
	secondHalfWidth: 0,
	secondHalfDepth: 0,
	stemWallLength: 0
};

const flakePrices = {
	sixteenthFlake: 4.75,
	fourthFlake: 4.5,
	halfFlake: 4.5,
	variableFlake: 4.9
};

const addInPrices = {
	sparkles: 0.25,
	fluorescents: 0.05,
	glowInTheDark: 0.4
};

let selectedFlake;

const button = document.getElementById('submit');
const tenPercentBelow = document.getElementById('tenPercentBelow');
const tenPercentAbove = document.getElementById('tenPercentAbove');
const dash = document.getElementById('dash');
const sixteenthFlake = document.getElementById('sixteenthFlake');
const handleSubmit = (e) => {
	console.log('submit fired', sixteenthFlake.checkValidity());
	// e.preventDefault();
	sixteenthFlake.checkValidity();
	calculate();
};
button.addEventListener('click', () => handleSubmit());
console.log(button);
const calculate = () => {
	console.log('submit fired');
	const sparkle = hasAddIns.sparkles ? addInPrices.sparkles : 0;
	const fluorescents = hasAddIns.fluorescents ? addInPrices.fluorescents : 0;
	const glowInTheDark = hasAddIns.glowInTheDark ? addInPrices.glowInTheDark : 0;

	const { firstHalfWidth, firstHalfDepth, secondHalfWidth, secondHalfDepth, stemWallLength } =
		dimensions;

	//dimensions
	const firstHalfDimensions = firstHalfWidth * firstHalfDepth;
	const secondHalfDimensions = secondHalfWidth * secondHalfDepth;
	const tax = 1.025;

	//costs
	const flakePrice = flakePrices[selectedFlake];
	const addInCost = sparkle + fluorescents + glowInTheDark;

	// calculation variables
	const dimensionTotal = firstHalfDimensions + secondHalfDimensions;
	const totalBaseCost = (flakePrice + addInCost) * tax;
	const stemWallCost = stemWallLength * (flakePrice + addInCost);
	const total = dimensionTotal * totalBaseCost + stemWallCost;
	const tenPercentBelowCost = Math.ceil((total * 0.9) / 10) * 10;
	const tenPercentAboveCost = Math.ceil((total * 1.1) / 10) * 10;

	console.log(tenPercentBelowCost, tenPercentAboveCost);

	// display
	tenPercentBelow.innerHTML = `$${tenPercentBelowCost.toFixed(0)}`;
	tenPercentAbove.innerHTML = `$${tenPercentAboveCost.toFixed(0)}`;
	dash.innerHTML = '-';

	console.log({ dimensionTotal, totalBaseCost, stemWallCost, total });
};

const handleFlakeChange = (input) => {
	selectedFlake = input;
};

const handleAddInsChange = (input) => {
	const inputEl = document.getElementById(input);
	hasAddIns[inputEl.id] = inputEl.checked;
};

const handleDimensionChange = (input) => {
	const inputEl = document.getElementById(input);
	inputEl.value = inputEl.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	dimensions[inputEl.id] = parseInt(inputEl.value) || 0;
};
