import {generateFilters} from './../mock/filter';

const createFilter = (filter, isChecked) => {
  const {name, count} = filter;

  return `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? `checked` : ``}
        />
        <label for="filter__${name}" class="filter__label">
          ${name} <span class="filter__${name}-count">${count}</span></label
        >`;
};

const generateFilterBlock = () => {
  const renderFilter = generateFilters()
    .map((el, i) => {
      return createFilter(el, i === 0);
    })
    .join(`\n`);

  return `<section class="main__filter filter container">
          ${renderFilter}
      </section>`;
};

export const addFilterBlock = () => generateFilterBlock();
