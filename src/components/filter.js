import {filtersNames} from './../mock/filter';

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
  const allFilters = tasks.length;
  let overdueFilterCounter = 0;
  let todayFilterCounter = 0;
  let favoriteFilterCounter = 0;
  let repeatingFilterCounter = 0;
  let tagsFilterCounter = 0;
  let archiveFilterCounter = 0;

  tasks.forEach((el) => {
    const {dueDate, repeatingDays, isFavorite, isArchive, tags} = el;
    if (dueDate instanceof Date && dueDate < Date.now()) {
      overdueFilterCounter++;
    }
    if (dueDate && dueDate.getDate() === new Date().getDate()) {
      todayFilterCounter++;
    }
    if (repeatingDays) {
      repeatingFilterCounter++;
    }
    if (isFavorite) {
      favoriteFilterCounter++;
    }
    if (isArchive) {
      archiveFilterCounter++;
    }
    if (tags) {
      tagsFilterCounter++;
    }
  });

  const filters = filtersNames.map((el) => {
    if (el === `all`) {
      return {
        title: el,
        count: allFilters
      };
    } else if (el === `overdue`) {
      return {
        title: el,
        count: overdueFilterCounter
      };
    } else if (el === `today`) {
      return {
        title: el,
        count: todayFilterCounter
      };
    } else if (el === `favorites`) {
      return {
        title: el,
        count: favoriteFilterCounter
      };
    } else if (el === `repeating`) {
      return {
        title: el,
        count: repeatingFilterCounter
      };
    } else if (el === `tags`) {
      return {
        title: el,
        count: tagsFilterCounter
      };
    } else {
      return {
        title: el,
        count: archiveFilterCounter
      };
    }
  });

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
