
use crate::Rule;
use crate::utils;
use crate::utils::debug;
use pest::iterators::Pair;
use regex::Regex;
use serde::{Deserialize, Serialize};

use super::{
	element::Element,
	attribute::Attrebute
};

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Slide {
  id: String,
  atributes: Vec<Attrebute>,
  script: Vec<Scripts>,
  content: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Scripts {
	#[serde(rename(serialize = "isGlobal"))]
	is_global: bool,
	#[serde(rename(serialize = "isOnes"))]
	is_ones: bool,
	script: String,
}

impl Slide {
  fn default() -> Slide {
    Slide {
      id: utils::generation_id(),
      atributes: vec![],
			script: vec![],
      content: String::default(),
    }
  }
  pub fn create(slide: &Pair<Rule>) -> Slide {
    let mut default_slide = Slide::default();

    for element in slide.clone().into_inner() {
			match element.as_rule() {
				Rule::script => Self::generate_script(&mut default_slide, &element),
				Rule::children => default_slide.content = Element::create(&element),
				Rule::attr => default_slide.atributes.push(Attrebute::attr(&element)),
				_ => (),
			}
    }
		// debug(&default_slide);
    default_slide
  }

  fn generate_script(slide: &mut Slide, pair: &Pair<Rule>) {
		let mut is_global = false;
		let mut is_ones = false;
		for text in pair.clone().into_inner() {
			match text.as_rule() {
				Rule::is_global => is_global = true,
				Rule::is_ones => is_ones = true,
				Rule::javascript => {

					let regexp = Regex::new(r"\\>").unwrap();
					let script = regexp.replace_all(text.as_str(), ">").to_string();
					let regexp = Regex::new(r"\\<").unwrap();
					let script = regexp.replace_all(&script, "<").to_string();
					slide.script.push(Scripts { is_global, is_ones, script });

				},
				_ => (),
			}
		}
	}

}
