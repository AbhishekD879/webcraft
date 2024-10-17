"use client";
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";

type VideoProps = {
  src?: string;
  controls?: boolean;
  autoPlay?: boolean;
  width?: string;
  height?: string;
} & BoxModel;

const VideoInner = ({
  src = "https://www.w3schools.com/html/mov_bbb.mp4",
  controls = true,
  autoPlay = false,
  width = "100%",
  height = "auto",
  ml = "0px",
  mr = "0px",
  mt = "0px",
  mb = "0px",
}: VideoProps) => {
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
    setProp((props: VideoProps) => (props.width = parentWidth));
    setProp((props: VideoProps) => (props.height = parentHeight));
  }, [parentWidth, parentHeight, setProp]);

  return (
    <video
      //@ts-ignore
      ref={(ref) => connect(drag(ref))}
      src={src}
      controls={controls}
      autoPlay={autoPlay}
      style={{
        width,
        height,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
      }}
    />
  );
};

const VideoToolbarSettings = () => {
  const { setProp, src, autoPlay, controls, width, height } = useNode(
    (node) => ({
      src: node.data.props.src,
      autoPlay: node.data.props.autoPlay,
      controls: node.data.props.controls,
      width: node.data.props.width,
      height: node.data.props.height,
    })
  );

  return (
    <div>
      <h2>Video settings</h2>
      <input
        type="text"
        value={src}
        placeholder="Video URL"
        onChange={(e) => setProp((prop) => (prop.src = e.target.value))}
      />
      <label>
        <input
          type="checkbox"
          checked={controls}
          onChange={(e) =>
            setProp((prop) => (prop.controls = e.target.checked))
          }
        />
        Show controls
      </label>
      <label>
        <input
          type="checkbox"
          checked={autoPlay}
          onChange={(e) =>
            setProp((prop) => (prop.autoPlay = e.target.checked))
          }
        />
        Autoplay
      </label>
      <input
        type="number"
        value={width}
        placeholder="Width"
        onChange={(e) => setProp((prop) => (prop.width = e.target.value))}
      />
      <input
        type="number"
        value={height}
        placeholder="Height"
        onChange={(e) => setProp((prop) => (prop.height = e.target.value))}
      />
    </div>
  );
};

VideoInner.craft = {
    related: {
      toolbar: VideoToolbarSettings
    }
}

export const VideoComponent = () => (
  <ResizeWrapper>
    <VideoInner />
  </ResizeWrapper>
);
