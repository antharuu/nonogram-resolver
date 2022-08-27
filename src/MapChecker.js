import { LineType, LineTypeSizeName } from "./Enums/Lines.js";
import { InputLine } from "./InputLine.js";
var MapChecker = (function () {
    function MapChecker() {
    }
    MapChecker.check = function (map) {
        var _this = this;
        var possible = true;
        this.forEachLines(map, function (l, _i, lineType) {
            var line = new InputLine(l, _this.getSize(map, lineType, 1));
            if (!line.check()) {
                possible = false;
            }
        });
        return possible;
    };
    MapChecker.forEachLines = function (map, callback) {
        var _this = this;
        [LineType.Col, LineType.Row].forEach(function (lineType) {
            map["".concat(lineType, "s")].forEach(function (line, index) {
                callback(line, index, lineType, _this.getSize(map, lineType, 1));
            });
        });
    };
    MapChecker.getSize = function (map, lineType, axis) {
        return map.size[this.getSizeName(lineType, axis)];
    };
    MapChecker.getSizeName = function (lineType, axis) {
        return LineTypeSizeName[lineType][axis];
    };
    return MapChecker;
}());
export { MapChecker };
