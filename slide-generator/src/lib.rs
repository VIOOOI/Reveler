extern crate pest;
#[macro_use]
extern crate pest_derive;

use pest::Parser;
use reveler::{attribute::Attrebute, slider::Slider};
use serde_wasm_bindgen::{self, Error};
use wasm_bindgen::prelude::*;

mod reveler;
mod utils;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  pub fn log(s: &str);
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_many(a: &str, b: &str);
}

#[derive(Parser)]
#[grammar = "csv.pest"]
pub struct CSVParser;

#[wasm_bindgen]
pub fn console_log(text: &str) {
  log(text);
}

#[wasm_bindgen]
pub fn gen_slider(text: &str) -> JsValue {
  let mut return_value = JsValue::default();
  let parser = CSVParser::parse(Rule::slider, &text);
  if let Ok(parser_result) = &parser {
    // debug_log(&"Parser Okey");
    let pair = parser_result.clone().next();
    if let Some(pair) = parser_result.clone().next() {
      let slider = Slider::create(pair);
      // debug_log(&"Pair is Some");
      return_value = serde_wasm_bindgen::to_value(&slider).unwrap();
    }
  }
  // let test_attr = Attrebute {
  //     name: "class".to_string(),
  //     value: "text-white".to_string(),
  // };
  // return_value = serde_wasm_bindgen::to_value(&test_attr).unwrap();
  return_value
}

fn debug_log<T: std::fmt::Debug>(text: &T) {
  let text_format = format!("{:#?}", text);
  log(&text_format);
}
