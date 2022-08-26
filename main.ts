import {CellState} from "./src/Enums/States.js";
import {InputLine} from "./src/InputLine.js";

const {Empty, Filled} = CellState;

const input = [1, 2];

const possibilities = (new InputLine(input, 5)).getPossibilities();

console.log("\n\nInput:");
console.log(input);

console.log("\n\nResult:");
console.log(...possibilities);

console.log("\n\nObjectif:");
console.log(...[
	[Empty, Filled, Empty, Filled, Filled],
	[Filled, Empty, Empty, Filled, Filled],
	[Filled, Empty, Filled, Filled, Empty],
]);
