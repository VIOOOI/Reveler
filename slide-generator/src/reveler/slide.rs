use crate::{utils, Rule};
use pest::iterators::Pair;
use regex::Regex;

use super::{attribute::Attrebute, element::Element};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Slide {
  id: String,
  atributes: Vec<Attrebute>,
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

  fn default() -> Slide {
    Slide {
      id: utils::generation_id(),
      atributes: vec![],
      content: String::default(),
    }
  }
}
