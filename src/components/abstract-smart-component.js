import AbstractComponent from './abstract-component';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListener() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.recoveryListener();
  }
}
