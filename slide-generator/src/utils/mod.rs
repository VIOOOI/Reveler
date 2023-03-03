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

pub(crate) fn generation_id() -> String {
  rand::thread_rng().gen::<u16>().to_string()
}

pub(crate) fn debug<T: Debug>(object: T) {
	let text = format!("{:#?}", object);
	log(&text);
}

pub(crate) fn console_print<T: Display>(object: T) {
	let text = format!("{}", object);
	log(&text);
}

pub(crate) fn minimizing(text: String) -> String {
	let regexp_newline = Regex::new(r"\n").unwrap();
	let text = regexp_newline.replace_all(&text, " ").to_string();
	let regexp = Regex::new(r"([ ]{2,}|\n|[\t]{1,})").unwrap();
	let text = regexp.replace_all(&text, "");
	text.to_string()
}

pub(crate) fn rescript(text: String, tag: &str) -> String {
	let reg_str = format!("<{tag}>(.*?)</{tag}>");
	let regexp = Regex::new(&reg_str).unwrap();
	if regexp.is_match(&text) {
		let mut new_text = String::default();
		regexp.find_iter(&text).for_each(|item| {
			let mut str = item.as_str().to_string();
			str.replace_range(0..tag.len() + 2, "");
			str.replace_range(str.len() - tag.len() - 3..str.len(), "");
			new_text = text.replace(&str, &delimiter(&str));
		});
		new_text
	} else {text}
}

fn delimiter(text: &String) -> String {
	#[warn(unused_assignments)]
	let mut new_script = String::default();
	let regexp = Regex::new(r"<").unwrap();
	new_script = regexp.replace_all(text, r"\<").to_string();
	let regexp = Regex::new(r">").unwrap();
	regexp.replace_all(&new_script, r"\>").to_string()
}
