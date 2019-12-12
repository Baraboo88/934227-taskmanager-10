import {COLORS} from '../utils/util';

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const defaultRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const getRandomInt = (maxNumber) => {
  return Math.floor((maxNumber + 1) * Math.random());
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(array.length - 1)];
};

const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + getRandomInt(7) * (Math.random() > 0.5 ? 1 : -1));
  return date;
};

const generateRepeatingDays = () =>
  Object.keys(defaultRepeatingDays).reduce((acc, cur) => Object.assign(acc, {[cur]: Math.random() > 0.5}, {}), {mo: Math.random() > 0.5});

const generateTags = (tagsArr) => {
  return tagsArr.filter(() => Math.random() > 0.5).slice(0, 3);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(descriptions),
    dueDate,
    repeatingDays: dueDate ? defaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(tags)),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => [...Array(count)].map(generateTask);

export {generateTasks};
