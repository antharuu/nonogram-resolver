import {CellState} from "./src/Enums/States.js";
import {InputLine} from "./src/InputLine.js";

const {Empty, Filled} = CellState;

const line = new InputLine(["1", 0, 2], 5);

const possibilities = line.getPossibilities();

console.log("\n\nInput:");
console.log(line.getLine());

console.log("\n\nResult:");
console.log(...possibilities);

console.log("\n\nObjectif:");
console.log(...[
	[Empty, Filled, Empty, Filled, Filled],
	[Filled, Empty, Filled, Filled, Empty],
]);
