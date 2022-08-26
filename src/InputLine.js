import { CellState } from "./Enums/States.js";
var InputLine = (function () {
    function InputLine(line, maxSize) {
        if (maxSize === void 0) { maxSize = 5; }
        var _this = this;
        this.maxSize = maxSize;
        this.lineLength = 0;
        this.lineCount = 0;
        this.elements = [];
        this.check = function () { return _this.getCount() <= _this.maxSize; };
        this.removeEmpty = function (line) {
            return line.filter(function (l) { return l ? parseInt("".concat(l)) > 0 : false; });
        };
        this.isFinishedLine = function (objectif) { return objectif <= _this.getCount(); };
        this.getLine = function () { return _this.line; };
        this.line = this.removeEmpty(line);
        this.lineLength = this.line.length;
        this.lineCount = this.getCount();
        this.elements = this.getElements();
    }
    InputLine.prototype.getCount = function () {
        var totalUsed = 0;
        this.line.forEach(function (c) { return totalUsed += c; });
        return Math.max(totalUsed + this.lineLength - 1, 0);
    };
    InputLine.prototype.getTotal = function () {
        var total = 0;
        this.line.forEach(function (l) { return total += l; });
        return total;
    };
    InputLine.prototype.getSequence = function (nbCells, value) {
        var arr = [];
        for (var i = 0; i < nbCells; i++)
            arr.push(value);
        return arr;
    };
    InputLine.prototype.getPossibilities = function () {
        var possibilities = [];
        if (this.lineCount <= 0) {
            possibilities.push([]);
        }
        else if (this.lineCount === this.maxSize) {
            possibilities.push(this.getFullPossibilities());
        }
        else {
            possibilities = this.getFistEndPossibilities();
        }
        return possibilities;
    };
    InputLine.prototype.getFullPossibilities = function () {
        var _this = this;
        var fullPossible = [];
        var Empty = CellState.Empty, Filled = CellState.Filled;
        if (this.lineLength === 1) {
            for (var i = 0; i < this.maxSize; i++) {
                fullPossible.push(Filled);
            }
        }
        else {
            this.line.forEach(function (cells) {
                for (var i = 0; i < cells; i++) {
                    fullPossible.push(Filled);
                }
                if (fullPossible.length < _this.maxSize) {
                    fullPossible.push(Empty);
                }
            });
        }
        return fullPossible;
    };
    InputLine.prototype.getLinePartialPossibilities = function () {
        var possibilities = [];
        var emptyValues = this.maxSize - this.getTotal();
        var possiblesPositions = emptyValues + 1;
        for (var pos = 0; pos < possiblesPositions; pos++) {
            for (var nbEmpty = 0; nbEmpty < emptyValues; nbEmpty++) {
                var filledEls = InputLine.fillElements(this.elements, pos, this.getSequence(nbEmpty + 1, 0));
                var ln = InputLine.elementsToLine(filledEls);
                ln = this.fillEnd(ln);
                if (!this.hasPossibility(possibilities, ln) && ln.length === this.maxSize)
                    possibilities.push(ln);
            }
        }
        return possibilities;
    };
    InputLine.prototype.getFistEndPossibilities = function () {
        var emptyValues = this.maxSize - this.getCount();
        var atFirst = InputLine.elementsToLine(InputLine.fillElements(this.elements, 0, this.getSequence(emptyValues, 0)));
        var atEnd = InputLine.elementsToLine(InputLine.fillElements(this.elements, -1, this.getSequence(emptyValues, 0)));
        return [atFirst, atEnd];
    };
    InputLine.prototype.getElements = function () {
        var _this = this;
        var inputsElements = [];
        this.line.forEach(function (val) {
            var element = [val];
            if (inputsElements.length < _this.lineLength - 1)
                element.push(0);
            inputsElements.push(element);
        });
        return inputsElements;
    };
    InputLine.fillElements = function (elements, indexPosition, value) {
        if (indexPosition === void 0) { indexPosition = -1; }
        if (value === void 0) { value = [0]; }
        var returnedElements = [];
        var inserted = false;
        elements.forEach(function (el, i) {
            if (i === indexPosition) {
                returnedElements.push(value);
                inserted = true;
            }
            returnedElements.push(el);
        });
        if (!inserted)
            returnedElements.push(value);
        return returnedElements;
    };
    InputLine.elementsToLine = function (elements) {
        var line = [];
        elements.forEach(function (lineParts) { return lineParts.forEach(function (linePart) {
            var Empty = CellState.Empty, Filled = CellState.Filled;
            if (linePart === 0) {
                line.push(Empty);
            }
            else {
                for (var i = 0; i < linePart; i++) {
                    line.push(Filled);
                }
            }
        }); });
        return line;
    };
    InputLine.prototype.hasPossibility = function (possibilities, currentLine) {
        var has = false;
        possibilities.forEach(function (pos) {
            var allSame = true;
            for (var i = 0; i < pos.length; i++) {
                if (pos[i] !== currentLine[i]) {
                    allSame = false;
                }
            }
            if (allSame)
                has = true;
        });
        return has;
    };
    InputLine.prototype.fillEnd = function (line) {
        while (line.length < this.maxSize) {
            line.push(0);
        }
        return line;
    };
    return InputLine;
}());
export { InputLine };
