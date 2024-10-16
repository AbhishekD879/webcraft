"use client";
import React from "react";
import { Text } from "./Text";
import { BoxModel } from "@/lib/types";
import { useNode } from "@craftjs/core";
type props = {
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  borderRadius?: string;
} & BoxModel;

export const Button = ({
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
}: props) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <button
      //@ts-ignore
      ref={(ref) => connect(drag(ref))}
      style={{
        backgroundColor: backgroundColor,
        color:color,
        fontSize: fontSize,
        padding: `${pt} ${pr} ${pb} ${pl}`,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        outline: "none",
        borderRadius: borderRadius,
        cursor: "pointer",
      }}
    >
      <Text fontSize={fontSize} text={text} />
    </button>
  );
};
