import datef from "datef";
import faker from "faker";
import json2csv from "json2csv";
import times from "lodash.times";
import simpleId from "simple-id";
import bikeshed from "@jxnblk/bikeshed";

export const genSample = element => {
  return faker[element.category][element.stub]();
};

export const genElement = schema => {
  return {
    ...schema,
    color: bikeshed(),
    id: simpleId(),
    sample: genSample(schema),
    type: "data"
  };
};

export const genComponent = () => {
  return {
    component: "Box",
    id: simpleId(),
    properties: [],
    type: "structure"
  };
};

// Might not need any of this...
export const getSamples = (count, elements) => {
  let samples = [];
  times(count, i => {
    let sample = {};
    elements.map(
      element =>
        (sample[`${element.category}.${element.stub}`] = genSample(element))
    );
    samples[i] = sample;
  });
  return samples;
};

export const sampleConverter = (samples, type) => {
  let raw;
  let fileExt;

  if (type === "Table") {
    raw = json2csv.parse(samples);
    fileExt = "csv";
  } else {
    raw = JSON.stringify(samples);
    fileExt = "json";
  }

  return {
    raw: raw,
    filename: `Sample ${datef("MM-dd-YY h:mm:ss", new Date())}.${fileExt}`
  };
};

export const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );
