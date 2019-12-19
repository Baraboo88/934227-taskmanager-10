import moment from 'moment';

export const formatAMPM = (date) => {
  return moment(date).format(`hh:mm A`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const isSameDate = (date) => {
  return formatDate(date) === formatDate(new Date());
};

export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];


export const filterTypes = {
  ALL: `filter__all`,
  ARCHIVE: `filter__archive`,
  FAVORITES: `filter__favorites`,
  OVERDUE: `filter__overdue`,
  TAGS: `filter__tags`,
  TODAY: `filter__today`,
  REPEATING: `filter__repeating`
};

export const defaultRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const renderPositions = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

