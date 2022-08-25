import {SizeName} from "../Types/Globals";

export enum LineType {
	Col = "col",
	Row = "row"
}

export const LineTypeSizeName: { col: { 1: SizeName, 2: SizeName }, row: { 1: SizeName, 2: SizeName } } = {
	col: {
		1: "height",
		2: "width"
	},
	row: {
		1: "width",
		2: "height"
	}
};
