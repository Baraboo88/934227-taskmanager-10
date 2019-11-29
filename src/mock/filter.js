const filtersName = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const generateFilters = () => {
  return filtersName.map((el) => {
    return {
      name: el,
      count: Math.floor(Math.random() * 10)
    };
  });
};

export {generateFilters};
