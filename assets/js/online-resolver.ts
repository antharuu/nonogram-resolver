import Resolver from "../../src/Resolver.js";
import {Key} from "../../maps/key.js";
import {MapChecker} from "../../src/MapChecker.js";

class Board {
	private readonly app: HTMLDivElement;
	private readonly input_cols_container: HTMLDivElement;
	private readonly input_rows_container: HTMLDivElement;
	private readonly board: HTMLDivElement;

	constructor(
		private readonly R: Resolver
	) {
		this.app = document.querySelector("#app") as HTMLDivElement;
		this.input_cols_container = document.querySelector(".inputs-cols") as HTMLDivElement;
		this.input_rows_container = document.querySelector(".inputs-rows") as HTMLDivElement;
		this.board = document.querySelector(".board") as HTMLDivElement;

		this.makeInputs();
		this.makeBoard();
	}

	private getMax = (max: number): number => Math.ceil(max / 2);

	private makeInputs(): void {
		this.input_cols_container.innerHTML = "";
		this.input_rows_container.innerHTML = "";
		MapChecker.forEachLines(this.R.oldMap, (line, x, lineType, max) => {
			const lines = document.createElement("div") as HTMLDivElement;
			lines.classList.add(`inputs__${lineType}`);
			lines.setAttribute("data-index", `${x}`);
			lines.setAttribute("data-line-type", `${lineType}`);

			const inputs: HTMLLabelElement[] = [];
			line.reverse();

			for (let y = 0; y < this.getMax(max); y++) {
				const label = document.createElement("label");

				const input = document.createElement("input");
				input.type = "number";
				input.min = "0";
				input.max = `${max}`;
				input.value = line[y] ? `${line[y]}` : "";
				input.classList.add("inputs__cell");
				input.pattern = "[0-9]{1,2}";
				input.placeholder = "0";

				label.appendChild(input);
				inputs.unshift(label);
			}

			inputs.forEach(input => lines.appendChild(input));

			this[`input_${lineType}s_container`].appendChild(lines);
		});
	}

	private makeBoard(): void {
		for (let y = 0; y < this.R.map.size.height; y++) {
			const row = document.createElement("div");
			row.classList.add("board__row");

			for (let x = 0; x < this.R.map.size.width; x++) {
				const cell = document.createElement("div");
				cell.classList.add("board__cell");
				cell.id = this.getCellId(x, y);
				row.appendChild(cell);
			}

			this.board.appendChild(row);
		}
	}

	private getCellId = (x: number, y: number): string => `cell__${x}_${y}`;
}

const R = new Resolver(Key);

if (R) new Board(R);

console.log(R);
R.resolve();
console.log(R);
