import Resolver from "../src/Resolver";
import {Key} from "../maps/key";
import {CellState} from "../src/Enums/States";

const {Empty, Filled} = CellState;

describe("Resolve simple data", function () {

	describe("Get all possibilities from line", function () {
		const R = new Resolver(Key) as Resolver;

		test("Empty line", () => expect(R.getPossibilities([])).toStrictEqual([[]]));

		test("Full line", () =>
			expect(R.getPossibilities([5])).toStrictEqual([
				[Filled, Filled, Filled, Filled, Filled]
			])
		);

		test("Full and multiple line (2 2)", () =>
			expect(R.getPossibilities([2, 2])).toStrictEqual([
				[Filled, Filled, Empty, Filled, Filled]
			])
		);

		test("Full and multiple line (3 1)", () =>
			expect(R.getPossibilities([3, 1])).toStrictEqual([
				[Filled, Filled, Filled, Empty, Filled]
			])
		);

	});

});

// describe("Resolve simple map (key)", function () {
// 	const R = new Resolver(Key) as Resolver;
// });
