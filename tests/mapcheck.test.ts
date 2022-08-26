import {MapChecker} from "../src/MapChecker.js";
import {LineType} from "../src/Enums/Lines.js";
import Resolver from "../src/Resolver.js";
import {Key} from "../maps/key.js";
import {KeyImpossible} from "../maps/impossibles/key_impossible";
import {InputLine} from "../src/InputLine";

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
		expect(new InputLine([]).getTotal()).toEqual(0);
		expect(new InputLine([1, 1]).getTotal()).toEqual(2);
		expect(new InputLine([1, 3]).getTotal()).toEqual(4);
		expect(new InputLine([1, 0, 1, 3]).getTotal()).toEqual(5);
		expect(new InputLine([5],).getTotal()).toEqual(5);
	});

	test("Get correct line count", function () {
		expect(new InputLine([3, 1]).getCount()).toEqual(5);
		expect(new InputLine([1, 1, 1]).getCount()).toEqual(5);
		expect(new InputLine([1, 1]).getCount()).toEqual(3);
		expect(new InputLine([1]).getCount()).toEqual(1);
		expect(new InputLine([]).getCount()).toEqual(0);
	});

	test("Iterate correct times in columns/rows", function () {
		let iterations = 0;
		MapChecker.forEachLines(Key, () => iterations++);
		expect(iterations).toEqual(Key.size.height + Key.size.width);
	});

});

describe("Map are possibles/impossible", function () {

	describe("Check possible lines", () => {

		test("Simple possible pattern single value", () => expect(new InputLine([1]).check()).toBeTruthy());

		test("Simple possible pattern 2 values", () => expect(new InputLine([1, 3]).check()).toBeTruthy());

		test("Simple possible pattern max values", () => expect(new InputLine([1, 1, 1]).check()).toBeTruthy());

	});

	describe("Check impossible lines", () => {

		test("Simple impossible pattern single value", () => expect(new InputLine([6]).check()).toBeFalsy());

		test("Simple impossible pattern 2 values", () => expect(new InputLine([2, 3]).check()).toBeFalsy());

		test("Simple impossible pattern many values", () => expect(new InputLine([2, 3, 8, 7]).check()).toBeFalsy());

	});

});

describe("Verify true map possible/impossible", function () {

	test("Check valid size", () => expect(Key.size).toHaveProperty("width", 5));

	test("Check cols are valides", () => expect(Key.cols[2]).toEqual([1, 3]));

	test("Check rows are valides", () => expect(Key.rows[2]).toEqual([3]));

	test("Check map is possible", () => expect(MapChecker.check(Key)).toBeTruthy());

	test("Check map is impossible", () => expect(MapChecker.check(KeyImpossible)).toBeFalsy());

});
