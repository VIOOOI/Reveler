use crate::{utils, Rule};
use pest::iterators::Pair;
use regex::Regex;

use super::{attribute::Attrebute, element::Element};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Slide {
  id: String,
  atributes: Vec<Attrebute>,
	script: String,
  content: String,
}

impl Slide {
  pub fn create(slide: &Pair<Rule>) -> Slide {
    let mut default_slide = Slide::default();

    for element in slide.clone().into_inner() {
      if let Rule::attributes = element.as_rule() {
        let mut attrs = Attrebute::generate_attributes(&element);
        default_slide.atributes.append(&mut attrs);
      }
      if let Rule::children = element.as_rule() {
        Self::generate_content(&mut default_slide, &element)
      }
      if let Rule::script = element.as_rule() {
				Self::generate_script(&mut default_slide, &element);
      }
    }
    default_slide
  }

  fn generate_content(slide: &mut Slide, elements: &Pair<Rule>) {
    let mut content = String::default();
    let content_raw = Element::create(elements);

    content_raw.iter().for_each(|elem| {
      content = format!("{}{}", content, elem);
    });

    let regexp = Regex::new(r"([ ]{2,}|\n|[\t]{1,})").unwrap();
    let res = regexp.replace_all(&content, "");
    slide.content = res.to_string();
  }

  fn generate_script(slide: &mut Slide, pair: &Pair<Rule>) {
		for text in pair.clone().into_inner() {
			if let Rule::js_text = text.as_rule() {
				let regexp = Regex::new(r"([ ]{2,}|\n|[\t]{1,})").unwrap();
				let res = regexp.replace_all(text.as_str(), "");
				slide.script = res.to_string();
			}
		}
	}

  fn default() -> Slide {
    Slide {
      id: utils::generation_id(),
      atributes: vec![],
			script: String::default(),
      content: String::default(),
    }
  }
}
