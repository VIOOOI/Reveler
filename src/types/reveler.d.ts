
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
	script: Array<Scripts>,
	content: string,
}

type Scripts = {
	isSlide: boolean,
	isOnes: boolean,
	script: string,
}

type Attribute = {
	name: string,
	value: string,
}

