"use client";
import React, { useEffect, useState } from "react";
import { Text } from "./Text";
import { BoxModel } from "@/lib/types";
import { Element, useEditor, useNode } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
type props = {
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
} & BoxModel;

const ButtonInner = ({
  text = "button",
  color = "white",
  backgroundColor = "black",
  fontSize = "1rem",
  pl = "20px",
  pr = "20px",
  pt = "10px",
  pb = "10px",
  borderRadius = "5px",
  ml = "0px",
  mr = "0px",
  mt = "0px",
  mb = "0px",
  width = "100%",
  height = "100%",
}: props) => {
  const {
    actions: { setProp },
    connectors: { connect, drag },
    parentId,
  } = useNode((node) => ({
    parentId: node.data.parent,
  }));
  const { parentHeight, parentWidth } = useEditor((state, query) => ({
    parentWidth: query.node(parentId!).get().data.props.width,
    parentHeight: query.node(parentId!).get().data.props.height,
  }));
  useEffect(() => {
    setProp((props: props) => (props.width = parentWidth));
    setProp((props: props) => (props.height = parentHeight));
  }, [parentWidth, parentHeight]);
  //   const [widthState,setWidthState] =  useState(width)
  return (
    <button
      //@ts-ignore
      ref={(ref) => connect(drag(ref))}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        padding: `${pt} ${pr} ${pb} ${pl}`,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        outline: "none",
        borderRadius: borderRadius,
        cursor: "pointer",
        width,
        height,
      }}
    >
      <Element is={Text} id="editor_btn_text" fontSize={fontSize} text={text} />
    </button>
  );
};

const ButtonToolbarSettings = () => {
  const { setProp, text, fontSize, color, backgroundColor, borderRadius } =
    useNode((node) => ({
      text: node.data.props.text,
      fontSize: node.data.props.fontSize,
      color: node.data.props.color,
      backgroundColor: node.data.props.backgroundColor,
      borderRadius: node.data.props.borderRadius,
    }));

  return (
    <div>
      <h2>Button settings</h2>
      <input
        type="text"
        value={text}
        placeholder="Button Text"
        onChange={(e) => setProp((prop) => (prop.text = e.target.value))}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setProp((prop) => (prop.color = e.target.value))}
      />
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) =>
          setProp((prop) => (prop.backgroundColor = e.target.value))
        }
      />
      <input
        type="number"
        value={fontSize}
        placeholder="Font size"
        onChange={(e) => setProp((prop) => (prop.fontSize = e.target.value))}
      />
      <input
        type="number"
        value={borderRadius}
        placeholder="Border radius"
        onChange={(e) =>
          setProp((prop) => (prop.borderRadius = e.target.value))
        }
      />
    </div>
  );
};

ButtonInner.craft = {
  related: {
    toolbar: ButtonToolbarSettings,
  },
};

export const Button = () => (
  <ResizeWrapper>
    <ButtonInner />
  </ResizeWrapper>
);
