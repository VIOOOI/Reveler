/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable effector/no-getState */
import { nextRow, prevRow, leftSlide, rightSlide, $currentSlide, $currentRowSlide } from "@organisms/slider/store";

import gsap from "gsap";

import { newBackground, newControl, newText } from "./options";

import type { GlobalReveler, SlideShowInfo } from "@types/globalReveler";

export const Reveler: GlobalReveler = {
	control: {
		next: () => nextRow(), prev: () => prevRow(),
		left: () => leftSlide(), right: () => rightSlide(),
		moveToTime: (side, time, id) => {
			if (Reveler.info.isFirstShow(id)) {
				setTimeout(() => { Reveler.control[side](); }, time);
			}
		},
	},
	info: {
		getCountShow: (id) => Reveler._slides.filter(s => s.id == id)[0].count,
		isFirstShow: (id) => Reveler._slides.filter(s => s.id == id)[0].count == 1,
		isCountShow: (id, count) => Reveler._slides.filter(s => s.id == id)[0].count == count,
		getRow: () => $currentSlide.getState(),
		getSlide: () => $currentRowSlide.getState(),
		getPosition: () => ({
			row: $currentSlide.getState(),
			slide: $currentRowSlide.getState(),
		}),
	},
	gsap: gsap,


	slide: {
		on: (id, event, fn) => {
			document.querySelector(`Slide-${id}`)
				.addEventListener(event, fn);
		},
	},



	setting: async (options) => {
		console.log(options);
		if (options.control) newControl(options.control);
		if (options.view) {
			if (options.view.bg) newBackground(options.view.bg);
			if (options.view.text) newText(options.view.text);
		}

	},



	_slides: [ ],
	_service: {

		addSlide: (id: string) => { Reveler._slides.push({ id: parseInt(id), count: 0 }); },
		slideInc: (id: number) => {
			Reveler._slides = Reveler._slides.map(slide => {
				return slide.id == id
					? { ...slide, count: slide.count + 1 }
					: slide;
			}) as SlideShowInfo[];
		},

	},
};
