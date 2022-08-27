var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Resolver from "../../src/Resolver.js";
import { Key } from "../../maps/key.js";
import { MapChecker } from "../../src/MapChecker.js";
import { CellState } from "../../src/Enums/States.js";
var testing = false;
var Board = (function () {
    function Board(R) {
        this.R = R;
        this.getMax = function (max) { return Math.ceil(max / 2); };
        this.app = document.querySelector("#app");
        this.input_cols_container = document.querySelector(".inputs-cols");
        this.input_rows_container = document.querySelector(".inputs-rows");
        this.board = document.querySelector(".board");
        this.name = document.querySelector(".infos__map");
        this.name.innerText = this.R.map.name;
        this.makeCssVariables();
        this.makeInputs();
        this.makeBoard();
    }
    Board.prototype.makeInputs = function () {
        var _this = this;
        this.input_cols_container.innerHTML = "";
        this.input_rows_container.innerHTML = "";
        MapChecker.forEachLines(this.R.oldMap, function (line, x, lineType, max) {
            var lines = document.createElement("div");
            lines.classList.add("inputs__".concat(lineType));
            lines.setAttribute("data-index", "".concat(x));
            lines.setAttribute("data-line-type", "".concat(lineType));
            var inputs = [];
            line = __spreadArray([], line, true).reverse();
            for (var y = 0; y < _this.getMax(max); y++) {
                var label = document.createElement("label");
                var input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.max = "".concat(max);
                input.value = line[y] ? "".concat(line[y]) : "";
                input.classList.add("inputs__cell");
                input.pattern = "[0-9]{1,2}";
                input.placeholder = "0";
                label.appendChild(input);
                inputs.unshift(label);
            }
            inputs.forEach(function (input) { return lines.appendChild(input); });
            _this["input_".concat(lineType, "s_container")].appendChild(lines);
        });
    };
    Board.prototype.makeBoard = function () {
        this.board.innerHTML = "";
        for (var y = 0; y < this.R.map.size.height; y++) {
            var row = document.createElement("div");
            row.classList.add("board__row");
            for (var x = 0; x < this.R.map.size.width; x++) {
                var cell = document.createElement("div");
                cell.classList.add("board__cell");
                cell.id = Board.getCellId(x, y);
                row.appendChild(cell);
            }
            this.board.appendChild(row);
        }
    };
    Board.prototype.makeCssVariables = function () {
        var sizeCol = this.R.map.size.width, sizeRow = this.R.map.size.height, maxCol = this.getMax(sizeCol), maxRow = this.getMax(sizeRow), moySize = this.MoySize(sizeCol, sizeRow);
        this.app.style.setProperty("--map-size--col", "".concat(sizeCol));
        this.app.style.setProperty("--map-size--row", "".concat(sizeRow));
        this.app.style.setProperty("--map-inputs--col", "".concat(maxCol));
        this.app.style.setProperty("--map-inputs--row", "".concat(maxRow));
        this.app.style.setProperty("--total-map-size--col", "".concat(sizeCol + maxCol));
        this.app.style.setProperty("--total-map-size--row", "".concat(sizeRow + maxRow));
        if (moySize === 5)
            this.app.style.fontSize = "clamp(4px, 2.7vw, 16px)";
        else if (moySize <= 10)
            this.app.style.fontSize = "clamp(4px, 2.4vw, 15px)";
        else if (moySize <= 20)
            this.app.style.fontSize = "clamp(4px, 2.1vw, 14px)";
    };
    Board.prototype.MoySize = function (sizeCol, sizeRow) {
        return Math.ceil((sizeCol + sizeRow) / 2);
    };
    Board.getCellId = function (x, y) { return "cell__".concat(x, "_").concat(y); };
    return Board;
}());
var R = new Resolver(Key);
if (R)
    new Board(R);
function setCursor(x, y) {
    var _a, _b;
    (_a = document.querySelector(".board__cell--has-cursor")) === null || _a === void 0 ? void 0 : _a.classList.remove("board__cell--has-cursor");
    (_b = document.querySelector("#".concat(Board.getCellId(x, y)))) === null || _b === void 0 ? void 0 : _b.classList.add("board__cell--has-cursor");
}
function resolve() {
    console.clear();
    R.resolve();
    if (R)
        new Board(R);
    var time = 0;
    var speed = 50;
    R.map.cols.forEach(function (col, x) {
        col.forEach(function (cell, y) {
            var el = document.querySelector("#".concat(Board.getCellId(x, y)));
            for (var state in CellState)
                el.classList.remove("board__cell--".concat(state.toLowerCase()));
            setTimeout(function () {
                setCursor(x, y);
                el.classList.add("board__cell--".concat(CellState[cell].toLowerCase()));
            }, time);
            time += speed;
        });
    });
    setTimeout(function () { return setCursor(999, 999); }, time);
}
if (testing)
    resolve();
function updateMap() {
    if (R)
        new Board(R);
}
var btnResolve = document.querySelector(".infos__resolve");
var btnExport = document.querySelector(".infos__export");
var fileImport = document.querySelector("#import__btn");
btnResolve.addEventListener("click", function () { return resolve(); });
btnExport.addEventListener("click", function () { return download_map_file(); });
fileImport.addEventListener("change", function () { return import_map_file(); });
function download_map_file() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(R.oldMap));
    var dlAnchorElem = document.querySelector(".infos__export");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "".concat(R.map.name.toLowerCase(), ".nrmap"));
}
function import_map_file() {
    var fileReader = new FileReader();
    fileReader.onload = function () {
        var parsedMap = JSON.parse("".concat(fileReader.result));
        R = new Resolver(parsedMap);
        updateMap();
    };
    if (fileImport && fileImport.files && fileImport.files.length > 0)
        fileReader.readAsText(fileImport.files[0]);
}
