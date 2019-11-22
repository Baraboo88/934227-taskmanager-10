import {addMenuBlock} from './components/menu';
import {addFilterBlock} from './components/filter';
import {addBoardBlock} from './components/board';
import {addCreatEditBlock} from './components/task-edit';
import {addTaskBlock} from './components/task';
import {addLoadMore} from './components/load-more-button';

const NUMBER_OF_ARTICLES = 3;

const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);

const render = (container, blockToAdd, position = `beforeend`) =>
  container.insertAdjacentHTML(position, blockToAdd());

render(mainControl, addMenuBlock);
render(main, addFilterBlock);
render(main, addBoardBlock);
const boardBlock = document.querySelector(`.board`);
const boardTasks = document.querySelector(`.board__tasks`);
render(boardTasks, addCreatEditBlock);

const repeat = (count, fn) => {
  Array(count)
    .fill(``)
    .forEach(fn);
};

repeat(NUMBER_OF_ARTICLES, () => {
  render(boardTasks, addTaskBlock);
});

render(boardBlock, addLoadMore);
