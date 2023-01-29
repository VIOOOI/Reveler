import { mokaReveler } from "@store/mokaReveler";
import { createEffect, createEvent, createStore, sample } from "effector";

import { Model } from "../../../utils/effector-factory";
import { OptionRowFactory, rowFactory } from "../../molecules/sliderRow/model";

const defaultReveler: Reveler = {
	id: "default",
	creationData: "1674984584",
	rows: [],
};

export const openReveler = createEvent<Reveler>();
export const nextRow = createEvent();
export const prevRow = createEvent();
export const getWindowSize = createEvent();


export const $reveler = createStore<Reveler>(mokaReveler);
const $currentSlide = createStore(0);

export const $transform = createStore(0);
const $windowSize = createStore({ width: 0, height: 0 });
export const $background = createStore("#171717");

$currentSlide.watch(source => console.log(source));
$transform.watch( source => console.log(source));


/**
	* Переход на следующий слайд и проверка, что он не будет бльше 
	* чем количество строк презентации
	*/
sample({
	clock: nextRow,
	source: {
		current: $currentSlide,
		slider: $reveler,
	},
	filter: source => source.current < source.slider.rows.length - 1,
	fn: source => source.current + 1,
	target: $currentSlide,
});

/**
	* Переход на предыдущий слайн и проверка, что мы не уйдем в минус
	*/
sample({
	clock: prevRow,
	source: {
		current: $currentSlide,
		slider: $reveler,
	},
	filter: source => source.current > 0,
	fn: source => source.current - 1,
	target: $currentSlide,
});

/**
	* Вычисления пикселей на сколько надо сдвинуть слайдер в зависимости
	* от размера экрана и слайда который сейчас должен отображаться
	*/
sample({
	clock: [ $currentSlide, $windowSize ],
	source: {
		current: $currentSlide,
		window: $windowSize,
	},
	fn: source => source.window.height * source.current * -1,
	target: $transform,
});

/**
	* Получения размера экрана пльзователя при запросе
	*/
sample({
	clock: getWindowSize,
	fn: () => ({
		width: window.innerWidth,
		height: window.innerHeight,
	}),
	target: $windowSize,
});
