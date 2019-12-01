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

export {generateFilterBlock};
