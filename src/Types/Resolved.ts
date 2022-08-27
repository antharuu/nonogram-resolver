import {Size} from "./Globals";
import {CellState} from "../Enums/States";

export type ResolvedMap = {
	name: string;
	size: Size;
	cols: CellState[][];
	rows: CellState[][];
}
