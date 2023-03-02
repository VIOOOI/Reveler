use wasm_bindgen::prelude::*;
use crate::utils;
use pest::Parser;
use serde_wasm_bindgen;

use self::slider::Slider;

mod attribute;
mod element;
mod group;
mod slide;
mod slider;

#[derive(Parser)]
#[grammar = "csv.pest"]
pub struct CSVParser;

#[wasm_bindgen]
pub fn presentation(text: &str) -> JsValue {
	let mini = utils::minimizing(text.to_string());
	let descript = utils::rescript(mini, "script");
	let dereactive = utils::rescript(descript, "reactive");
  let mut return_value = JsValue::default();
  match CSVParser::parse(Rule::presentation, &dereactive) {
    Ok(parser) => {
			if let Some(pair) = parser.clone().next() {
				let slider = Slider::create(pair);
				return_value = serde_wasm_bindgen::to_value(&slider).unwrap();
			}
		},
    Err(error) => {
		 utils::debug("Парсинг не удался"); 
		 utils::console_print(error.line());
		},
	}
  return_value
}

