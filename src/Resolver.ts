import {InputsLine, InputsMap} from "./Types/InputsTypes";
import {MapChecker} from "./MapChecker.js";
import {CellState} from "./Enums/States.js";
import {LineType} from "./Enums/Lines.js";

export default class Resolver {

	constructor(
		public map: InputsMap
	) {
		console.log("Bonjour le monde");
	}

	getPossibilities(line: InputsLine, lineType: LineType = LineType.Col): CellState[][] {
		const lineCount = MapChecker.getLineCount(line),
			maxSize = this.map.size[MapChecker.getSizeName(lineType, 1)],
			possibilities: CellState[][] = [];

		if (lineCount <= 0) {
			possibilities.push([]);
		} else if (lineCount === maxSize) {
			const fullPossible = [];
			if (line.length === 1) {
				for (let i = 0; i < maxSize; i++) {
					fullPossible.push(CellState.Filled);
				}
			} else {
				line.forEach(cells => {
					for (let i = 0; i < cells; i++) {
						fullPossible.push(CellState.Filled);
					}
					if (fullPossible.length < maxSize) {
						fullPossible.push(CellState.Empty);
					}
				});
			}
			possibilities.push(fullPossible);
		}

		return possibilities;
	}
}
