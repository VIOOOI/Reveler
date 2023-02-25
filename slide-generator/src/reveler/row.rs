use super::slide::Slide;
use crate::utils;
use crate::Rule;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Row {
  id: String,
  slide: Vec<Slide>,
}

impl Row {
  pub fn create(rows: &Pair<Rule>) -> Row {
    let mut row = Row::default();
    for slide in rows.clone().into_inner() {
      if let Rule::slide = slide.as_rule() {
        row.slide.push(Slide::create(&slide));
      };
    }
    row
  }

  pub fn create_one_slide(slide: &Pair<Rule>) -> Row {
    let mut row = Row::default();
		row.slide.push(Slide::create(slide));
    row
  }

  fn default() -> Row {
    Row {
      id: utils::generation_id(),
      slide: vec![],
    }
  }
}
