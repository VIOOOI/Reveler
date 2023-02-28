use crate::utils;
use crate::Rule;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

use super::slide::Slide;

#[derive(Debug, Serialize, Deserialize)]
pub struct Group {
  id: String,
  slide: Vec<Slide>,
}

impl Group {
  pub fn create(rows: &Pair<Rule>) -> Group {
    let mut row = Group::default();
    for slide in rows.clone().into_inner() {
			match slide.as_rule() {
				Rule::slide => {row.slide.push(Slide::create(&slide));},
				_ => (),
			}
    }
    row
  }

  pub fn create_one_slide(slide: &Pair<Rule>) -> Group {
    let mut row = Group::default();
		row.slide.push(Slide::create(slide));
    row
  }

  fn default() -> Group {
    Group {
      id: utils::generation_id(),
      slide: vec![],
    }
  }
}
