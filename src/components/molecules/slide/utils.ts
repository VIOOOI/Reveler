/* eslint-disable @typescript-eslint/no-unused-vars */
import { Accessor, Setter, VoidProps } from "solid-js";

import { SlideProps } from ".";


export const setAnimation = (
	slide: HTMLDivElement,
	currentRow: Accessor<number>,
	currentSlide: Accessor<number>,
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
	isOnes: Accessor<boolean>,
	setIsOnes: Accessor<boolean>,
) => {
	const animation = slide.querySelectorAll("*[animate]"); 
	if(currentRow() == props.rowCount && currentSlide() == props.slideCount) {
		setTimeout(() => {
			animation.forEach(elem => {
				const animName = elem.attributes.getNamedItem("animate").nodeValue;
				elem.classList.add(`animate__${animName}`);
			});
			setIsOnes(true);
		}, isOnes()? 850 :0);
	} else {
		animation.forEach(elem => {
			const animName = elem.attributes.getNamedItem("animate").nodeValue;
			if (elem.classList.contains(`animate__${animName}`)) {
				elem.classList.remove(`animate__${animName}`);
			}
		});
	}
};

export const setAnimationOnes = (
	slide: HTMLDivElement,
	currentRow: Accessor<number>,
	currentSlide: Accessor<number>,
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
	isRuningAnim: Accessor<Array<boolean>>,
	setIsRuningAnim: Setter<Array<boolean>>,
) => {
	if(currentRow() == props.rowCount && currentSlide() == props.slideCount) {
		const anim = slide.querySelectorAll("*[animate\\.on]"); 
		anim.forEach((elem, index) => {
			if (!isRuningAnim()[index]) {
				setTimeout(() => {
					const attr = elem.attributes.getNamedItem("animate.on").nodeValue;
					elem.classList.add(`animate__${attr}`);
				}, (currentRow() == 0 && currentSlide() == 0)? 0 : 850);
				const ns = isRuningAnim().map((item, i) => {
					if(i == index) return true; 
					return item;
				});
				setIsRuningAnim(ns);
			}
		});
	}
};

export const addedAnimationClass = (
	slide: HTMLDivElement,
	isRuningAnim: Accessor<Array<boolean>>,
	setIsRuningAnim: Setter<Array<boolean>>,
	attr: string[],
) => {
	attr.forEach(a => {
		const anim = slide.querySelectorAll(`*[${a}]`); 
		anim.forEach(elem => { elem.classList.add("animate__animated"); });
		slide.querySelectorAll("*[animate\\.on]").forEach(() => {
			setIsRuningAnim([ ...isRuningAnim(), false ]);
		});
	});
};

export const startScript = (
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
	isRuning: Accessor<Array<boolean>>,
	setIsRuning: Setter<Array<boolean>>,
) => {
	props.slide.script.forEach(s => {
		if(s.isGlobal) {
			eval(s.script);
		} else {
			setIsRuning([ ...isRuning(), false ]);
		}
	});
};

export const runScript = (
	currentRow: Accessor<number>,
	currentSlide: Accessor<number>,
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
	isRuning: Accessor<Array<boolean>>,
	setIsRuning: Setter<Array<boolean>>,
) => {
	if(currentRow() == props.rowCount && currentSlide() == props.slideCount) {
		props.slide.script.forEach((s, index) => {
			setTimeout(() => {
				if(!s.isGlobal) {
					if (s.isOnes && isRuning()[index]) { return; }
					else eval(`
						${getPrivatVariebles(props.slide.id)}\n
						${s.script}
					`);
				}
				const ns = isRuning().map((item, i) => {
					if(i == index) return true; 
					return item;
				});
				setIsRuning(ns);
				
			}, 850);
		});
	}
};

const getPrivatVariebles = (id: string) => {
	return `const _id = ${id};`;
};

export const findAttribute = (name: string, slide: RSlide): string => {
	const result = slide.atributes.find(attr => {
		if ( attr.name == name ) return attr;
	});

	return result ? result.value : null;
};


export const slideIncrement = (
	currentRow: Accessor<number>,
	currentSlide: Accessor<number>,
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
) => {
	if(currentRow() == props.rowCount && currentSlide() == props.slideCount) {
		window.Reveler._service.slideInc(props.slide.id);
	}
};
