import AbstractComponent from './abstract-component.js';

export const sortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`
};

const createSortTemplate = () => {
  return `<div class="board__filter-list">
          <a href="#" data-sort-type = ${sortType.DEFAULT} class="board__filter">SORT BY DEFAULT</a>
          <a href="#" data-sort-type = ${sortType.DATE_UP} class="board__filter">SORT BY DATE up</a>
          <a href="#" data-sort-type = ${sortType.DATE_DOWN} class="board__filter">SORT BY DATE down</a>
        </div>`;
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = sortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }


  setSortTypeChangeHandler(handler) {
    const elementClickHandler = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortTp = evt.target.dataset.sortType;
      if (this._currentSortType === sortTp) {
        return;
      }

      this._currentSortType = sortTp;

      handler(this._currentSortType);
    };
    this.getElement().addEventListener(`click`, elementClickHandler);
  }
}
