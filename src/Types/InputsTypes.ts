import {Size} from "./Globals";

export type InputsLine = InputCell[]

export type InputCell = number

export type InputsMap = {
	name: string;
	size: Size;
	cols: InputsLine[];
	rows: InputsLine[];
}
