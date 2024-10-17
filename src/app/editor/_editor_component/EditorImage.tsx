"use client";
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";

type ImageProps = {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  parConnect?:any
} & BoxModel;

export const ImageInner = ({
  src = "https://picsum.photos/200",
  alt = "Image",
  width = "100%",
  height = "auto",
  borderRadius = "5px",
  ml = "0px",
  mr = "0px",
  mt = "0px",
  mb = "0px",
  parConnect
}: ImageProps) => {
  return (
    <img
      //   @ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
      src={src}
      alt={alt}
      style={{
        width,
        height,
        borderRadius,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
      }}
    />
  );
};

const ImageToolbarSettings = () => {
  const { setProp, src, alt, width, height, borderRadius } = useNode(
    (node) => ({
      src: node.data.props.src,
      alt: node.data.props.alt,
      width: node.data.props.width,
      height: node.data.props.height,
      borderRadius: node.data.props.borderRadius,
    })
  );

  return (
    <div>
      <h2>Image settings</h2>
      <input
        type="text"
        value={src}
        placeholder="Image URL"
        onChange={(e) => setProp((prop) => (prop.src = e.target.value))}
      />
      <input
        type="text"
        value={alt}
        placeholder="Alt text"
        onChange={(e) => setProp((prop) => (prop.alt = e.target.value))}
      />
      <input
        type="text"
        value={width}
        placeholder="Width"
        onChange={(e) => setProp((prop) => (prop.width = e.target.value))}
      />
      <input
        type="text"
        value={height}
        placeholder="Height"
        onChange={(e) => setProp((prop) => (prop.height = e.target.value))}
      />
      <input
        type="text"
        value={borderRadius}
        placeholder="Border radius"
        onChange={(e) =>
          setProp((prop) => (prop.borderRadius = e.target.value))
        }
      />
    </div>
  );
};

ImageInner.craft = {
  related: {
    toolbar: ImageToolbarSettings,
  },
};

export const ImageComponent = () => {
    const {connectors:{connect}} = useNode()
    return (
        <ResizeWrapper>
          <ImageInner parConnect={connect} />
        </ResizeWrapper>
      )
};
