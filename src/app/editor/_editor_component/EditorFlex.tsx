"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";

type FlexContainerProps = {
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: "row" | "column";
  flexWrap?: "wrap" | "nowrap";
  width?: string;
  height?: string;
  parConnect?: any;
};

export const FlexContainerInner = ({
  justifyContent = "flex-start",
  alignItems = "stretch",
  flexDirection = "row",
  flexWrap = "nowrap",
  width = "100%",
  height = "100%",
  parConnect,
}: FlexContainerProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      //@ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
      style={{
        display: "flex",
        justifyContent,
        alignItems,
        flexDirection,
        flexWrap,
        width,
        height,
      }}
    >
      {/* Children components go here */}
    </div>
  );
};

const FlexContainerToolbarSettings = () => {
  const { setProp, justifyContent, alignItems, flexDirection, flexWrap } =
    useNode((node) => ({
      justifyContent: node.data.props.justifyContent,
      alignItems: node.data.props.alignItems,
      flexDirection: node.data.props.flexDirection,
      flexWrap: node.data.props.flexWrap,
    }));

  return (
    <div>
      <h2>Flex Container Settings</h2>
      <label>
        Justify Content
        <select
          value={justifyContent}
          onChange={(e) =>
            setProp((prop) => (prop.justifyContent = e.target.value))
          }
        >
          <option value="flex-start">Flex Start</option>
          <option value="center">Center</option>
          <option value="flex-end">Flex End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
        </select>
      </label>
      <label>
        Align Items
        <select
          value={alignItems}
          onChange={(e) => setProp((prop) => (prop.alignItems = e.target.value))}
        >
          <option value="stretch">Stretch</option>
          <option value="center">Center</option>
          <option value="flex-start">Flex Start</option>
          <option value="flex-end">Flex End</option>
        </select>
      </label>
      <label>
        Flex Direction
        <select
          value={flexDirection}
          onChange={(e) =>
            setProp((prop) => (prop.flexDirection = e.target.value))
          }
        >
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </label>
      <label>
        Flex Wrap
        <select
          value={flexWrap}
          onChange={(e) => setProp((prop) => (prop.flexWrap = e.target.value))}
        >
          <option value="nowrap">No Wrap</option>
          <option value="wrap">Wrap</option>
        </select>
      </label>
    </div>
  );
};

export const FlexContainer = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <FlexContainerInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

FlexContainer.craft = {
  related: {
    toolbar: FlexContainerToolbarSettings,
  },
  props: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    height: "100%",
  },
  displayName: "FlexContainer",
};
