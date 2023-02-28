
use crate::{utils::{self, debug}, Rule};
use pest::iterators::Pair;
use regex::Regex;

// use super::{attribute::Attrebute, element::Element};
use serde::{Deserialize, Serialize};

use super::{element::{ElementChildren, Element}, attribute::Attrebute};

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct Slide {
  id: String,
  atributes: Vec<Attrebute>,
	script: String,
  content: String,
}

impl Slide {
  fn default() -> Slide {
    Slide {
      id: utils::generation_id(),
      atributes: vec![],
			script: String::default(),
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
		// debug(format!("Slide - {:#?}", &default_slide));
    default_slide
  }

  fn generate_script(slide: &mut Slide, pair: &Pair<Rule>) {
		for text in pair.clone().into_inner() {
			if let Rule::javascript = text.as_rule() {
				let regexp = Regex::new(r"\\>").unwrap();
				let res = regexp.replace_all(text.as_str(), ">").to_string();
				let regexp = Regex::new(r"\\<").unwrap();
				let res = regexp.replace_all(&res, "<").to_string();
				// debug(&res);
				slide.script = res;
			}
		}
	}

}
