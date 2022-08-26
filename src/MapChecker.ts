import {InputsMap} from "./Types/InputsTypes";
import {LineType, LineTypeSizeName} from "./Enums/Lines.js";
import {SizeName} from "./Types/Globals";
import {InputLine} from "./InputLine";

export class MapChecker {

	static check(map: InputsMap): boolean {
		let possible = true;

		this.forEachLines(map, (l, _i, lineType) => {
			const line = new InputLine(l, this.getSize(map, lineType, 1));
			if (!line.check()) {
				possible = false;
			}
		});

		return possible;
	}

	static forEachLines(
		map: InputsMap,
		callback: (line: number[], index: number, lineType: LineType, lineSize: number) => void
	): void {
		[LineType.Col, LineType.Row].forEach(lineType => {
			map[`${lineType}s`].forEach((line, index) => {
				callback(line, index, lineType, this.getSize(map, lineType, 1));
			});
		});
	}

	static getSize(map: InputsMap, lineType: LineType, axis: 1 | 2): number {
		return map.size[this.getSizeName(lineType, axis)];
	}

	static getSizeName(lineType: LineType, axis: 1 | 2): SizeName {
		return LineTypeSizeName[lineType][axis];
	}
}
