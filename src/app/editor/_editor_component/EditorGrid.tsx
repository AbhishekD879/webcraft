"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";

type GridProps = {
  columns?: string;
  gap?: string;
  width?: string;
  height?: string;
  parConnect?: any;
};

export const GridInner = ({
  columns = "repeat(3, 1fr)",
  gap = "10px",
  width = "100%",
  height = "100%",
  parConnect,
}: GridProps) => {
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
        display: "grid",
        gridTemplateColumns: columns,
        gap,
        width,
        height,
      }}
    >
      {/* Children components go here */}
    </div>
  );
};

const GridToolbarSettings = () => {
  const { setProp, columns, gap } = useNode((node) => ({
    columns: node.data.props.columns,
    gap: node.data.props.gap,
  }));

  return (
    <div>
      <h2>Grid Settings</h2>
      <label>
        Columns
        <input
          type="text"
          value={columns}
          placeholder="Grid columns"
          onChange={(e) => setProp((prop) => (prop.columns = e.target.value))}
        />
      </label>
      <label>
        Gap
        <input
          type="text"
          value={gap}
          placeholder="Gap size"
          onChange={(e) => setProp((prop) => (prop.gap = e.target.value))}
        />
      </label>
    </div>
  );
};

export const Grid = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <GridInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

Grid.craft = {
  related: {
    toolbar: GridToolbarSettings,
  },
  props: {
    columns: "repeat(3, 1fr)",
    gap: "10px",
    width: "100%",
    height: "100%",
  },
  displayName: "Grid",
};
