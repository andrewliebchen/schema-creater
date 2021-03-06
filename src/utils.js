import datef from "datef";
import faker from "faker";
import json2csv from "json2csv";
import times from "lodash.times";

export const genSample = element => faker[element.category][element.stub]();

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

  if (type === 0) {
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
