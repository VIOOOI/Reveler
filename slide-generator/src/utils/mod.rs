extern crate rand;

use std::fmt::{Debug, Display};

use rand::Rng;
use regex::Regex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

pub(crate) fn generation_id() -> u8 {
  rand::thread_rng().gen::<u8>()
}

pub(crate) fn debug<T: Debug>(object: T) {
	let text = format!("{:#?}", object);
	log(&text);
}

pub(crate) fn console_print<T: Display>(object: T) {
	let text = format!("{}", object);
	log(&text);
}

