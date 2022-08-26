import {InputCell} from "./Types/InputsTypes";
import {CellState} from "./Enums/States.js";

export class InputLine {
	private readonly lineLength: number = 0;
	private readonly lineCount: number = 0;
	private readonly elements: number[][] = [];

	constructor(
		private line: InputCell[],
		private maxSize: number = 5
	) {
		this.lineLength = this.line.length;
		this.lineCount = this.getCount();
		this.elements = this.getElements();
	}

	public check = (): boolean => this.getCount() <= this.maxSize;

	public getCount(): number {
		let totalUsed = 0;
		this.line.forEach(c => totalUsed += c);
		return Math.max(totalUsed + this.lineLength - 1, 0);
	}

	public getTotal(): number {
		let total = 0;
		this.line.forEach(l => total += l);
		return total;
	}

	public isFinishedLine = (objectif: number): boolean => objectif <= this.getCount();

	public getSequence(nbCells: number, value: CellState): CellState[] {
		const arr = [];
		for (let i = 0; i < nbCells; i++) arr.push(value);
		return arr;
	}

	public getPossibilities(): CellState[][] {
		let possibilities: CellState[][] = [];

		if (this.lineCount <= 0) {
			possibilities.push([]);
		} else if (this.lineCount === this.maxSize) {
			possibilities.push(this.getFullPossibilities());
		} else {
			possibilities = this.getLinePartialPossibilities();
		}

		return possibilities;
	}

	public getFullPossibilities(): CellState[] {
		const fullPossible = [];
		const {Empty, Filled} = CellState;
		if (this.lineLength === 1) {
			for (let i = 0; i < this.maxSize; i++) {
				fullPossible.push(Filled);
			}
		} else {
			this.line.forEach(cells => {
				for (let i = 0; i < cells; i++) {
					fullPossible.push(Filled);
				}
				if (fullPossible.length < this.maxSize) {
					fullPossible.push(Empty);
				}
			});
		}
		return fullPossible;
	}

	public getLinePartialPossibilities(): CellState[][] {
		const possibilities: CellState[][] = [];
		const emptyValues = this.maxSize - this.getTotal();
		const possiblesPositions = emptyValues + 1;

		for (let pos = 0; pos < possiblesPositions; pos++) {
			for (let nbEmpty = 0; nbEmpty < emptyValues; nbEmpty++) {
				const filledEls = InputLine.fillElements(this.elements, pos, this.getSequence(nbEmpty + 1, 0));
				let ln = InputLine.elementsToLine(filledEls);
				ln = this.fillEnd(ln);
				if (!this.hasPossibility(possibilities, ln) && ln.length === this.maxSize) possibilities.push(ln);
			}
		}

		return possibilities;
	}

	public getElements(): number[][] {
		const inputsElements: number[][] = [];
		this.line.forEach(val => {
			const element = [val];
			if (inputsElements.length < this.lineLength - 1) element.push(0);
			inputsElements.push(element);
		});

		return inputsElements;
	}

	public static fillElements(elements: number[][], indexPosition = -1, value: number[] = [0]): number[][] {
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

	public static elementsToLine(elements: number[][]): number[] {
		const line: number[] = [];
		elements.forEach(lineParts => lineParts.forEach(linePart => {
			const {Empty, Filled} = CellState;
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

	public hasPossibility(possibilities: CellState[][], currentLine: CellState[]): boolean {
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

	public fillEnd(line: number[]): number[] {
		while (line.length < this.maxSize) {
			line.push(0);
		}
		return line;
	}
}
