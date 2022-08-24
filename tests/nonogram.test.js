import {Nonogram} from "../src/Nonogram/Nonogram.js";

describe("Création de la classe", function () {
	const N = new Nonogram();
	describe("Réinitialisation de la classe", function () {
		test("Taille", function () {
			expect(N).toHaveProperty("size", {x: 5, y: 5});
		});
	});
});
