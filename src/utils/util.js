import moment from 'moment';

export const formatAMPM = (date) => {
  return moment(date).format(`hh:mm A`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

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

