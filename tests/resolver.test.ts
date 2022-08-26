import Resolver from "../src/Resolver";
import {Key} from "../maps/key";
import {CellState} from "../src/Enums/States";
import {InputLine} from "../src/InputLine";

const {Empty, Filled} = CellState;

describe("Resolve lines cases", function () {

	describe("Get all possibilities from line", function () {
		test("Empty line", () => expect(new InputLine([]).getPossibilities()).toStrictEqual([[]]));

		test("Full line", () =>
			expect(new InputLine([5]).getPossibilities()).toStrictEqual([
				[Filled, Filled, Filled, Filled, Filled]
			])
		);

		test("Full and multiple line (2, 2)", () =>
			expect(new InputLine([2, 2]).getPossibilities()).toStrictEqual([
				[Filled, Filled, Empty, Filled, Filled]
			])
		);

		test("Full and multiple line (3, 1)", () =>
			expect(new InputLine([3, 1]).getPossibilities()).toStrictEqual([
				[Filled, Filled, Filled, Empty, Filled]
			])
		);

		test("Get line elements", function () {
			expect(new InputLine([1, 3]).getElements()).toStrictEqual([[1, 0], [3]]);
			expect(new InputLine([1, 1, 1]).getElements()).toStrictEqual([[1, 0], [1, 0], [1]]);
			expect(new InputLine([1, 2]).getElements()).toStrictEqual([[1, 0], [2]]);
			expect(new InputLine([2]).getElements()).toStrictEqual([[2]]);
			expect(new InputLine([3]).getElements()).toStrictEqual([[3]]);
		});

		test("Line elements filling", function () {
			expect(InputLine.fillElements([[1, 0], [2]], 0)).toStrictEqual([[0], [1, 0], [2]]);
			expect(InputLine.fillElements([[1, 0], [2]], 1)).toStrictEqual([[1, 0], [0], [2]]);
			expect(InputLine.fillElements([[1, 0], [2]], 2)).toStrictEqual([[1, 0], [2], [0]]);
			expect(InputLine.fillElements([[1, 0], [2]])).toStrictEqual([[1, 0], [2], [0]]);
		});

		test("Line elements filling with multiple spaces", function () {
			expect(InputLine.fillElements([[1, 0], [1]], 0, [0, 0])).toStrictEqual([[0, 0], [1, 0], [1]]);
			expect(InputLine.fillElements([[2]], 1, [0, 0, 1])).toStrictEqual([[2], [0, 0, 1]]);
		});

		test("Elements to line", function () {
			expect(InputLine.elementsToLine([[0]])).toStrictEqual([0]);
			expect(InputLine.elementsToLine([[0, 1, 0, 2]])).toStrictEqual([0, 1, 0, 1, 1]);
			expect(InputLine.elementsToLine([[0], [1, 0], [2]])).toStrictEqual([0, 1, 0, 1, 1]);
			expect(InputLine.elementsToLine([[1, 0], [3]])).toStrictEqual([1, 0, 1, 1, 1]);
		});

		test("Get all possibilities (1) in 3", () => {
			expect(new InputLine([1], 3).getPossibilities())
				.toStrictEqual([[Empty, Filled, Empty], [Empty, Empty, Filled], [Filled, Empty, Empty]]);
		});

		test("Get all possibilities (1, 2) in 5", () => {
			expect(new InputLine([1, 2]).getPossibilities()).toStrictEqual([
				[Empty, Filled, Empty, Filled, Filled],
				[Filled, Empty, Empty, Filled, Filled],
				[Filled, Empty, Filled, Filled, Empty]
			]);
		});

	});

});

// describe("Resolve simple map (key)", function () {
// 	const R = new Resolver(Key) as Resolver;
// });
