
declare type Reveler = {
	id: string,
	creationData: string,
	options: Array<Option>,
	rows: Array<RevelerRow>,
}

type Option = {
	name: string,
	value: string,
}

declare type RevelerRow = {
	id: string,
	slide: Array<RSlide>,
}

declare type RSlide = {
	id: string,
	attributes: Array<Attribute>,
	script: Array<Scripts>,
	content: string,
}

type Scripts = {
	isGlobal: boolean,
	isOnes: boolean,
	script: string,
}

type Attribute = {
	name: string,
	value: string,
}

