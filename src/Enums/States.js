export var CellState;
(function (CellState) {
    CellState[CellState["Undefined"] = -1] = "Undefined";
    CellState[CellState["Empty"] = 0] = "Empty";
    CellState[CellState["Filled"] = 1] = "Filled";
    CellState[CellState["Impossible"] = 2] = "Impossible";
})(CellState || (CellState = {}));
export var LineState;
(function (LineState) {
    LineState[LineState["Normal"] = 0] = "Normal";
    LineState[LineState["Completed"] = 1] = "Completed";
})(LineState || (LineState = {}));
export var InputState;
(function (InputState) {
    InputState[InputState["Normal"] = 0] = "Normal";
    InputState[InputState["Completed"] = 1] = "Completed";
})(InputState || (InputState = {}));
