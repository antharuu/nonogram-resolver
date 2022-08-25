import {InputsLine, InputsMap} from "./Types/InputsTypes";
import {LineType, LineTypeSizeName} from "./Enums/Lines";
import {SizeName} from "./Types/Globals";

export class MapChecker {

	public static checkLine(line: InputsLine, max: number): boolean {

		return this.getLineCount(line) <= max;
	}

	private static getLineCount(line: InputsLine) {
		let totalUsed = 0;
		line.forEach(c => totalUsed += c);
		return Math.max(totalUsed + line.length - 1, 0);
	}

	static check(map: InputsMap) {
		let possible = true;

		this.forEachLines(map, (line, _index, _lineType, _lineSize) => {
			if (!this.checkLine(line, 5)) {
				possible = false;
			}
		});

		return possible;
	}

	private static forEachLines(map: InputsMap, callback: (line: InputsLine, index: number, lineType: LineType, lineSize: number) => void) {
		[LineType.Col, LineType.Row].forEach(lineType => {
			map[`${lineType}s`].forEach((line, index) => {
				callback(line, index, lineType, this.getSize(map, lineType, 1));
			});
		});
	}

	private static getSize(map: InputsMap, lineType: LineType, axis: 1 | 2): number {
		return map.size[this.getSizeName(lineType, axis)];
	}

	private static getSizeName(lineType: LineType, axis: 1 | 2): SizeName {
		return LineTypeSizeName[lineType][axis];
	}
}
