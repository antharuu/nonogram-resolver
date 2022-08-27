import {Size} from "./Globals";

export type InputCellReceived = number | string
export type InputCell = number

export type InputsMap = {
	name: string;
	size: Size;
	cols: number[][];
	rows: number[][];
}

export type InputReceived = {
	cols: InputCellReceived[][];
	rows: InputCellReceived[][];
}
