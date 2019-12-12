import {renderPositions} from '../utils/util';
import {remove, render} from '../utils/render';
import NoTasks from '../components/no-tasks';
import LoadMoreButton from '../components/load-more-button';
import Sort, {sortType} from '../components/sort';
import Tasks from '../components/tasks';
import TaskController from './task-controller';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._loadMoreButton = new LoadMoreButton();
    this._sort = new Sort();
    this._tasks = new Tasks();
    this._tasksArray = null;
    this._showedTaskControllers = [];
    this._onDataChange = (taskController, task, newTask) => {
      return () => {
        const index = this._tasksArray.findIndex((el) => el === task);
        this._tasksArray[index] = newTask;
        taskController.render(newTask);
      };
    };
    this._onViewChange = () => {
      this._showedTaskControllers.forEach((el) => el.setDefaultView());
    };
  }

  render(tasks) {
    this._tasksArray = tasks;
    let showTasksCount = SHOWING_TASKS_COUNT_ON_START;
    const board = this._container;

    const showMoreButtonClickHandler = (tasksToRender) => () => {
      const prevTasksCount = showTasksCount;

      showTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasksToRender.slice(prevTasksCount, showTasksCount).forEach((el) => {
        const taskController = new TaskController(
            this._tasks,
            this._onDataChange,
            this._onViewChange
        );
        taskController.render(el);
        this._showedTaskControllers.push(taskController);
      });

      if (showTasksCount >= tasksToRender.length) {
        remove(this._loadMoreButton);
      }
    };

    const renderTasks = (tasksToRender) => {
      showTasksCount = SHOWING_TASKS_COUNT_ON_START;
      remove(this._loadMoreButton);
      while (this._tasks.getElement().firstChild) {
        this._tasks
          .getElement()
          .removeChild(this._tasks.getElement().firstChild);
      }
      const isAllTasksArchived = tasks.every((task) => task.isArchive);

      if (isAllTasksArchived) {
        render(
            board.getElement(),
            new NoTasks().getElement(),
            renderPositions.AFTERBEGIN
        );
      } else {
        render(
            board.getElement(),
            this._sort.getElement(),
            renderPositions.BEFOREEND
        );
        render(
            board.getElement(),
            this._tasks.getElement(),
            renderPositions.BEFOREEND
        );

        tasksToRender.slice(0, SHOWING_TASKS_COUNT_ON_START).forEach((el) => {
          const taskController = new TaskController(
              this._tasks,
              this._onDataChange,
              this._onViewChange
          );
          taskController.render(el);
          this._showedTaskControllers.push(taskController);
        });

        if (tasksToRender.length > showTasksCount) {
          render(
              board.getElement(),
              this._loadMoreButton.getElement(),
              renderPositions.BEFOREEND
          );
          this._loadMoreButton.setClickButtonHandler(
              showMoreButtonClickHandler(tasksToRender)
          );
        }
      }
    };

    const sortsClickHandler = (sortTp) => {
      let sortedTasks = [...tasks];
      switch (sortTp) {
        case sortType.DEFAULT:
          remove(this._loadMoreButton);
          renderTasks(tasks);
          break;
        case sortType.DATE_DOWN:
          renderTasks(sortedTasks.sort((a, b) => b.dueDate - a.dueDate));
          break;
        case sortType.DATE_UP:
          renderTasks(sortedTasks.sort((a, b) => a.dueDate - b.dueDate));
          break;
      }
    };

    this._sort.setSortTypeChangeHandler(sortsClickHandler);
    renderTasks(tasks);
  }
}
