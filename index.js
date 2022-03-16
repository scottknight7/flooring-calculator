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

const calculate = () => {
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

	console.log({ dimensionTotal, totalBaseCost, stemWallCost, total });
};

const handleFlakeChange = (input) => {
	selectedFlake = input;
	calculate();
};

const handleAddInsChange = (input) => {
	const inputEl = document.getElementById(input);
	hasAddIns[inputEl.id] = inputEl.checked;
	calculate();
};

const handleDimensionChange = (input) => {
	const inputEl = document.getElementById(input);
	inputEl.value = inputEl.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	dimensions[inputEl.id] = parseInt(inputEl.value) || 0;
	calculate();
};

// console.log(radioButtons);
