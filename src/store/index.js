import { observable, action, computed } from "mobx";

class Store {
  @observable defaultState = [
    { id: 0, title: "React", done: false },
    { id: 1, title: "Vue", done: true },
    { id: 2, title: "Angular", done: false },
  ];
}

const store = new Store();

export default store;
