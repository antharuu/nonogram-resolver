import { CellState } from "./Enums/States.js";
import { MapChecker } from "./MapChecker.js";
import { InputLine } from "./InputLine.js";
var Resolver = (function () {
    function Resolver(oldMap) {
        this.oldMap = oldMap;
        this.map = {
            name: oldMap.name,
            size: oldMap.size,
            cols: [],
            rows: []
        };
        this.inputs = { cols: oldMap.cols, rows: oldMap.rows };
        this.makeMap();
    }
    Resolver.prototype.resolve = function () {
        this.resolveLines();
        return this.map;
    };
    Resolver.prototype.resolveLines = function () {
        var _this = this;
        MapChecker.forEachLines(this.oldMap, function (line, index, lineType) {
            var resolvedLine = new InputLine(line, MapChecker.getSize(_this.map, lineType, 1)).resolve();
            resolvedLine.forEach(function (cell, index2) {
                if (cell >= 0) {
                    _this.map["".concat(lineType, "s")][index][index2] = cell;
                }
            });
        });
        return [];
    };
    Resolver.prototype.makeMap = function () {
        this.mapMapCols();
        this.mapMapRows();
    };
    Resolver.prototype.mapMapCols = function () {
        this.map.cols = [];
        for (var i = 0; i < this.map.size.width; i++) {
            var col = [];
            for (var j = 0; j < this.map.size.height; j++)
                col.push(CellState.Undefined);
            this.map.cols.push(col);
        }
    };
    Resolver.prototype.mapMapRows = function () {
        this.map.rows = [];
        for (var i = 0; i < this.map.size.height; i++) {
            var row = [];
            for (var j = 0; j < this.map.size.width; j++)
                row.push(CellState.Undefined);
            this.map.rows.push(row);
        }
    };
    return Resolver;
}());
export default Resolver;
