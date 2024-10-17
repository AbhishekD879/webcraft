"use client";
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link, Video } from "lucide-react"
type VideoProps = {
  src?: string;
  controls?: boolean;
  autoPlay?: boolean;
  width?: string;
  height?: string;
  parConnect?: any;
} & BoxModel;

export const VideoInner = ({
  src = "https://www.w3schools.com/html/mov_bbb.mp4",
  controls = true,
  autoPlay = false,
  width = "100%",
  height = "auto",
  ml = "0px",
  mr = "0px",
  mt = "0px",
  mb = "0px",
  parConnect,
}: VideoProps) => {
  return (
    <video
      //@ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
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

// const VideoToolbarSettings = () => {
//   const { setProp, src, autoPlay, controls, width, height } = useNode(
//     (node) => ({
//       src: node.data.props.src,
//       autoPlay: node.data.props.autoPlay,
//       controls: node.data.props.controls,
//       width: node.data.props.width,
//       height: node.data.props.height,
//     })
//   );

//   return (
//     <div>
//       <h2>Video settings</h2>
//       <input
//         type="text"
//         value={src}
//         placeholder="Video URL"
//         onChange={(e) => setProp((prop) => (prop.src = e.target.value))}
//       />
//       <label>
//         <input
//           type="checkbox"
//           checked={controls}
//           onChange={(e) =>
//             setProp((prop) => (prop.controls = e.target.checked))
//           }
//         />
//         Show controls
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={autoPlay}
//           onChange={(e) =>
//             setProp((prop) => (prop.autoPlay = e.target.checked))
//           }
//         />
//         Autoplay
//       </label>
//       <input
//         type="number"
//         value={width}
//         placeholder="Width"
//         onChange={(e) => setProp((prop) => (prop.width = e.target.value))}
//       />
//       <input
//         type="number"
//         value={height}
//         placeholder="Height"
//         onChange={(e) => setProp((prop) => (prop.height = e.target.value))}
//       />
//     </div>
//   );
// };

const VideoToolbarSettings = () => {
    const { setProp, src, autoPlay, controls, width, height } = useNode(
      (node) => ({
        src: node.data.props.src,
        autoPlay: node.data.props.autoPlay,
        controls: node.data.props.controls,
        width: node.data.props.width,
        height: node.data.props.height,
      })
    )
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="video-settings">
          <AccordionTrigger className="text-sm font-medium">
            <Video className="w-4 h-4 mr-2" />
            Video Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-url" className="text-xs font-medium">
                Video URL
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="video-url"
                  type="text"
                  value={src}
                  onChange={(e) => setProp((props) => (props.src = e.target.value))}
                  placeholder="Enter video URL"
                  className="text-xs"
                />
                <Link className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-controls" className="text-xs font-medium">
                Show Controls
              </Label>
              <Switch
                id="show-controls"
                checked={controls}
                onCheckedChange={(checked) => setProp((props) => (props.controls = checked))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoplay" className="text-xs font-medium">
                Autoplay
              </Label>
              <Switch
                id="autoplay"
                checked={autoPlay}
                onCheckedChange={(checked) => setProp((props) => (props.autoPlay = checked))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-width" className="text-xs font-medium">
                Width: {width}
              </Label>
              <Slider
                id="video-width"
                min={0}
                max={100}
                step={1}
                value={[parseInt(width)]}
                onValueChange={([value]) => setProp((props) => (props.width = `${value}%`))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-height" className="text-xs font-medium">
                Height: {height === "auto" ? "Auto" : height}
              </Label>
              <Slider
                id="video-height"
                min={0}
                max={100}
                step={1}
                value={[height === "auto" ? 0 : parseInt(height)]}
                onValueChange={([value]) => setProp((props) => (props.height = value === 0 ? "auto" : `${value}%`))}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

export const VideoComponent = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <VideoInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

// Define the craft configuration correctly
VideoComponent.craft = {
  related: {
    toolbar: VideoToolbarSettings,
  },
  props: {
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    controls: true,
    autoPlay: false,
    width: "100%",
    height: "auto",
  },
  displayName: "Video",
};
