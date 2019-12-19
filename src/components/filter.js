import {generateFilters} from './../mock/filter';
import AbstractComponent from "./abstract-component";

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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return generateFilterBlock(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterId = evt.target.id;
      handler(filterId);
    });
  }

}

