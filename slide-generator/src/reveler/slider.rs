use crate::utils::{self, debug};
use super::Rule;
use chrono::Utc;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

use super::group::Group;

#[derive(Debug, Serialize, Deserialize)]
pub struct Slider {
  id: String,
  creation_data: String,
	options: Vec<Option>,
  rows: Vec<Group>,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Option {
	name: String,
	value: String,
}

impl Slider {
  pub fn default() -> Slider {
    Slider {
      id: utils::generation_id(),
      creation_data: Utc::now().to_string(),
			options: vec![],
      rows: vec![],
    }
  }

  pub fn create(pairs: Pair<Rule>) -> Slider {
    let mut slider = Slider::default();
    for rows in pairs.into_inner() {
			match rows.as_rule() {
				Rule::group => Self::add_row(&mut slider, &rows),
				Rule::slide => Self::add_slide(&mut slider, &rows),
				Rule::options => Self::add_options(&mut slider, &rows),
				_ => (),
			}
    }
    slider
  }

	fn add_options(slider: &mut Slider, options: &Pair<Rule>) {
		options.clone().into_inner().for_each(|option| {
			let mut opt = Option::default();
			option.clone().into_inner().for_each(|name_value| {
				debug(&name_value);
				match name_value.as_rule() {
					Rule::name_attr => opt.name = name_value.as_str().to_string(),
					Rule::value_attr => opt.value = name_value.as_str().to_string(),
					_ => (),
				}
			});
			debug(&opt);
			slider.options.push(opt);
		});
	}

  fn add_row(slider: &mut Slider, row: &Pair<Rule>) {
    slider.rows.push(Group::create(&row));
  }
  fn add_slide(slider: &mut Slider, row: &Pair<Rule>) {
    slider.rows.push(Group::create_one_slide(&row));
  }
}

impl Option {
	pub(super) fn default() -> Option {
		Option{
			name: String::default(),
			value: String::default(),
		}
	}
}
