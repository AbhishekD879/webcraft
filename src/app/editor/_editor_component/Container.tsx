"use client";
import { BoxModel } from "@/lib/types";
import { useNode } from "@craftjs/core";

type props = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  borderStyle?: string;
  borderColor?: string;
  borderWidth?: string;
} & BoxModel & {
    children?: React.ReactNode;
  };

export default function Container({
  width = "2rem",
  height = "2rem",
  pb = "1rem",
  pl = "1rem",
  pr = "1rem",
  pt = "1rem",
  ml = "0",
  mr = "0",
  mt = "0",
  mb = "0",
  borderRadius = "2px",
  borderStyle = "solid",
  borderColor = "black",
  borderWidth = "0",
  backgroundColor = "transparent",
  children,
}: props) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      //@ts-ignore
      ref={(ref) => connect(drag(ref))}
      style={{
        width: width,
        height: height,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        backgroundColor,
        borderRadius,
        borderStyle,
        borderColor,
        borderWidth,
      }}
    >
      {children && children}
    </div>
  );
}