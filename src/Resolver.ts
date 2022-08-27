import {InputReceived, InputsMap} from "./Types/InputsTypes";
import {ResolvedMap} from "./Types/Resolved";
import {CellState} from "./Enums/States.js";
import {MapChecker} from "./MapChecker.js";
import {InputLine} from "./InputLine.js";

export default class Resolver {

	public readonly map: ResolvedMap;
	private readonly inputs: InputReceived;

	constructor(public readonly oldMap: InputsMap) {
		this.map = {
			name: oldMap.name,
			size: oldMap.size,
			cols: [],
			rows: [],
		};
		this.inputs = {cols: oldMap.cols, rows: oldMap.rows};
		this.makeMap();
	}

	public resolve(): ResolvedMap {
		this.resolveLines();

		return this.map;
	}

	public resolveLines(): CellState[][] {
		MapChecker.forEachLines(this.oldMap, (line, index, lineType) => {
			const resolvedLine = new InputLine(line, MapChecker.getSize(this.map, lineType, 1)).resolve();
			resolvedLine.forEach((cell, index2) => {
				if (cell >= 0) {
					this.map[`${lineType}s`][index][index2] = cell;
				}
			});
		});

		return [];
	}

	private makeMap(): void {
		this.mapMapCols();
		this.mapMapRows();
	}

	private mapMapCols(): void {
		this.map.cols = [];
		for (let i = 0; i < this.map.size.width; i++) {
			const col: CellState[] = [];
			for (let j = 0; j < this.map.size.height; j++) col.push(CellState.Undefined);
			this.map.cols.push(col);
		}
	}

	private mapMapRows(): void {
		this.map.rows = [];
		for (let i = 0; i < this.map.size.height; i++) {
			const row: CellState[] = [];
			for (let j = 0; j < this.map.size.width; j++) row.push(CellState.Undefined);
			this.map.rows.push(row);
		}
	}
}
