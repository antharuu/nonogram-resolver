import {InputsMap} from "./Types/InputsTypes";

export default class Resolver {

	constructor(
		public map: InputsMap
	) {
		console.count("-> Initialisation du resolver");
	}
}
