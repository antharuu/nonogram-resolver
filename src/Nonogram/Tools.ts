import {InputCell, LineType, SizeName} from "./Types";
import {LINE_TYPE} from "./Enums";

export function pad(line: InputCell[], val: any, len: number): InputCell[] {
    while (line.length < len) {
        line.push(val)
    }
    return line;
}

export function padStart(line: InputCell[], val: any, len: number): InputCell[] {
    while (line.length < len) {
        line.unshift(val)
    }
    return line;
}

export function getAxisName(lineType: LineType, n: 1 | 2): SizeName {
    if (lineType === LINE_TYPE.COL) return n === 1 ? "height" : "width";
    else return n === 1 ? "width" : "height";
}

export function reduceLine(line: InputCell[]): InputCell[] {
    let first = (line.shift() as number) - 1
    if (first >= 1) line = [first, ...line]
    return line;
}

export function keepPossibleValues(line: InputCell[], maxItems: number, max: number): InputCell[] {
    if (line.length >= maxItems) line = line.filter((c, i) => i < maxItems)
    while (getSequenceSum(line) > max) line = reduceLine(line)
    return line;
}

export function getSequenceSum(line: InputCell[]): number {
    let sum = 0;
    line.forEach(c => sum += parseInt(`${c}`))

    return Math.max(sum + (line.length - 1), 0);
}

export function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
