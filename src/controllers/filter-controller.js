import {render, replace} from '../utils/render';
import {renderPositions, filterTypes} from '../utils/util';
import Filter from '../components/filter';

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._model = model;
    this._filter = null;
    this._activeFilterType = filterTypes.ALL;
    this._onDataChange = () => {
      this.rerender();
    };
    this._onFilterChange = (filterType) => {
      this._model.setFilter(filterType);
      this._activeFilterType = filterType;
    };
    this._model.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._filter = new Filter(this._model.getTasksAll());
    this._filter.setFilterChangeHandler(this._onFilterChange);
    render(this._container, this._filter.getElement(), renderPositions.BEFOREEND);
  }

  rerender() {
    const newFilterComp = new Filter(this._model.getTasksAll());
    replace(newFilterComp, this._filter);
    this._filter = newFilterComp;
    this._filter.setFilterChangeHandler(this._onFilterChange);
  }
}
