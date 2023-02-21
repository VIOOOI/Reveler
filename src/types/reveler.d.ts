
declare type Reveler = {
	id: string,
	creationData: string,
	rows: Array<RevelerRow>,
}

declare type RevelerRow = {
	id: string,
	slide: Array<RSlide>,
}

declare type RSlide = {
	id: string,
	atributes: Array<Attribute>,
	content: string,
}

declare type Attribute = {
	name: string,
	value: string,
}

