#[macro_use]
extern crate pest_derive;
extern crate pest;

use pest::Parser;
use reveler::slider::Slider;
use serde_wasm_bindgen;
use wasm_bindgen::prelude::*;

mod reveler;
mod utils;

#[derive(Parser)]
#[grammar = "csv.pest"]
pub struct CSVParser;


#[wasm_bindgen]
pub fn gen_slider(text: &str) -> JsValue {
  let mut return_value = JsValue::default();
  let parser = CSVParser::parse(Rule::slider, &text);
  if let Ok(parser_result) = &parser {
    if let Some(pair) = parser_result.clone().next() {
      let slider = Slider::create(pair);
      return_value = serde_wasm_bindgen::to_value(&slider).unwrap();
    }
  }
  return_value
}

