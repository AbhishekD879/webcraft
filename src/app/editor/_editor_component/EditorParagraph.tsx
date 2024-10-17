"use client";
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";

type ParagraphProps = {
  text?: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  width?: string;
  height?: string;
} & BoxModel;

const ParagraphInner = ({
  text = "Your paragraph text here.",
  color = "black",
  fontSize = "1rem",
  lineHeight = "1.5",
  width = "100%",
  height = "auto",
  ml = "0px",
  mr = "0px",
  mt = "0px",
  mb = "0px",
}: ParagraphProps) => {
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
    setProp((props: ParagraphProps) => (props.width = parentWidth));
    setProp((props: ParagraphProps) => (props.height = parentHeight));
  }, [parentWidth, parentHeight, setProp]);

  return (
    <p
      //@ts-ignore
      ref={(ref) => connect(drag(ref))}
      style={{
        color,
        fontSize,
        lineHeight,
        width,
        height,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
      }}
    >
      {text}
    </p>
  );
};


  
  const ParagraphToolbarSettings = () => {
    const { setProp, text, fontSize, color, lineHeight } = useNode((node) => ({
      text: node.data.props.text,
      fontSize: node.data.props.fontSize,
      color: node.data.props.color,
      lineHeight: node.data.props.lineHeight,
    }));
  
    return (
      <div>
        <h2>Paragraph settings</h2>
        <textarea
          value={text}
          placeholder="Paragraph text"
          onChange={e => setProp(prop => (prop.text = e.target.value))}
        />
        <input
          type="color"
          value={color}
          onChange={e => setProp(prop => (prop.color = e.target.value))}
        />
        <input
          type="number"
          value={fontSize}
          placeholder="Font size"
          onChange={e => setProp(prop => (prop.fontSize = e.target.value))}
        />
        <input
          type="number"
          value={lineHeight}
          placeholder="Line height"
          onChange={e => setProp(prop => (prop.lineHeight = e.target.value))}
        />
      </div>
    );
  };

  ParagraphInner.craft = {
    related: {
      toolbar: ParagraphToolbarSettings
    }
  }

export const ParagraphComponent = () => (
  <ResizeWrapper>
    <ParagraphInner />
  </ResizeWrapper>
);



