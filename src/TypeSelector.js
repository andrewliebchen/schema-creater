import { Absolute, Relative } from "./StyleHelpers";
import { Box } from "rebass";
import { genSample } from "./utils";
import { schemaTypes, categories, helpers } from "./data";
import { SlideIn } from "./Animation";
import { view } from "react-easy-state";
import Button from "./Button";
import capitalize from "lodash.capitalize";
import React, { useState } from "react";
import remove from "lodash.remove";
import sample from "lodash.sample";
import SearchInput from "./SearchInput";
import simpleId from "simple-id";
import store from "./store";
import TypeSelectorElement from "./TypeSelectorElement";
import TypeSelectorSearchResults from "./TypeSelectorSearchResults";

const TypeSelector = props => {
  const [search, setSearch] = useState("");

  return (
    <Relative>
      <Box mb={2}>
        <SearchInput
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </Box>
      {search.length > 2 ? (
        <TypeSelectorSearchResults value={search} />
      ) : (
        <Box>
          <SlideIn in={store.selectedCategory ? false : true} timeout={200}>
            <Absolute>
              <TypeSelectorElement
                type="helper"
                id="schemaHelperSelector"
                label="Helpers"
                onClick={() => (store.selectedCategory = "helpers")}
                showArrow
              />
              <TypeSelectorElement
                type="formula"
                id="schemaForumulaSelector"
                label="Formulas"
                onClick={() => (store.selectedCategory = "formulas")}
                showArrow
              />
              {categories.map(category => (
                <TypeSelectorElement
                  key={category}
                  type="category"
                  id="schemaCategorySelector"
                  label={capitalize(category)}
                  onClick={() => (store.selectedCategory = category)}
                  showArrow
                />
              ))}
              <Box mt={2}>
                <Button
                  id="randomSchemaElementButton"
                  onClick={() =>
                    store.elements.push({
                      ...sample(schemaTypes),
                      id: simpleId()
                    })
                  }
                >
                  I'm feeling lucky
                </Button>
              </Box>
            </Absolute>
          </SlideIn>

          <SlideIn in={store.selectedCategory ? true : false} timeout={200}>
            <Absolute>
              {store.selectedCategory === "helpers" &&
                helpers.map(helper => (
                  <TypeSelectorElement
                    key={helper.stub}
                    type="helper"
                    id="helperElementToggleSelect"
                    label={helper.label}
                    onClick={() => {
                      helper.elements.map(element =>
                        store.elements.push({ ...element, id: simpleId() })
                      );
                      store.toast = { show: true, message: "Helper added" };
                    }}
                  />
                ))}

              {store.selectedCategory === "formulas" && <Box>Formulas</Box>}

              {store.selectedCategory === ("helpers" || "formulas") ||
                schemaTypes
                  .filter(schema => schema.category === store.selectedCategory)
                  .map(schema => {
                    const isIncluded = store.elements.find(
                      element => element.stub === schema.stub
                    );
                    return (
                      <TypeSelectorElement
                        key={schema.stub}
                        id="schemaElementToggleSelect"
                        isIncluded={isIncluded}
                        label={schema.label}
                        type={schema.type}
                        title={`Sample: ${genSample(schema)}`}
                        onClick={() => {
                          if (isIncluded) {
                            remove(store.elements, { id: isIncluded.id });
                          } else {
                            store.elements.push({
                              ...schema,
                              id: simpleId()
                            });
                          }
                        }}
                      />
                    );
                  })}
            </Absolute>
          </SlideIn>
        </Box>
      )}
    </Relative>
  );
};
export default view(TypeSelector);
