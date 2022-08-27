import Resolver from "../../src/Resolver.js";
import {Key} from "../../maps/key.js";
import {MapChecker} from "../../src/MapChecker.js";
import {CellState} from "../../src/Enums/States.js";

const testing = false;

class Board {
	private app: HTMLDivElement;
	private name: HTMLTitleElement;
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
		this.name = document.querySelector(".infos__map") as HTMLTitleElement;

		this.name.innerText = this.R.map.name;

		this.makeCssVariables();
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
			line = [...line].reverse();

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
		this.board.innerHTML = "";
		for (let y = 0; y < this.R.map.size.height; y++) {
			const row = document.createElement("div");
			row.classList.add("board__row");

			for (let x = 0; x < this.R.map.size.width; x++) {
				const cell = document.createElement("div");
				cell.classList.add("board__cell");
				cell.id = Board.getCellId(x, y);
				row.appendChild(cell);
			}

			this.board.appendChild(row);
		}
	}

	public static getCellId = (x: number, y: number): string => `cell__${x}_${y}`;

	private makeCssVariables(): void {
		const sizeCol = this.R.map.size.width,
			sizeRow = this.R.map.size.height,
			maxCol = this.getMax(sizeCol),
			maxRow = this.getMax(sizeRow),
			moySize = this.MoySize(sizeCol, sizeRow);
		this.app.style.setProperty("--map-size--col", `${sizeCol}`);
		this.app.style.setProperty("--map-size--row", `${sizeRow}`);
		this.app.style.setProperty("--map-inputs--col", `${maxCol}`);
		this.app.style.setProperty("--map-inputs--row", `${maxRow}`);
		this.app.style.setProperty("--total-map-size--col", `${sizeCol + maxCol}`);
		this.app.style.setProperty("--total-map-size--row", `${sizeRow + maxRow}`);

		if (moySize === 5) this.app.style.fontSize = "clamp(4px, 2.7vw, 16px)";
		else if (moySize <= 10) this.app.style.fontSize = "clamp(4px, 2.4vw, 15px)";
		else if (moySize <= 20) this.app.style.fontSize = "clamp(4px, 2.1vw, 14px)";
	}

	private MoySize(sizeCol: number, sizeRow: number): number {
		return Math.ceil((sizeCol + sizeRow) / 2);
	}
}

let R = new Resolver(Key);
if (R) new Board(R);

function setCursor(x: number, y: number): void {
	document.querySelector(".board__cell--has-cursor")?.classList.remove("board__cell--has-cursor");
	document.querySelector(`#${Board.getCellId(x, y)}`)?.classList.add("board__cell--has-cursor");
}

function resolve(): void {
	console.clear();
	R.resolve();
	if (R) new Board(R);
	let time = 0;
	const speed = 50;
	R.map.cols.forEach((col, x) => {
		col.forEach((cell, y) => {
			const el = document.querySelector(`#${Board.getCellId(x, y)}`) as HTMLDivElement;
			for (const state in CellState) el.classList.remove(`board__cell--${state.toLowerCase()}`);
			setTimeout(() => {
				setCursor(x, y);
				el.classList.add(`board__cell--${CellState[cell].toLowerCase()}`);
			}, time);
			time += speed;
		});
	});
	setTimeout(() => setCursor(999, 999), time);
}

if (testing) resolve();

function updateMap(): void {
	if (R) new Board(R);
}

const btnResolve = document.querySelector(".infos__resolve") as HTMLButtonElement;
const btnExport = document.querySelector(".infos__export") as HTMLLinkElement;
const fileImport = document.querySelector("#import__btn") as HTMLInputElement;

btnResolve.addEventListener("click", () => resolve());

btnExport.addEventListener("click", () => download_map_file());

fileImport.addEventListener("change", () => import_map_file());

function download_map_file(): void {
	const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(R.oldMap));
	const dlAnchorElem = document.querySelector(".infos__export") as HTMLLinkElement;
	dlAnchorElem.setAttribute("href", dataStr);
	dlAnchorElem.setAttribute("download", `${R.map.name.toLowerCase()}.nrmap`);
}

function import_map_file(): void {
	const fileReader = new FileReader();
	fileReader.onload = (): void => {
		const parsedMap = JSON.parse(`${fileReader.result}`);
		R = new Resolver(parsedMap);
		updateMap();
	};
	if (fileImport && fileImport.files && fileImport.files.length > 0) fileReader.readAsText(fileImport.files[0]);
}

