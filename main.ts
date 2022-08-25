import Resolver from "./src/Resolver.js";
import {Key} from "./maps/key.js";
import {CellState} from "./src/Enums/States.js";

const {Empty, Filled} = CellState;

const S = new Resolver(Key);
S.map.size = {width: 10, height: 10};

const input = [1, 2, 3];

const possibilities = S.getLinePossibilities(input);

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
