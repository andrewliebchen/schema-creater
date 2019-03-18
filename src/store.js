import { store } from "react-easy-state";
import { genElement, genComponent } from "./utils";
import remove from "lodash.remove";
import simpleId from "simple-id";

const defaultDataElement = genElement({
  category: "name",
  stub: "findName",
  label: "Full Name"
});

const appStore = store({
  dataElements: [defaultDataElement],
  structureElements: [
    {
      id: simpleId(),
      component: "Box",
      props: [],
      children: [
        {
          id: simpleId(),
          component: "Text",
          props: [],
          children: [defaultDataElement.id]
        }
      ]
    }
  ],
  selectedHelpers: [],
  count: 10,
  selectedCategory: false,
  toast: { show: false, message: "Copied to clipboard" },

  createElement(schema) {
    const dataElement = genElement(schema);
    appStore.dataElements.push(dataElement);
    appStore.structureElements.push(genComponent(dataElement.id));
  },

  destroyElement(id) {
    remove(appStore.dataElements, { id: id });
    remove(appStore.structureElements, { children: id });
  },

  findDataElement(key, value) {
    return appStore.dataElements.find(element => element[key] === value);
  },
  findStructureElement(key, value) {
    return appStore.structureElements.find(element => element[key] === value);
  }

  // findElement(key, value) {
  //   return appStore.dataElements
  //     .concat(appStore.structureElements)
  //     .find(element => element[key] === value);
  // }
});

export default appStore;
