import {createElement} from '../util';

import {generateFilters} from './../mock/filter';

const createFilter = (filter, isChecked) => {
  const {title, count} = filter;

  return `<input
          type="radio"
          id="filter__${title}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? `checked` : ``}
        />
        <label for="filter__${title}" class="filter__label">
          ${title} <span class="filter__${title}-count">${count}</span></label
        >`;
};

const generateFilterBlock = (tasks) => {
  const filters = generateFilters(tasks);

  const renderFilter = filters
    .map((el, i) => {
      return createFilter(el, i === 0);
    })
    .join(`\n`);

  return `<section class="main__filter filter container">
          ${renderFilter}
      </section>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return generateFilterBlock(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

