use super::row::Row;
use crate::utils;
use crate::Rule;
use chrono::Utc;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Slider {
  id: String,
  creation_data: String,
  rows: Vec<Row>,
}

impl Slider {
  pub fn create(pairs: Pair<Rule>) -> Slider {
    let mut slider = Slider::default();

    for rows in pairs.into_inner() {
      if let Rule::row = rows.as_rule() {
        Self::add_row(&mut slider, &rows);
      }
    }

    slider
  }

  pub fn default() -> Slider {
    Slider {
      id: utils::generation_id(),
      creation_data: Utc::now().to_string(),
      rows: vec![],
    }
  }

  fn add_row(slider: &mut Slider, row: &Pair<Rule>) {
    let r = Row::create(&row);
    slider.rows.push(r);
  }
}
