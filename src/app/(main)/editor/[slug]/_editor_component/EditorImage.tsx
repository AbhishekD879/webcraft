"use client";
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Image, Link } from "lucide-react";

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

// const ImageToolbarSettings = () => {
//   const { setProp, src, alt, width, height, borderRadius } = useNode(
//     (node) => ({
//       src: node.data.props.src,
//       alt: node.data.props.alt,
//       width: node.data.props.width,
//       height: node.data.props.height,
//       borderRadius: node.data.props.borderRadius,
//     })
//   );

//   return (
//     <div>
//       <h2>Image settings</h2>
//       <input
//         type="text"
//         value={src}
//         placeholder="Image URL"
//         onChange={(e) => setProp((prop) => (prop.src = e.target.value))}
//       />
//       <input
//         type="text"
//         value={alt}
//         placeholder="Alt text"
//         onChange={(e) => setProp((prop) => (prop.alt = e.target.value))}
//       />
//       <input
//         type="text"
//         value={width}
//         placeholder="Width"
//         onChange={(e) => setProp((prop) => (prop.width = e.target.value))}
//       />
//       <input
//         type="text"
//         value={height}
//         placeholder="Height"
//         onChange={(e) => setProp((prop) => (prop.height = e.target.value))}
//       />
//       <input
//         type="text"
//         value={borderRadius}
//         placeholder="Border radius"
//         onChange={(e) =>
//           setProp((prop) => (prop.borderRadius = e.target.value))
//         }
//       />
//     </div>
//   );
// };

const ImageToolbarSettings = () => {
    const { setProp, src, alt, width, height, borderRadius } = useNode(
      (node) => ({
        src: node.data.props.src,
        alt: node.data.props.alt,
        width: node.data.props.width,
        height: node.data.props.height,
        borderRadius: node.data.props.borderRadius,
      })
    )
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="image-settings">
          <AccordionTrigger className="text-sm font-medium">
            <Image className="w-4 h-4 mr-2" />
            Image Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url" className="text-xs font-medium">
                Image URL
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image-url"
                  type="text"
                  value={src}
                  onChange={(e) => setProp((props) => (props.src = e.target.value))}
                  placeholder="Enter image URL"
                  className="text-xs"
                />
                <Link className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt-text" className="text-xs font-medium">
                Alt Text
              </Label>
              <Input
                id="alt-text"
                type="text"
                value={alt}
                onChange={(e) => setProp((props) => (props.alt = e.target.value))}
                placeholder="Enter alt text"
                className="text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-width" className="text-xs font-medium">
                Width: {width}
              </Label>
              <Slider
                id="image-width"
                min={0}
                max={100}
                step={1}
                value={[parseInt(width)]}
                onValueChange={([value]) => setProp((props) => (props.width = `${value}%`))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-height" className="text-xs font-medium">
                Height: {height === "auto" ? "Auto" : height}
              </Label>
              <Slider
                id="image-height"
                min={0}
                max={100}
                step={1}
                value={[height === "auto" ? 0 : parseInt(height)]}
                onValueChange={([value]) => setProp((props) => (props.height = value === 0 ? "auto" : `${value}%`))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="border-radius" className="text-xs font-medium">
                Border Radius: {borderRadius}
              </Label>
              <Slider
                id="border-radius"
                min={0}
                max={50}
                step={1}
                value={[parseInt(borderRadius)]}
                onValueChange={([value]) => setProp((props) => (props.borderRadius = `${value}px`))}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

export const ImageComponent = () => {
    const {
        connectors: { connect },
        nodeProps,
      } = useNode((node) => ({
        nodeProps: node.data.props
      }));
    return (
        <ResizeWrapper>
          <ImageInner parConnect={connect} {...nodeProps} />
        </ResizeWrapper>
      )
};

// Define the craft configuration correctly
ImageComponent.craft = {
    related: {
      toolbar: ImageToolbarSettings
    },
    props: {
      src: "https://picsum.photos/200",
      alt: "Image",
      width: "100%",
      height: "100%",
      borderRadius: "5px",
    },
    displayName: "Image",
  };
