
declare type Reveler = {
	id: string,
	creationData: string,
	rows: Array<RevelerRow>,
}

declare type RevelerRow = {
	id: string,
	slides: Array<RSlide>,
}

declare type RSlide = {
	grid: GridSlide,
	bgColor?: `#${string}`,
	textColor?: `#${string}`,
	class?: string,
	content: Array<RElement>,
}

declare type RElement = {
	block: RBlock,
	class?: string,
	text?: string,
	children?: Array<RElement>,
}

type GridSlide = 
	| "cover-sheet"
	| "cover-title"
	| "title-only"
	| "two-there-title"
	| "two-no-title"
	| "cube"
	| "text-center"
	| "two-and-one"
	;

type RBlock = 
	| "header1"
	| "header2"
	| "header3"
	| "paragraph"
	| "picture"
	| "list-item"
	| "list"
	| "block"
	;

