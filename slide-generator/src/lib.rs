#[macro_use]
extern crate pest_derive;
extern crate pest;

use pest::Parser;
use reveler::slider::Slider;
use serde_wasm_bindgen;
use utils::{debug, console_print};
use wasm_bindgen::prelude::*;

mod reveler;
mod utils;

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
		 debug("Парсинг не удался"); 
		 console_print(error.line());
		},
	}
  return_value
}

