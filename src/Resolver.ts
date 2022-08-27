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
	}

	public resolve(): ResolvedMap {
		this.resolveLines();

		return this.map;
	}

	public resolveLines(): CellState[][] {
		MapChecker.forEachLines(this.oldMap, (line, index, lineType) => {
			const resolvedLine = new InputLine(line, MapChecker.getSize(this.map, lineType, 1)).resolve();
		});

		return [];
	}
}
