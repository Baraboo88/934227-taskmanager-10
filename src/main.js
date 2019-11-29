import {addMenuBlock} from './components/menu';
import {addFilterBlock} from './components/filter';
import {addBoardBlock} from './components/board';
import {addCreatEditBlock} from './components/task-edit';
import {addTaskBlock} from './components/task';
import {addLoadMore} from './components/load-more-button';
import {generateTasks} from './mock/task';

const NUMBER_OF_ARTICLES = 30;

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const tasks = generateTasks(NUMBER_OF_ARTICLES);

const render = (container, blockToAdd, position = `beforeend`) =>
  container.insertAdjacentHTML(position, blockToAdd);

render(mainControl, addMenuBlock());
render(main, addFilterBlock());
render(main, addBoardBlock());
const boardBlock = document.querySelector(`.board`);
const boardTasks = document.querySelector(`.board__tasks`);

render(boardTasks, addCreatEditBlock());
render(boardBlock, addLoadMore());
const loadMoreButton = boardBlock.querySelector(`.load-more`);

tasks.slice(1, SHOWING_TASKS_COUNT_ON_START).forEach((el) => {
  render(boardTasks, addTaskBlock(el));
});
let showTasksCount = SHOWING_TASKS_COUNT_ON_START;

loadMoreButton.addEventListener(`click`, () => {

  const prevTasksCount = showTasksCount;

  showTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showTasksCount).forEach((el) => {
    render(boardTasks, addTaskBlock(el));
  });
});


