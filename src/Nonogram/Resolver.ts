import {Nonogram} from "./Nonogram";
import {LINE_TYPE, STATE} from "./Enums";
import {InputCell} from "./Types";
import {getAxisName, getSequenceSum} from "./Tools";

export class Resolver {

	constructor(
		private Nonogram: Nonogram
	) {
		console.count("=============[ Start Resolve");
		this.checkSimples();
	}

	public setLine = (lineType: LINE_TYPE, nb: number, state: STATE | STATE[]): void => this.Nonogram.getLine(lineType, nb)
		.forEach((l, i) =>
			this.Nonogram.setCell(l.position.x, l.position.y, Array.isArray(state) ? (state[i] ?? STATE.NULL) : state));

	private checkSimples(): void {
		[LINE_TYPE.COL, LINE_TYPE.ROW].forEach(lineType => {
			const lines: InputCell[][] = this.Nonogram.getInputsLines(lineType);
			lines.forEach((line, i) => {
				const maxSize = this.Nonogram.size[getAxisName(lineType, 1)];
				const seqSum = getSequenceSum(line);
				if (seqSum === 0 || seqSum === maxSize) this.resolveSimpleLine(lineType, line, i, seqSum, maxSize);
			});
		});
	}

	private resolveSimpleLine(lineType: LINE_TYPE, line: InputCell[], i: number, seqSum: number, maxSize: number) {
		if (seqSum === 0) {
			// ---------------------------------------------- Empty line
			this.setLine(lineType, i, STATE.EMPTY);
		} else if (line.length === 1 && line[0] === maxSize) {
			// ---------------------------------------------- Full line
			this.setLine(lineType, i, STATE.FILLED);
		} else if (seqSum === maxSize) {
			// ---------------------------------------------- FullMultiple line
			this.setLine(lineType, i, this.getFullMultipleSequence(line));
		} else {
			// ---------------------------------------------- Partial line
		}
	}

	private getFullMultipleSequence(line: InputCell[]): STATE[] {
		const states: STATE[] = [];
		line.forEach(c => {
			if (states.length > 0) {
				states.push(STATE.EMPTY);
			}

			for (let j = 0; j < c; j++) states.push(STATE.FILLED);
		});
		return states;
	}
}
