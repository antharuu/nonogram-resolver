import Resolver from "../src/Resolver";
import {Key} from "../maps/key";
import {CellState} from "../src/Enums/States";

const {Empty, Filled} = CellState;

describe("Resolve lines cases", function () {

	describe("Get all possibilities from line", function () {
		const R = new Resolver(Key) as Resolver;

		test("Empty line", () => expect(R.getLinePossibilities([])).toStrictEqual([[]]));

		test("Full line", () =>
			expect(R.getLinePossibilities([5])).toStrictEqual([
				[Filled, Filled, Filled, Filled, Filled]
			])
		);

		test("Full and multiple line (2, 2)", () =>
			expect(R.getLinePossibilities([2, 2])).toStrictEqual([
				[Filled, Filled, Empty, Filled, Filled]
			])
		);

		test("Full and multiple line (3, 1)", () =>
			expect(R.getLinePossibilities([3, 1])).toStrictEqual([
				[Filled, Filled, Filled, Empty, Filled]
			])
		);

		test("Get line elements", function () {
			expect(Resolver.getLineElements([1, 3])).toStrictEqual([[1, 0], [3]]);
			expect(Resolver.getLineElements([1, 1, 1])).toStrictEqual([[1, 0], [1, 0], [1]]);
			expect(Resolver.getLineElements([1, 2])).toStrictEqual([[1, 0], [2]]);
			expect(Resolver.getLineElements([2])).toStrictEqual([[2]]);
			expect(Resolver.getLineElements([3])).toStrictEqual([[3]]);
		});

		test("Line elements filling", function () {
			expect(Resolver.fillElements([[1, 0], [2]], 0)).toStrictEqual([[0], [1, 0], [2]]);
			expect(Resolver.fillElements([[1, 0], [2]], 1)).toStrictEqual([[1, 0], [0], [2]]);
			expect(Resolver.fillElements([[1, 0], [2]], 2)).toStrictEqual([[1, 0], [2], [0]]);
			expect(Resolver.fillElements([[1, 0], [2]])).toStrictEqual([[1, 0], [2], [0]]);
		});

		test("Line elements filling with multiple spaces", function () {
			expect(Resolver.fillElements([[1, 0], [1]], 0, [0, 0])).toStrictEqual([[0, 0], [1, 0], [1]]);
			expect(Resolver.fillElements([[2]], 1, [0, 0, 1])).toStrictEqual([[2], [0, 0, 1]]);
		});

		test("Elements to line", function () {
			expect(Resolver.elementsToLine([[0]])).toStrictEqual([0]);
			expect(Resolver.elementsToLine([[0, 1, 0, 2]])).toStrictEqual([0, 1, 0, 1, 1]);
			expect(Resolver.elementsToLine([[0], [1, 0], [2]])).toStrictEqual([0, 1, 0, 1, 1]);
			expect(Resolver.elementsToLine([[1, 0], [3]])).toStrictEqual([1, 0, 1, 1, 1]);
		});

		test("Get all possibilities (1) in 3", () => {
			const S = new Resolver(Key);
			S.map.size = {width: 3, height: 3};

			const possibilities = S.getLinePossibilities([1]);

			expect(possibilities).toStrictEqual([[Empty, Filled, Empty], [Empty, Empty, Filled], [Filled, Empty, Empty]]);
		});

		test("Get all possibilities (1, 2) in 5", () => {
			const S = new Resolver(Key);
			S.map.size = {width: 5, height: 5};

			expect(S.getLinePossibilities([1, 2])).toStrictEqual([
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
