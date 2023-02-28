/* eslint-disable @typescript-eslint/no-unused-vars */
import { boolean } from "fp-ts";
import { Accessor, Setter, VoidProps } from "solid-js";

import { SlideProps } from ".";


export const setAnimation = (
	slide: HTMLDivElement,
	currentRow: Accessor<number>,
	currentSlide: Accessor<number>,
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
) => {
	const animation = slide.querySelectorAll("*[animate]"); 
	if(currentRow() == props.rowCount && currentSlide() == props.slideCount) {
		setTimeout(() => {
			animation.forEach(elem => {
				const animName = elem.attributes["animate"].nodeValue;
				elem.classList.add(`animate__${animName}`);
			});
		}, 850);
	} else {
		animation.forEach(elem => {
			const animName = elem.attributes["animate"].nodeValue;
			if (elem.classList.contains(`animate__${animName}`)) {
				elem.classList.remove(`animate__${animName}`);
			}
		});
	}

};

export const addedAnimationClass = (slide: HTMLDivElement) => {
	const anim = slide.querySelectorAll("*[animate]"); 
	anim.forEach(elem => { elem.classList.add("animate__animated"); });
};

export const startScript = (
	props: Pick<VoidProps<SlideProps>, "slide" | "rowCount" | "slideCount">,
	isRuning: Accessor<Array<boolean>>,
	setIsRuning: Setter<Array<boolean>>,
	setIsDone: Setter<boolean>,
) => {
	props.slide.script.forEach(s => {
		if(s.isGlobal) {
			eval(s.script);
		} else {
			setIsRuning([ ...isRuning(), false ]);
		}
	});
	setIsDone(true);
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
					else eval(s.script);
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

export const findAttribute = (name: string, slide: RSlide): string => {
	const result = slide.atributes.find(attr => {
		if ( attr.name == name ) return attr;
	});

	return result ? result.value : null;
};
