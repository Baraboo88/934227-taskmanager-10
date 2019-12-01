const filtersNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const getFiltersCount = (filter, tasks) => {
  switch (filter) {
    case `all`:
      return tasks.length;
    case `overdue`:
      return tasks.filter((el) => el.dueDate instanceof Date && el.dueDate < Date.now()).length;
    case `today`:
      return tasks.filter((el) => el.dueDate && el.dueDate.getDate() === new Date().getDate()).length;
    case `favorites`:
      return tasks.filter((el) => el.isFavorite).length;
    case `repeating`:
      return tasks.filter((el) => Object.values(el.repeatingDays).some(Boolean)).length;
    case `tags`:
      return tasks.filter((el) => el.tags.size).length;
    case `archive`:
      return tasks.filter((el) => el.isArchive).length;
    default: return 0;
  }
};

const generateFilters = (tasks) => {
  return filtersNames.map((el) => {
    return {
      title: el,
      count: getFiltersCount(el, tasks)
    };
  });
};

export {generateFilters};
