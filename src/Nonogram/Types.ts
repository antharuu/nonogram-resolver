import {LINE_TYPE, STATE} from "./Enums";

export type GameMap = Line[]

export type InputsMap = { size: Size, cols: InputCol[], rows: InputRow[] }

export type Size = { width: number, height: number }

export type SizeName = "width" | "height"

export type Position = { x: number, y: number }

export type Line = Cell[]

export type Cell = { position: Position, state: STATE }

export type InputCol = InputCell[]

export type InputRow = InputCell[]

export type InputCell = number | ''

export type LineType = LINE_TYPE.COL | LINE_TYPE.ROW

export type CssVariables = {
    game_width: number,
    game_height: number,
    board_width: number,
    board_height: number,
    game_board_width: number
    game_board_height: number,
    game_inputs_width: number,
    game_inputs_height: number,
    game_inputs_width_start: number,
    game_inputs_height_start: number,
}
