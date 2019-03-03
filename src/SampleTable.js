import { Flex } from "rebass";
import { Table, Column } from "knoll";
import { view } from "react-easy-state";
import Button from "./Button";
import Key from "./Key";
import PropTypes from "prop-types";
import React from "react";
import SampleCell from "./SampleCell";
import store from "./store";

const components = {
  table: props => <table style={{ borderSpacing: 0 }} {...props} />,
  headerCell: props => (
    <th style={{ borderBottom: "1px solid black", padding: 8 }} {...props} />
  ),
  cell: props => (
    <td
      style={{
        maxWidth: 200,
        overflow: "hidden",
        padding: 8,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}
      {...props}
    />
  )
};

const SampleTable = props => (
  <Flex width={1} flexDirection="column">
    <Table data={props.samples} components={components}>
      {store.elements.map(element => (
        <Column
          key={element.id}
          header={<Key small {...element} width={1} justifyContent="center" />}
          cell={row => <SampleCell row={row} {...element} />}
        />
      ))}
    </Table>
    <Flex p={1}>
      <Button width={1} onClick={() => (store.count = store.count + 10)}>
        Add 10 more...
      </Button>
    </Flex>
  </Flex>
);

SampleTable.propTypes = {
  samples: PropTypes.array
};

export default view(SampleTable);
