"use client";
import React from "react";
import { useNode } from "@craftjs/core";
import ResizeWrapper from "./ResizeWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FlexContainerProps = {
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: "row" | "column";
  flexWrap?: "wrap" | "nowrap";
  width?: string;
  height?: string;
  parConnect?: any;
};

export const FlexContainerInner = ({
  justifyContent = "flex-start",
  alignItems = "stretch",
  flexDirection = "row",
  flexWrap = "nowrap",
  width = "100%",
  height = "100%",
  parConnect,
}: FlexContainerProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      //@ts-ignore
      ref={(ref) => {
        if (ref && parConnect) parConnect(ref);
      }}
      style={{
        display: "flex",
        justifyContent,
        alignItems,
        flexDirection,
        flexWrap,
        width,
        height,
      }}
    >
      {/* Children components go here */}
    </div>
  );
};

const FlexContainerToolbarSettings = () => {
    const { setProp, justifyContent, alignItems, flexDirection, flexWrap } = useNode((node) => ({
      justifyContent: node.data.props.justifyContent,
      alignItems: node.data.props.alignItems,
      flexDirection: node.data.props.flexDirection,
      flexWrap: node.data.props.flexWrap,
    }))
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="flex-container-settings">
          <AccordionTrigger className="text-sm font-medium">
            <Layout className="w-4 h-4 mr-2" />
            Flex Container Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="justify-content" className="text-xs font-medium">
                Justify Content
              </Label>
              <Select
                value={justifyContent}
                onValueChange={(value) => setProp((props) => (props.justifyContent = value))}
              >
                <SelectTrigger id="justify-content">
                  <SelectValue placeholder="Select justify content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Flex Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">Flex End</SelectItem>
                  <SelectItem value="space-between">Space Between</SelectItem>
                  <SelectItem value="space-around">Space Around</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="align-items" className="text-xs font-medium">
                Align Items
              </Label>
              <Select
                value={alignItems}
                onValueChange={(value) => setProp((props) => (props.alignItems = value))}
              >
                <SelectTrigger id="align-items">
                  <SelectValue placeholder="Select align items" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stretch">Stretch</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-start">Flex Start</SelectItem>
                  <SelectItem value="flex-end">Flex End</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="flex-direction" className="text-xs font-medium">
                Flex Direction
              </Label>
              <Select
                value={flexDirection}
                onValueChange={(value) => setProp((props) => (props.flexDirection = value))}
              >
                <SelectTrigger id="flex-direction">
                  <SelectValue placeholder="Select flex direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="flex-wrap" className="text-xs font-medium">
                Flex Wrap
              </Label>
              <Select
                value={flexWrap}
                onValueChange={(value) => setProp((props) => (props.flexWrap = value))}
              >
                <SelectTrigger id="flex-wrap">
                  <SelectValue placeholder="Select flex wrap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowrap">No Wrap</SelectItem>
                  <SelectItem value="wrap">Wrap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

export const FlexContainer = () => {
  const {
    connectors: { connect },
    nodeProps,
  } = useNode((node) => ({
    nodeProps: node.data.props,
  }));

  return (
    <ResizeWrapper>
      <FlexContainerInner parConnect={connect} {...nodeProps} />
    </ResizeWrapper>
  );
};

FlexContainer.craft = {
  related: {
    toolbar: FlexContainerToolbarSettings,
  },
  props: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    height: "100%",
  },
  displayName: "FlexContainer",
};
