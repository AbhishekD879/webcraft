"use client";
import React, { useEffect } from "react";
import { Text } from "./Text";
import { BoxModel } from "@/lib/types";
import { Element, useEditor, useNode } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ButtonIcon } from "@radix-ui/react-icons";

type ButtonProps = {
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  parConnect?: any;
} & BoxModel;

export const ButtonInner = ({
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
  parConnect,
}: ButtonProps) => {
  return (
    <button
      //@ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
      style={{
        backgroundColor,
        color,
        fontSize,
        padding: `${pt} ${pr} ${pb} ${pl}`,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        outline: "none",
        borderRadius,
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
    const { setProp, text, fontSize, color, backgroundColor, borderRadius } = useNode(
      (node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
        color: node.data.props.color,
        backgroundColor: node.data.props.backgroundColor,
        borderRadius: node.data.props.borderRadius,
      })
    )
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="button-settings">
          <AccordionTrigger className="text-sm font-medium">
            <ButtonIcon className="w-4 h-4 mr-2" />
            Button Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="button-text" className="text-xs font-medium">
                Button Text
              </Label>
              <Input
                id="button-text"
                type="text"
                value={text}
                onChange={(e) => setProp((props) => (props.text = e.target.value))}
                placeholder="Enter button text"
                className="text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-color" className="text-xs font-medium">
                Text Color
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="text-color"
                  type="color"
                  value={color}
                  onChange={(e) => setProp((props) => (props.color = e.target.value))}
                  className="w-8 h-8 p-0 border-none"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setProp((props) => (props.color = e.target.value))}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="background-color" className="text-xs font-medium">
                Background Color
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="background-color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setProp((props) => (props.backgroundColor = e.target.value))}
                  className="w-8 h-8 p-0 border-none"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setProp((props) => (props.backgroundColor = e.target.value))}
                  className="text-xs"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-size" className="text-xs font-medium">
                Font Size: {fontSize}
              </Label>
              <Slider
                id="font-size"
                min={8}
                max={72}
                step={1}
                value={[parseInt(fontSize)]}
                onValueChange={([value]) => setProp((props) => (props.fontSize = `${value}px`))}
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

export const Button = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <ButtonInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

// Define the craft configuration correctly
Button.craft = {
  related: {
    toolbar: ButtonToolbarSettings,
  },
  props: {
    text: "button",
    color: "white",
    backgroundColor: "black",
    fontSize: "1rem",
    borderRadius: "5px",
    width: "100%",
    height: "100%",
  },
  displayName: "Button",
};
