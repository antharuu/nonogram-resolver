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
    }
    Resolver.prototype.resolve = function () {
        this.resolveLines();
        return this.map;
    };
    Resolver.prototype.resolveLines = function () {
        var _this = this;
        MapChecker.forEachLines(this.oldMap, function (line, index, lineType) {
            var resolvedLine = new InputLine(line, MapChecker.getSize(_this.map, lineType, 1)).resolve();
        });
        return [];
    };
    return Resolver;
}());
export default Resolver;
