import {renderPositions} from '../utils/util';
import {remove, render, replace} from '../utils/render';
import NoTasks from '../components/no-tasks';
import LoadMoreButton from '../components/load-more-button';
import Sort, {sortType} from '../components/sort';
import Tasks from '../components/tasks';
import TaskController from './task-controller';
import {defaulTask} from '../mock/task';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container, tasksModel, filter, siteMenu) {
    this._tasksModel = tasksModel;
    this._filterController = filter;
    this._siteMenu = siteMenu;
    this._container = container;
    this._loadMoreButton = new LoadMoreButton();
    this._sort = new Sort();
    this._tasks = new Tasks();
    this._noTasks = new NoTasks();
    this._tasksArray = null;
    this._showTasksCount = 0;
    this._showedTaskControllers = [];
    this.sortsClickHandler = this.sortsClickHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = () => {
      this._showedTaskControllers.forEach((el) => el.setDefaultView());
    };
    this._onFilterChange = () => {
      return this.renderTasks(this._tasksModel.getTasks());
    };

    this._tasksModel.setChangeFilterHandler(this._onFilterChange);
  }

  _onDataChange(taskController, task, newTask) {
    return () => {
      if (task === null) {
        if (this._isAllTasksArchived(this._tasksModel.getTasksAll())) {
          replace(this._tasks, this._noTasks);
        }
        this._tasksModel.addTask(defaulTask);
        this.renderTasks(this._tasksModel.getTasksAll());
        const newTaskController = this._showedTaskControllers[0];
        newTaskController.renderNewTask();
        this._filterController.rerender();
      } else {
        if (newTask === null) {
          this._tasksModel.removeTask(task.id);
          this.renderTasks(this._tasksModel.getTasks());
        } else {
          this._tasksModel.update(newTask);
          this._filterController.rerender();
          taskController.render(newTask);
          if (this._isAllTasksArchived(this._tasksModel.getTasks())) {
            replace(this._noTasks, this._tasks);
          }
        }
      }
    };
  }

  _isAllTasksArchived(tasks) {
    return tasks.every((task) => task.isArchive);
  }

  render() {
    this._showTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._sort.setSortTypeChangeHandler(this.sortsClickHandler);
    this._siteMenu.setAddTaskHandler(this._onDataChange(null, null, null));
    this.renderTasks(this._tasksModel.getTasks());
  }

  showMoreButtonClickHandler(tasksToRender) {
    return () => {
      const prevTasksCount = this.showTasksCount;

      this._showTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasksToRender
        .slice(prevTasksCount, this._showTasksCount)
        .forEach((el) => {
          const taskController = new TaskController(
              this._tasks,
              this._onDataChange,
              this._onViewChange
          );
          taskController.render(el);
          this._showedTaskControllers.push(taskController);
        });

      if (this._showTasksCount >= tasksToRender.length) {
        remove(this._loadMoreButton);
      }
    };
  }

  sortsClickHandler(sortTp) {
    let sortedTasks = [...this._tasksModel.getTasks()];

    switch (sortTp) {
      case sortType.DEFAULT:
        remove(this._loadMoreButton);
        this.renderTasks(this._tasksModel.getTasks());
        break;
      case sortType.DATE_DOWN:
        this.renderTasks(sortedTasks.sort((a, b) => b.dueDate - a.dueDate));
        break;
      case sortType.DATE_UP:
        this.renderTasks(sortedTasks.sort((a, b) => a.dueDate - b.dueDate));
        break;
    }
  }

  renderTasks(tasksToRender) {
    this._showedTaskControllers = [];
    this._showTasksCount = SHOWING_TASKS_COUNT_ON_START;
    remove(this._loadMoreButton);
    while (this._tasks.getElement().firstChild) {
      this._tasks.getElement().removeChild(this._tasks.getElement().firstChild);
    }
    const isAllTasksArchived = this._isAllTasksArchived(
        this._tasksModel.getTasksAll()
    );

    if (isAllTasksArchived) {
      render(
          this._container.getElement(),
          this._noTasks.getElement(),
          renderPositions.AFTERBEGIN
      );
    } else {
      render(
          this._container.getElement(),
          this._sort.getElement(),
          renderPositions.BEFOREEND
      );
      render(
          this._container.getElement(),
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

      if (tasksToRender.length > this._showTasksCount) {
        render(
            this._container.getElement(),
            this._loadMoreButton.getElement(),
            renderPositions.BEFOREEND
        );
        this._loadMoreButton.setClickButtonHandler(
            this.showMoreButtonClickHandler(tasksToRender)
        );
      }
    }
  }
}
