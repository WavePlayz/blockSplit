export default class Tick {
	static #value = 0
	
	static get value() {
		return this.#value
	}
	
	static reset() {
		this.#value = 0
	}
	
	static update() {
		return ++this.#value
	}
}
