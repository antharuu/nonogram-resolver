import Resolver from "../src/Resolver";
import {Key} from "../maps/key";
import {MapChecker} from "../src/MapChecker";

describe("Map are possibles", function () {

	describe("Check possible lines", () => {

		test("Simple possible pattern single value", () => expect(MapChecker.checkLine([1], 5)).toBeTruthy());
		test("Simple possible pattern 2 values", () => expect(MapChecker.checkLine([1, 3], 5)).toBeTruthy());
		test("Simple possible pattern max values", () => expect(MapChecker.checkLine([1, 1, 1], 5)).toBeTruthy());

	});
	describe("Check impossible lines", () => {

		test("Simple impossible pattern single value", () => expect(MapChecker.checkLine([6], 5)).toBeFalsy());
		test("Simple impossible pattern 2 values", () => expect(MapChecker.checkLine([2, 3], 5)).toBeFalsy());
		test("Simple impossible pattern many values", () => expect(MapChecker.checkLine([2, 3, 8, 7], 5)).toBeFalsy());

	});

});

describe("Map: Key", function () {
	const R = new Resolver(Key) as Resolver;

	test("Check valid size", () => expect(R.map.size).toHaveProperty("width", 5));

	test("Check cols are valides", () => expect(R.map.cols[2]).toEqual([1, 3]));

	test("Check rows are valides", () => expect(R.map.rows[2]).toEqual([3]));

	test("Check map is possible", () => expect(MapChecker.check(R.map)).toBeTruthy());
});
