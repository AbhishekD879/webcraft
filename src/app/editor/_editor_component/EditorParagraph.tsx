"use client";
import React, { useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Type } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type ParagraphProps = {
  text?: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  width?: string;
  height?: string;
  parConnect?: any;
} & BoxModel;

export const ParagraphInner = ({
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
  parConnect,
}: ParagraphProps) => {
  return (
    <p
      //@ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="paragraph-settings">
        <AccordionTrigger className="text-sm font-medium">
          <Type className="w-4 h-4 mr-2" />
          Paragraph Settings
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paragraph-text" className="text-xs font-medium">
              Paragraph Text
            </Label>
            <Textarea
              id="paragraph-text"
              value={text}
              onChange={(e) =>
                setProp((props) => (props.text = e.target.value))
              }
              placeholder="Enter your paragraph text here"
              className="text-xs min-h-[100px]"
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
                onChange={(e) =>
                  setProp((props) => (props.color = e.target.value))
                }
                className="w-8 h-8 p-0 border-none"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) =>
                  setProp((props) => (props.color = e.target.value))
                }
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
              onValueChange={([value]) =>
                setProp((props) => (props.fontSize = `${value}px`))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="line-height" className="text-xs font-medium">
              Line Height: {lineHeight}
            </Label>
            <Slider
              id="line-height"
              min={1}
              max={3}
              step={0.1}
              value={[parseFloat(lineHeight)]}
              onValueChange={([value]) =>
                setProp((props) => (props.lineHeight = value.toFixed(1)))
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const ParagraphComponent = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <ParagraphInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

// Define the craft configuration correctly
ParagraphComponent.craft = {
  related: {
    toolbar: ParagraphToolbarSettings,
  },
  props: {
    text: "Your paragraph text here.",
    color: "black",
    fontSize: "1rem",
    lineHeight: "1.5",
    width: "100%",
    height: "auto",
  },
  displayName: "Paragraph",
};
