// use crate::utils;
use crate::{Rule, utils::{self, debug}};
use chrono::Utc;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

use super::group::Group;

#[derive(Debug, Serialize, Deserialize)]
pub struct Slider {
  id: String,
  creation_data: String,
  rows: Vec<Group>,
}

impl Slider {
  pub fn default() -> Slider {
    Slider {
      id: utils::generation_id(),
      creation_data: Utc::now().to_string(),
      rows: vec![],
    }
  }

  pub fn create(pairs: Pair<Rule>) -> Slider {
    let mut slider = Slider::default();
    for rows in pairs.into_inner() {
			match rows.as_rule() {
				Rule::group => Self::add_row(&mut slider, &rows),
				Rule::slide => Self::add_slide(&mut slider, &rows),
				_ => (),
			}
    }

		// debug(&slider);
    slider
  }


  fn add_row(slider: &mut Slider, row: &Pair<Rule>) {
    slider.rows.push(Group::create(&row));
  }
  fn add_slide(slider: &mut Slider, row: &Pair<Rule>) {
    slider.rows.push(Group::create_one_slide(&row));
  }
}
