"use client";

import React, { useEffect, useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Type } from "lucide-react";
import ResizeWrapper from "./ResizeWrapper";
import { BoxModel } from "@/lib/types";

type InlineTextProps = {
  text?: string;
  fontSize?: string;
  color?: string;
  textAlign?: string;
} & BoxModel;

const InlineTextInner = ({
  text = "Editable text",
  fontSize = "16px",
  color = "black",
  textAlign = "left", // Default value for text alignment
  ml = "0px",
  mr = "0px",
  mt = "0px",
  mb = "0px",
}: InlineTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);

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
    setProp((props: InlineTextProps) => {
      props.fontSize = fontSize;
      props.color = color;
    });
  }, [fontSize, color, setProp]);

  const handleBlur = () => {
    setIsEditing(false);
    setProp((props: InlineTextProps) => (props.text = editableText));
  };

  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      style={{
        fontSize: fontSize,
        color: color,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        outline: isEditing ? "1px solid #ccc" : "none",
        cursor: isEditing ? "text" : "pointer",
      }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={editableText}
          onChange={(e) => setEditableText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            fontSize,
            color,
            width: "100%",
            border: "none",
            outline: "none",
          }}
        />
      ) : (
        <span>{editableText}</span>
      )}
    </div>
  );
};

export const InlineTextToolbarSettings = () => {
  const { setProp, fontSize, color, text } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    text: node.data.props.text,
  }));

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="inline-text-settings">
        <AccordionTrigger className="text-sm font-medium">
          <Type className="w-4 h-4 mr-2" />
          Inline Text Settings
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-content" className="text-xs font-medium">
              Text Content
            </Label>
            <Input
              id="text-content"
              value={text}
              onChange={(e) => setProp((props) => (props.text = e.target.value))}
              placeholder="Enter text"
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-size" className="text-xs font-medium">
              Font Size: {parseInt(fontSize)}px
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

InlineTextInner.craft = {
  related: {
    toolbar: InlineTextToolbarSettings,
  },
};

export const InlineTextComponent = () => (
  <ResizeWrapper>
    <InlineTextInner />
  </ResizeWrapper>
);
