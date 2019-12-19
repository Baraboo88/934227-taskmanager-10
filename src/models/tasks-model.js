import {filterTypes, isSameDate} from '../utils/util';

export default class TasksModel {
  constructor() {
    this._activeFilterType = filterTypes.ALL;
    this._tasks = [];
    this._dataChangeHandler = null;
    this._changeFilterHandler = null;
  }

  setTasks(tasks) {
    this._tasks = [...tasks];
  }

  getTasksAll() {
    return this._tasks;
  }

  getTasks() {
    return this.getTasksByFilter();
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._changeFilterHandler();
  }

  getTasksByFilter() {
    switch (this._activeFilterType) {
      case filterTypes.ALL:
        return this._tasks;
      case filterTypes.ARCHIVE:
        return this._tasks.filter((el) => el.isArchive);
      case filterTypes.FAVORITES:
        return this._tasks.filter((el) => el.isFavorite);
      case filterTypes.OVERDUE:
        return this._tasks.filter((el) => el.dueDate instanceof Date && el.dueDate < Date.now());
      case filterTypes.TAGS:
        return this._tasks.filter((el) => el.tags.size > 0);
      case filterTypes.TODAY:
        return this._tasks.filter((el) => isSameDate(el.dueDate));
      default:
        return this._tasks.filter((el) => Object.values(el.repeatingDays).some(Boolean));
    }
  }

  setChangeFilterHandler(handler) {
    this._changeFilterHandler = handler;
  }
  setDataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }

  update(task) {
    const arr = [...this._tasks];
    const taskToChange = arr.find((el) => el.id === task.id);
    const index = arr.indexOf(taskToChange);
    arr[index] = task;
    this._tasks = arr;
  }

  removeTask(id) {
    const arr = [...this._tasks];
    const index = arr.findIndex((el) => el.id === id);
    if (index === -1) {
      return false;
    }
    arr.splice(index, 1);
    this._tasks = arr;
    this._dataChangeHandler();
    return true;
  }

  addTask(task) {
    const arr = [...this._tasks];
    arr.unshift(task);
    this._tasks = arr;
  }
}
