import Resolver from "./src/Resolver.js";
import {Key} from "./maps/key.js";
import {CellState} from "./src/Enums/States.js";

const {Empty, Filled} = CellState;

const S = new Resolver(Key);
S.map.size = {width: 3, height: 3};

const possibilities = S.getLinePossibilities([2]);

console.log("\n\nResult:");
console.log(...possibilities);

console.log("\n\nObjectif:");
console.log(...[
	[Filled, Empty, Empty],
	[Empty, Filled, Empty],
	[Empty, Empty, Filled]
]);
