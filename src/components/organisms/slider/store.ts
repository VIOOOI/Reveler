import { mokaReveler } from "@store/mokaReveler";
import { createEvent, createStore, sample } from "effector";

const defaultReveler: Reveler = {
	id: "default",
	creationData: "1674984584",
	rows: [],
};

export const openReveler = createEvent<Reveler>();

export const nextRow = createEvent();
export const prevRow = createEvent();
export const leftSlide = createEvent();
export const rightSlide = createEvent();

export const getWindowSize = createEvent();


export const $reveler = createStore<Reveler>(defaultReveler);
const $currentSlide = createStore(0);
const $currentRowSlide = createStore(0);

export const $transform = createStore({ x: 0, y: 0 });
export const $windowSize = createStore({ width: 0, height: 0 });
export const $background = createStore("#171717");

$reveler.watch(source => console.log(source));
// $currentRowSlide.watch(source => console.log(source));
// $transformY.watch( source => console.log(source));


sample({
	clock: openReveler,
	target: $reveler,
});

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
 * Переход на следующий слайд в группе если он не последний
 */
sample({
	clock: rightSlide,
	source: {
		current: $currentRowSlide,
		row: $currentSlide,
		slider: $reveler,
	},
	filter: ({ current, row, slider }) => {
		return current < slider.rows[row].slides.length - 1;
	},
	fn: source => source.current + 1,
	target: $currentRowSlide,
});

/**
	* Переход на предыдущий слайн и проверка, что мы не уйдем в минус
	*/
sample({
	clock: prevRow,
	source: $currentSlide,
	filter: source => source > 0,
	fn: source => source - 1,
	target: $currentSlide,
});

/**
 * Переход на предыдущий слайд в группе если он не первый
 */
sample({
	clock: leftSlide,
	source: $currentRowSlide,
	filter: source => source > 0,
	fn: source => source - 1,
	target: $currentRowSlide,
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
	fn: source => ({
		x: 0,
		y: source.window.height * source.current * -1,
	}),
	target: $transform,
});

sample({
	clock: $currentSlide,
	fn: () => 0,
	target: $currentRowSlide,
});

/**
 * Перерасчет положения слайдера при изменении главного слайда
 * или размера окна
 */
sample({
	clock: [ $currentRowSlide, $windowSize ],
	source: {
		current: $currentSlide,
		currentRow: $currentRowSlide,
		window: $windowSize,
	},
	fn: source => ({
		x: source.window.width * source.currentRow * -1,
		y: source.window.height * source.current * -1,
	}),
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


