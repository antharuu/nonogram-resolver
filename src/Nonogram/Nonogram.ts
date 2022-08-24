import {Cell, CssVariables, GameMap, InputCell, InputsMap, Line, Size} from "./Types";
import {Resolver} from "./Resolver";
import {getAxisName, keepPossibleValues, padStart} from "./Tools";
import {LINE_TYPE, STATE} from "./Enums";

export class Nonogram {
	size: Size = {width: 5, height: 5};
	possibles_values: Size = {width: 3, height: 3};
	resolver: Resolver | null = null;
	css_variables: CssVariables = {
		game_width: 8,
		game_height: 8,
		board_width: 5,
		board_height: 5,
		game_board_width: 5,
		game_board_height: 5,
		game_inputs_width: 3,
		game_inputs_height: 3,
		game_inputs_width_start: 4,
		game_inputs_height_start: 4
	};
	inputs: InputsMap = {size: this.size, cols: [], rows: []};
	map: GameMap = [];

	public resolve(): void {
		if (this.resolver === null) {
			this.resolver = new Resolver(this);
		}
	}

	public loadMap(inputsMap: InputsMap): void {
		this.size = inputsMap.size;
		this.setPossibleValues();
		([LINE_TYPE.COL, LINE_TYPE.ROW] as LINE_TYPE[]).forEach(lineType => {
			inputsMap[`${lineType}s`] = inputsMap[`${lineType}s`].map(line => {
				line = line.filter(l => l > 0);
				line = keepPossibleValues(line,
					this.possibles_values[(getAxisName(lineType, 1))],
					this.size[getAxisName(lineType, 1)]
				);
				if (line.length <= 0) {
					line = [0];
				}
				line = padStart(line, "", this.possibles_values[(getAxisName(lineType, 1))]);
				return line;
			});
		});
		this.inputs = inputsMap;
		this.resolver = null;
		this.updateMap();
	}

	private setCssVariables(): void {
		this.css_variables = {
			game_width: this.size.width + this.possibles_values.width,
			game_height: this.size.height + this.possibles_values.height,
			board_width: this.size.width,
			board_height: this.size.height,
			game_board_width: this.size.width,
			game_board_height: this.size.height,
			game_inputs_width: this.possibles_values.width,
			game_inputs_height: this.possibles_values.height,
			game_inputs_width_start: this.possibles_values.width + 1,
			game_inputs_height_start: this.possibles_values.height + 1
		};
	}

	private setPossibleValues(): void {
		this.possibles_values = {
			width: Math.ceil(this.size.width / 2),
			height: Math.ceil(this.size.height / 2)
		};
	}

	private updateMap() {
		this.setPossibleValues();
		this.setCssVariables();
		this.createMap();
	}

	public setCell(x: number, y: number, state: STATE, force = false) {
		if (force || this.map[y][x].state === STATE.NULL) this.map[y][x].state = state;
	}

	private createMap() {
		this.map = [];
		for (let y = 0; y < this.size.height; y++) {
			const col: Line = [];
			for (let x = 0; x < this.size.width; x++) {
				col.push({position: {x, y}, state: STATE.NULL} as Cell);
			}
			this.map.push(col);
		}
	}

	public getLine = (lineType: LINE_TYPE, nb: number): Line =>
		(lineType === LINE_TYPE.COL) ? this.getCol(nb) : this.getRow(nb);

	public getCol = (nb: number) => this.map.map((row) => row[nb]);

	public getRow = (nb: number) => this.map[nb];

	public getInputsLines = (lineType: LINE_TYPE) => (this.inputs[`${lineType}s`] as InputCell[][]).map(l => this.getCleanLine(l));

	private getCleanLine = (l: InputCell[]) => l.filter(l => (parseInt(`${l}`) ?? 0) > 0);
}
