import {MapChecker} from "../src/MapChecker.js";
import {LineType} from "../src/Enums/Lines.js";
import Resolver from "../src/Resolver.js";
import {Key} from "../maps/key.js";
import {KeyImpossible} from "../maps/impossibles/key_impossible";

describe("MapChecker work correctly", function () {

	test("Get size name", function () {
		expect(MapChecker.getSizeName(LineType.Col, 1)).toBe("height");
		expect(MapChecker.getSizeName(LineType.Col, 2)).toBe("width");
		expect(MapChecker.getSizeName(LineType.Row, 1)).toBe("width");
		expect(MapChecker.getSizeName(LineType.Row, 2)).toBe("height");
	});

	test("Get correct size", function () {
		const R = new Resolver(Key) as Resolver;

		expect(MapChecker.getSize(R.map, LineType.Col, 1)).toEqual(5);
		expect(MapChecker.getSize(R.map, LineType.Row, 1)).toEqual(5);
	});

	test("Get correct total", function () {
		expect(MapChecker.getLineTotal([])).toEqual(0);
		expect(MapChecker.getLineTotal([1, 1])).toEqual(2);
		expect(MapChecker.getLineTotal([1, 3])).toEqual(4);
		expect(MapChecker.getLineTotal([1, 0, 1, 3])).toEqual(5);
		expect(MapChecker.getLineTotal([5])).toEqual(5);
	});

	test("Get correct line count", function () {
		expect(MapChecker.getLineCount([3, 1])).toEqual(5);
		expect(MapChecker.getLineCount([1, 1, 1])).toEqual(5);
		expect(MapChecker.getLineCount([1, 1])).toEqual(3);
		expect(MapChecker.getLineCount([1])).toEqual(1);
		expect(MapChecker.getLineCount([])).toEqual(0);
	});

	test("Iterate correct times in columns/rows", function () {
		let iterations = 0;
		MapChecker.forEachLines(Key, () => iterations++);

		expect(iterations).toEqual(Key.size.height + Key.size.width);
	});

});

describe("Map are possibles/impossible", function () {

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

describe("Verify true map possible/impossible", function () {

	test("Check valid size", () => expect(Key.size).toHaveProperty("width", 5));

	test("Check cols are valides", () => expect(Key.cols[2]).toEqual([1, 3]));

	test("Check rows are valides", () => expect(Key.rows[2]).toEqual([3]));

	test("Check map is possible", () => expect(MapChecker.check(Key)).toBeTruthy());

	test("Check map is impossible", () => expect(MapChecker.check(KeyImpossible)).toBeFalsy());

});
