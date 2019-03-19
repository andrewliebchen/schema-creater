import { Fade, SlideDown } from "./Animation";
import { HelpCircle } from "react-feather";
import { Pointer } from "./StyleHelpers";
import { Text, Heading } from "rebass";
import Button from "./Button";
import Card from "./Card";
import React, { useState } from "react";
import styled from "styled-components";
import theme from "./theme";

const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  max-width: 500px;
  z-index: 100;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
`;

const Help = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ position: "relative", zIndex: 9 }}>
      <Pointer
        onClick={() => setShowModal(true)}
        id="helpModalToggle"
        title="What's this all about?"
      >
        <HelpCircle color={theme.colors.black} />
      </Pointer>

      <Fade in={showModal} timeout={200}>
        <Background onClick={() => setShowModal(false)} />
      </Fade>

      <Center>
        <SlideDown in={showModal} timeout={200}>
          <Card p={4}>
            <Heading mb={3}>What is this?</Heading>
            <Text mb={4}>
              Schema Creator helps you generate an unlimited amount of random
              data from a schema you define. Export as a CSV or JSON.
            </Text>
            <Button onClick={() => setShowModal(false)}>Okay!</Button>
          </Card>
        </SlideDown>
      </Center>
    </div>
  );
};

export default Help;
