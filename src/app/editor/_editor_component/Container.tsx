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
  width = "",
  height = "",
  pb = ".5rem",
  pl = ".5rem",
  pr = ".5rem",
  pt = ".5rem",
  ml = "0",
  mr = "0",
  mt = "0",
  mb = "0",
  borderRadius = "2px",
  borderStyle = "solid",
  borderColor = "black",
  borderWidth = "2px",
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
