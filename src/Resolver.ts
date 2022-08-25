import {InputsLine, InputsMap} from "./Types/InputsTypes";
import {MapChecker} from "./MapChecker.js";
import {CellState} from "./Enums/States.js";
import {LineType} from "./Enums/Lines.js";

const {Empty, Filled} = CellState;

export default class Resolver {

	constructor(
		public map: InputsMap
	) {
		console.count("-> Initialisation du resolver");
	}

	getLinePossibilities(line: InputsLine, lineType: LineType = LineType.Col): CellState[][] {
		const lineCount = MapChecker.getLineCount(line),
			maxSize = MapChecker.getSize(this.map, lineType, 1);
		let possibilities: CellState[][] = [];

		if (lineCount <= 0) {
			possibilities.push([]);
		} else if (lineCount === maxSize) {
			possibilities.push(this.getLineFullPossibilities(line, maxSize));
		} else {
			possibilities = Resolver.getLinePartialPossibilities(line, lineCount, maxSize);
		}

		return possibilities;
	}

	private getLineFullPossibilities(line: InputsLine, maxSize: number): CellState[] {
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
		return fullPossible;
	}

	private static getLinePartialPossibilities(line: InputsLine, lineCount: number, maxSize: number): CellState[][] {
		const possibilities: CellState[][] = [];
		const emptyValues = maxSize - MapChecker.getLineTotal(line);
		// const possiblesPositions = Math.ceil(maxSize / lineCount);
		const possiblesPositions = emptyValues + 1;

		for (let tr = 0; tr < possiblesPositions; tr++) {
			const possibilityLine = [...line];
			const val = possibilityLine.shift();
			const possibleLine: CellState[] = [];
			if (val) {
				const seq = Resolver.getSequence(val, Filled);
				if (this.isFinishedLine([...possibleLine, ...seq], lineCount)) {
					const currentLine = this.finishLine([...possibleLine, ...seq], lineCount, maxSize);
					if (!this.hasPossibility(possibilities, currentLine)) {
						possibilities.push(currentLine);
					}
				} else {
					console.log("C'est pas fini");
				}
			}
		}

		console.log("Base line:", line);
		if (possibilities.length <= 0) console.log([]);
		else console.log(...possibilities);


		return possibilities;
	}

	private static getSequence(nbCells: number, value: CellState): CellState[] {
		const arr = [];
		for (let i = 0; i < nbCells; i++) arr.push(value);
		return arr;
	}

	private static finishLine(line: CellState[], lineCount: number, maxSize: number): CellState[] {
		if (this.isFinishedLine(line, lineCount)) {
			if (line.length < maxSize) {
				line = [...line, ...Resolver.getSequence(maxSize - line.length, Empty)];
			}
		}
		return line;
	}

	static isFinishedLine = (line: CellState[], lineCount: number): boolean => lineCount <= MapChecker.getLineCount(line);

	private static hasPossibility(possibilities: CellState[][], currentLine: CellState[]): boolean {
		let has = false;
		possibilities.forEach(pos => {
			let allSame = true;
			for (let i = 0; i < pos.length; i++) {
				if (pos[i] !== currentLine[i]) {
					allSame = false;
				}
			}
			if (allSame) has = true;
		});
		return has;
	}

	getLineElements(line: InputsLine): InputsLine[] {
		const inputsElements: InputsLine[] = [];
		line.forEach(el => {
			const element = [el];
			if (inputsElements.length < line.length - 1) {
				element.push(0);
			}
			inputsElements.push(element);
		});

		return inputsElements;
	}

	fillElements(elements: number[][], indexPosition = -1, value: number[] = [0]): number[][] {
		const returnedElements: number[][] = [];
		let inserted = false;
		elements.forEach((el, i) => {
			if (i === indexPosition) {
				returnedElements.push(value);
				inserted = true;
			}
			returnedElements.push(el);
		});
		if (!inserted) returnedElements.push(value);
		return returnedElements;
	}

	elementsToLine(elements: number[][]): InputsLine {
		const line: InputsLine = [];
		elements.forEach(lineParts => lineParts.forEach(linePart => {
			if (linePart === 0) {
				line.push(Empty);
			} else {
				for (let i = 0; i < linePart; i++) {
					line.push(Filled);
				}
			}
		}));
		return line;
	}
}
